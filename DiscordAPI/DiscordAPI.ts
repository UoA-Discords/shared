import axios from 'axios';
import { APIInvite, APIPartialGuild, APIUser, RouteBases } from 'discord-api-types/v10';

/** Extracts the `{ message: "...", code: X }` portion of a Discord API 400 level response. */
export function handleDiscordError(error: unknown): { message: string; code: number } | unknown {
    if (!axios.isAxiosError(error)) return error;
    try {
        if (error.response?.data !== null && typeof error.response?.data === `object`) {
            const keys = Object.keys(error.response.data);
            if (keys.includes(`message`) && keys.includes(`code`)) {
                const { message, code } = error.response.data as { message: string; code: number };
                return { message, code };
            }
        }
        return new Error(error.message);
    } catch (newError) {
        return new Error(error.message);
    }
}

export async function getInviteData(inviteCode: string): Promise<APIInvite> {
    try {
        const { data } = await axios.get<APIInvite>(`${RouteBases.api}/invites/${inviteCode}`, {
            params: { with_expiration: true, with_counts: true },
        });
        return data;
    } catch (error) {
        throw handleDiscordError(error);
    }
}

export async function getUserInfo(accessToken: string): Promise<APIUser> {
    try {
        const { data } = await axios.get<APIUser>(`${RouteBases.api}/users/@me`, {
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        });
        return data;
    } catch (error) {
        throw handleDiscordError(error);
    }
}

export async function getUserGuilds(accessToken: string): Promise<APIPartialGuild[]> {
    try {
        const { data } = await axios.get<APIPartialGuild[]>(`${RouteBases.api}/users/@me/guilds`, {
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        });
        return data;
    } catch (error) {
        throw handleDiscordError(error);
    }
}
