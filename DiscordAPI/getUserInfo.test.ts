import { getUserInfo } from './getUserInfo';

describe('getUserInfo', () => {
    it('returns `null` if an invalid access token is provided', async () => {
        expect(await getUserInfo('fakeAccessToken')).toBe(null);
    });
});
