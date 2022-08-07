import { getInviteData } from '../../DiscordAPI';
import { ValidateDiscordInviteProps, ValidateDiscordInviteResponse, InvalidInviteReasons } from './types';

/** Validates a Discord invite code */

/**
 * Validates a Discord invite code.
 * @param {ValidateDiscordInviteProps} props Parameters for validation.
 *
 * @returns An object containing information about whether the invite is valid, and any relevant information.
 */
export async function validateDiscordInvite(props: ValidateDiscordInviteProps): Promise<ValidateDiscordInviteResponse> {
    const { inviteCode, minMemberCount, minVerificationLevel } = props;

    const invite = await getInviteData(inviteCode);

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

    return { valid: true, invite: { ...invite, guild: invite.guild } };
}
