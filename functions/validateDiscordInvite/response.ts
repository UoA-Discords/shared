import { APIGuild, APIInvite, APIInviteGuild } from 'discord-api-types/v10';
import { InvalidInviteReasons } from './invalidInviteReasons';

interface BaseResponse {
    valid: boolean;
}

interface ValidResponse extends BaseResponse {
    valid: true;
    invite: APIInvite;
}

interface InvalidResponse extends BaseResponse {
    valid: false;
    reason: InvalidInviteReasons;
}

export type ValidateDiscordInviteResponse = ValidResponse | InvalidResponse;
