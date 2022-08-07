import { APIInvite } from 'discord-api-types/v10';
import { DiscordAPIError, getInviteData } from '../../DiscordAPI';
import { InvalidInviteReasons } from './invalidInviteReasons';
import { ValidateDiscordInviteProps } from './props';
import { ValidateDiscordInviteResponse } from './response';

/** Validates a Discord invite code */
export async function validateDiscordInvite(props: ValidateDiscordInviteProps): Promise<ValidateDiscordInviteResponse> {
    const { inviteCode, minMemberCount, minVerificationLevel } = props;

    let invite: APIInvite;
    try {
        invite = await getInviteData(inviteCode);
    } catch (error) {
        if (error instanceof DiscordAPIError && (error.data as { code?: number })?.code === 10006) {
            return { valid: false, reason: InvalidInviteReasons.NotFound };
        }
        return { valid: false, reason: InvalidInviteReasons.Unknown };
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

    return { valid: true, invite };
}
