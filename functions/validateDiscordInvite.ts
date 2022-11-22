import { GuildVerificationLevel, APIInvite } from 'discord-api-types/payloads/v10';
import { getInviteData } from '../DiscordAPI';
import { GuildData } from '../types/Entry/GuildData';
import { BasicUserInfo, SiteUser, UserPermissions } from '../types/User';

/** Reasons why an invite code is invalid. */
export enum InvalidInviteReason {
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
    reason: InvalidInviteReason;
    extra?: unknown;
}

/**
 * Validates a Discord invite code.
 * @param {String} inviteCode Invite code, without the `discord.gg/` prefix.
 * @param {number} minMemberCount Guilds with member counts below this will return invalid.
 * @param {number} minVerificationLevel Guilds with verification levels below this will return invalid.
 * @param {(id: string) => SiteUser | null} [inviterFindingFunction] A way to check if the creator of the invite is in
 * our user database.
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
        return { valid: false, reason: InvalidInviteReason.Unknown, extra: error };
    }

    if (invite === null) {
        return { valid: false, reason: InvalidInviteReason.NotFound };
    }

    if (invite.expires_at !== null) {
        return { valid: false, reason: InvalidInviteReason.Expires };
    }

    if (invite.guild === undefined) {
        return { valid: false, reason: InvalidInviteReason.NoGuild };
    }

    if (invite.approximate_member_count === undefined || invite.approximate_member_count < minMemberCount) {
        return { valid: false, reason: InvalidInviteReason.TooSmall };
    }

    if (invite.guild.icon === null) {
        return { valid: false, reason: InvalidInviteReason.NoIcon };
    }

    if (invite.guild.verification_level < minVerificationLevel) {
        return { valid: false, reason: InvalidInviteReason.NotVerified };
    }

    let inviteCreatedBy: BasicUserInfo | null = null;
    if (invite.inviter !== undefined) {
        inviteCreatedBy = {
            id: invite.inviter.id,
            username: invite.inviter.username,
            avatar: invite.inviter.avatar,
            discriminator: invite.inviter.discriminator,
            permissions: UserPermissions.,
        };

        if (inviterFindingFunction !== undefined) {
            const possibleUser = inviterFindingFunction(invite.inviter.id);
            if (possibleUser !== null) {
                inviteCreatedBy.permissions = possibleUser.permissions;
            }
        }
    }

    let description: string | null = null;
    if (invite.guild.description !== null) {
        description = invite.guild.description;
    } else {
        try {
            // undocumented in discord-api-types, but quite a few invites return guild data containing the welcome
            // screen and a description
            const inv = invite.guild as unknown as { welcome_screen: { description?: unknown } };
            if (typeof inv.welcome_screen?.description === 'string') {
                description = inv.welcome_screen.description;
            }
        } catch (error) {
            //
        }
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
