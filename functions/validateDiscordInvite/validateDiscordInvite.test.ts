import { GuildVerificationLevel } from 'discord-api-types/v10';
import { InvalidInviteReasons } from './types';
import { validateDiscordInvite } from './validateDiscordInvite';

describe(`validateDiscordInvite`, () => {
    it(`returns 'not found' for invites that do not exist`, async () => {
        expect(
            await validateDiscordInvite({
                inviteCode: `thisDiscordInviteCodeWillNeverExist`,
                minMemberCount: 0,
                minVerificationLevel: GuildVerificationLevel.None,
            }),
        ).toEqual({ valid: false, reason: InvalidInviteReasons.NotFound });
    });

    it(`returns valid for large enough guilds`, async () => {
        expect(
            (
                await validateDiscordInvite({
                    inviteCode: `rimworld`,
                    minMemberCount: 1000,
                    minVerificationLevel: GuildVerificationLevel.None,
                })
            ).valid,
        ).toBe(true);
    });

    it(`follows the minimum member count requirement`, async () => {
        expect(
            await validateDiscordInvite({
                inviteCode: `rimworld`,
                minMemberCount: Number.POSITIVE_INFINITY,
                minVerificationLevel: GuildVerificationLevel.None,
            }),
        ).toEqual({ valid: false, reason: InvalidInviteReasons.TooSmall });
    });

    it(`follows the minimum verification level requirement`, async () => {
        expect(
            await validateDiscordInvite({
                inviteCode: `rimworld`,
                minMemberCount: 0,
                minVerificationLevel: GuildVerificationLevel.VeryHigh,
            }),
        ).toEqual({ valid: false, reason: InvalidInviteReasons.NotVerified });
    });
});
