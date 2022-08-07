import axios from 'axios';
import { APIUser, RouteBases } from 'discord-api-types/v10';

/**
 * Attempts to get a {@link APIUser Discord user response} from an access token.
 * @param {String} accessToken OAuth2 access token of the user.
 *
 * @returns Returns the user info on success, or `null` if the token is invalid.
 *
 * @throws Throws an error if the request fails.
 */
export async function getUserInfo(accessToken: string): Promise<APIUser | null> {
    try {
        const { data } = await axios.get<APIUser>(`${RouteBases.api}/users/@me`, {
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        });
        return data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            return null;
        }
        throw error;
    }
}
