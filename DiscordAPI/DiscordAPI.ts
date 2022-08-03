import axios, { AxiosError, AxiosInstance } from 'axios';
import { APIInvite, APIPartialGuild, APIUser } from 'discord-api-types/v10';

export namespace DiscordAPI {
    interface BaseDiscordAPIResponse {
        success: boolean;
    }

    export interface SuccessfulDiscordAPIResponse<T extends unknown> extends BaseDiscordAPIResponse {
        success: true;
        data: T;
    }

    export interface UnsuccessfulDiscordAPIResponse extends BaseDiscordAPIResponse {
        success: false;
        message: string;
        code?: number;
    }

    export type Response<T extends unknown> = SuccessfulDiscordAPIResponse<T> | UnsuccessfulDiscordAPIResponse;

    const _discord: AxiosInstance = axios.create({
        baseURL: `https://discord.com/api/v10`,
        headers: {
            'Content-Type': `application/json`,
        },
    });

    /** Extracts the `{ message: "...", code: X }` portion of a Discord API 400 level response. */
    export function isolateDiscordErrorResponse(error: AxiosError): Omit<UnsuccessfulDiscordAPIResponse, `success`> | undefined {
        try {
            if (error.response?.data !== null && typeof error.response?.data === `object`) {
                const keys = Object.keys(error.response.data);
                if (keys.includes(`message`) && keys.includes(`code`)) {
                    const { message, code } = error.response.data as { message: string; code: number };
                    return { message, code };
                }
            }
        } catch (error) {
            /* don't care */
        }
    }

    function wrapErrorResponse(error: unknown): UnsuccessfulDiscordAPIResponse {
        if (axios.isAxiosError(error)) {
            const isolated = isolateDiscordErrorResponse(error);
            if (isolated !== undefined) {
                return { success: false, ...isolated };
            }
            return { success: false, message: error.message };
        }
        return { success: false, message: `Unknown error occurred` };
    }

    export async function getInviteData(inviteCode: string): Promise<Response<APIInvite>> {
        try {
            const { data } = await _discord.get<APIInvite>(`/invites/${inviteCode}`, {
                params: { with_expiration: true, with_counts: true },
            });
            return { success: true, data };
        } catch (error) {
            return wrapErrorResponse(error);
        }
    }

    export async function getUserInfo(accessToken: string): Promise<Response<APIUser>> {
        try {
            const { data } = await _discord.get<APIUser>(`/users/@me`, {
                headers: {
                    authorization: `Bearer ${accessToken}`,
                },
            });
            return { success: true, data };
        } catch (error) {
            return wrapErrorResponse(error);
        }
    }

    export async function getUserGuilds(accessToken: string): Promise<Response<APIPartialGuild[]>> {
        try {
            const { data } = await _discord.get<APIPartialGuild[]>(`/users/@me/guilds`, {
                headers: {
                    authorization: `Bearer ${accessToken}`,
                },
            });
            return { success: true, data };
        } catch (error) {
            return wrapErrorResponse(error);
        }
    }
}
