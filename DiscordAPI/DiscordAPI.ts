import axios from 'axios';
import { APIInvite, APIPartialGuild, APIUser, RouteBases } from 'discord-api-types/v10';

export class DiscordAPIError {
    public readonly data: object;
    public constructor(data: object) {
        this.data = data;
    }
}

/** Extracts the data of a Discord API 400 level response. */
export function handleDiscordError(error: unknown): DiscordAPIError | unknown {
    if (!axios.isAxiosError(error)) return error;
    if (typeof error.response?.data !== `object`) return error;
    if (error.response.data === null) return error;
    return new DiscordAPIError(error.response.data);
}

export async function getInviteData(inviteCode: string): Promise<APIInvite> {
    const { data } = await axios.get<APIInvite>(`${RouteBases.api}/invites/${inviteCode}`, {
        params: { with_expiration: true, with_counts: true },
    });
    return data;
}

export async function getUserInfo(accessToken: string): Promise<APIUser> {
    const { data } = await axios.get<APIUser>(`${RouteBases.api}/users/@me`, {
        headers: {
            authorization: `Bearer ${accessToken}`,
        },
    });
    return data;
}

export async function getUserGuilds(accessToken: string): Promise<APIPartialGuild[]> {
    const { data } = await axios.get<APIPartialGuild[]>(`${RouteBases.api}/users/@me/guilds`, {
        headers: {
            authorization: `Bearer ${accessToken}`,
        },
    });
    return data;
}
