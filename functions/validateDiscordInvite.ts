import { GuildVerificationLevel, APIInvite } from 'discord-api-types/payloads/v10';
import { getInviteData } from '../DiscordAPI';
import { GuildData } from '../Types/Entries/GuildData';
import { BasicUserInfo, SiteUser, UserPermissionLevels } from '../Types/User';

/** Reasons why an invite code is invalid. */
export enum InvalidInviteReasons {
    /** This invite code does not exist. */
    NotFound,

    /** This invite has an expiry date, or it's expiry date is undefined (we want null - no expiry). */
    Expires,

    /** This invite code does not correspond to any guild. */
    NoGuild,

    /** The guild associated with this invite does not have enough members. */
    TooSmall,

    /** The guild associated with this invite does not have a server icon. */
    NoIcon,

    /** The verification level of the guild associated with this invite is too low. */
    NotVerified,

    /** This invite code resulted in a unknown error occurring during validation. */
    Unknown,
}

export interface ValidInviteResponse {
    valid: true;
    id: string;
    guildData: GuildData;
    inviteCreatedBy: BasicUserInfo | null;
    totalMembers: number;
    onlineMembers: number;
}

export interface InvalidInviteResponse {
    valid: false;
    reason: InvalidInviteReasons;
    extra?: unknown;
}

/**
 * Validates a Discord invite code.
 * @param {String} inviteCode Invite code, without the `discord.gg/` prefix.
 * @param {number} minMemberCount Guilds with member counts below this will return invalid.
 * @param {number} minVerificationLevel Guilds with verification levels below this will return invalid.
 *
 * @returns An object containing information about whether the invite is valid, and any relevant information.
 */
export async function validateDiscordInvite(
    inviteCode: string,
    minMemberCount: number,
    minVerificationLevel: GuildVerificationLevel,
    inviterFindingFunction?: (id: string) => SiteUser | null,
): Promise<ValidInviteResponse | InvalidInviteResponse> {
    let invite: APIInvite | null;

    try {
        invite = await getInviteData(inviteCode);
    } catch (error) {
        return { valid: false, reason: InvalidInviteReasons.Unknown, extra: error };
    }

    if (invite === null) {
        return { valid: false, reason: InvalidInviteReasons.NotFound };
    }

    if (invite.expires_at !== null) {
        return { valid: false, reason: InvalidInviteReasons.Expires };
    }

    if (invite.guild === undefined) {
        return { valid: false, reason: InvalidInviteReasons.NoGuild };
    }

    if (invite.approximate_member_count === undefined || invite.approximate_member_count < minMemberCount) {
        return { valid: false, reason: InvalidInviteReasons.TooSmall };
    }

    if (invite.guild.icon === null) {
        return { valid: false, reason: InvalidInviteReasons.NoIcon };
    }

    if (invite.guild.verification_level < minVerificationLevel) {
        return { valid: false, reason: InvalidInviteReasons.NotVerified };
    }

    let inviteCreatedBy: BasicUserInfo | null = null;
    if (invite.inviter !== undefined) {
        inviteCreatedBy = {
            id: invite.inviter.id,
            username: invite.inviter.username,
            avatar: invite.inviter.avatar,
            discriminator: invite.inviter.discriminator,
            permissionLevel: UserPermissionLevels.Default,
        };

        if (inviterFindingFunction !== undefined) {
            const possibleUser = inviterFindingFunction(invite.inviter.id);
            if (possibleUser !== null) {
                inviteCreatedBy.permissionLevel = possibleUser.permissionLevel;
            }
        }
    }

    let description: string | null = null;
    if (invite.guild.description !== null) {
        description = invite.guild.description;
    } else
        try {
            // undocumented in discord-api-types, but quite a few invites return guild data
            // containing the welcome screen and a description

            // also eslint wants to put these in backticks for some stupid reason
            // eslint-disable-next-line quotes
            const inv = invite.guild as unknown as { welcome_screen: { description?: unknown } };
            if (typeof inv.welcome_screen?.description === `string`) {
                description = inv.welcome_screen.description;
            }
        } catch (error) {
            //
        }

    return {
        valid: true,
        id: invite.guild.id,
        guildData: {
            banner: invite.guild.banner,
            description,
            icon: invite.guild.icon,
            name: invite.guild.name,
            splash: invite.guild.splash,
            verificationLevel: invite.guild.verification_level,
        },
        inviteCreatedBy,
        totalMembers: invite.approximate_member_count,
        onlineMembers: invite.approximate_presence_count ?? 0,
    };
}
