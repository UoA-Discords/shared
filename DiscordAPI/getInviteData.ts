import axios from 'axios';
import { APIInvite, RouteBases } from 'discord-api-types/v10';

/**
 * Attempts to get a {@link APIInvite Discord invite response} from an invite code.
 * @param {String} inviteCode Invite code, without the `discord.gg...` prefix.
 *
 * @returns Returns the invite data on success, or `null` if the invite does not exist.
 *
 * @throws Throws an error if the request fails.
 */
export async function getInviteData(inviteCode: string): Promise<APIInvite | null> {
    try {
        const { data } = await axios.get<APIInvite>(`${RouteBases.api}/invites/${inviteCode}`, {
            params: { with_expiration: true, with_counts: true },
        });
        return data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            return null;
        }
        throw error;
    }
}
