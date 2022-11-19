import { GuildVerificationLevel } from 'discord-api-types/v10';
import { InvalidInviteReasons, validateDiscordInvite } from './validateDiscordInvite';

describe('validateDiscordInvite', () => {
    beforeAll(() => {
        jest.setTimeout(10_000);
    });

    afterAll(() => {
        jest.setTimeout(5_000);
    });

    it('returns \'not found\' for invites that do not exist', async () => {
        expect(
            await validateDiscordInvite('thisDiscordInviteCodeWillNeverExist', 0, GuildVerificationLevel.None),
        ).toEqual({ valid: false, reason: InvalidInviteReasons.NotFound });
    });

    it('returns valid for large enough guilds', async () => {
        expect((await validateDiscordInvite('rimworld', 1000, GuildVerificationLevel.None)).valid).toBe(true);
    });

    it('follows the minimum member count requirement', async () => {
        expect(await validateDiscordInvite('rimworld', Number.POSITIVE_INFINITY, GuildVerificationLevel.None)).toEqual({
            valid: false,
            reason: InvalidInviteReasons.TooSmall,
        });
    });

    it('follows the minimum verification level requirement', async () => {
        expect(await validateDiscordInvite('rimworld', 0, GuildVerificationLevel.VeryHigh)).toEqual({
            valid: false,
            reason: InvalidInviteReasons.NotVerified,
        });
    });
});
