import { getInviteData } from './getInviteData';

describe('getInviteData', () => {
    it('returns `null` if an invite does not exist', async () => {
        expect(await getInviteData('thisDiscordInviteCodeWillNeverExist')).toBe(null);
    });

    it('returns data if an invite code does exist', async () => {
        const res = await getInviteData('XmdRWSCy2U');
        expect(res?.guild?.name.toLowerCase()).toContain('uoa discords');
    });
});
