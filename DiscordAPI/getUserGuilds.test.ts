import { getUserGuilds } from './getUserGuilds';

describe(`getUserGuilds`, () => {
    it(`returns \`null\` if an invalid access token is provided`, async () => {
        expect(await getUserGuilds(`fakeAccessToken`)).toBe(null);
    });
});
