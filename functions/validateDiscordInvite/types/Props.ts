import { GuildVerificationLevel } from 'discord-api-types/v10';

export interface ValidateDiscordInviteProps {
    /** Invite code (no `discord.gg/...` prefix). */
    inviteCode: string;

    /** Guilds with member counts below this will be invalid. */
    minMemberCount: number;

    /** Guilds with verification levels below this will be invalid. */
    minVerificationLevel: GuildVerificationLevel;
}
