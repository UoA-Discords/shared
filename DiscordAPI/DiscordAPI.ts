import axios from 'axios';
import { APIInvite, APIPartialGuild, APIUser, RouteBases } from 'discord-api-types/v10';

interface BaseHandleDiscordErrorResponse {
    error: unknown | object;
    isDiscordError: boolean;
}

interface HandleDiscordErrorResponseIs extends BaseHandleDiscordErrorResponse {
    error: object;
    isDiscordError: true;
}

interface HandleDiscordErrorResponseNot extends BaseHandleDiscordErrorResponse {
    error: unknown;
    isDiscordError: false;
}

export type HandleDiscordErrorResponse = HandleDiscordErrorResponseIs | HandleDiscordErrorResponseNot;

/** Extracts the `{ message: "...", code: X }` portion of a Discord API 400 level response. */
export function handleDiscordError(error: unknown): HandleDiscordErrorResponse {
    if (!axios.isAxiosError(error)) return { error, isDiscordError: false };
    try {
        if (error.response?.data !== null && typeof error.response?.data === `object`) {
            return { error: error.response.data, isDiscordError: true };
        }
    } catch (newError) {
        /* don't care */
    }
    return { error: new Error(error.message), isDiscordError: false };
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
