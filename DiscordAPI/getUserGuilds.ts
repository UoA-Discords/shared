import axios from 'axios';
import { APIPartialGuild, RouteBases } from 'discord-api-types/v10';

/**
 * Attempts to get an array of {@link APIPartialGuild partial guilds} that a user is in.
 * @param {String} accessToken OAuth2 access token of the user.
 *
 * @returns Returns the array of guilds on success, or `null` if the access token is invalid.
 *
 * @throws Throws an error if the request fails.
 */
export async function getUserGuilds(accessToken: string): Promise<APIPartialGuild[] | null> {
    try {
        const { data } = await axios.get<APIPartialGuild[]>(`${RouteBases.api}/users/@me/guilds`, {
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
