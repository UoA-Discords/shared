import { GuildVerificationLevel } from 'discord-api-types/payloads/v10/guild';

export interface GuildData {
    name: string;

    icon: string;

    splash: string | null;

    banner: string | null;

    description: string | null;

    verificationLevel: GuildVerificationLevel;
}
