import permissionLevelToString from '../functions/permissionLevelToString';
import { UserPermissions } from '../types/User';
import { ErrorAction, ServerError, UnauthenticatedReason } from './types';

/**
 * Makes a 'Rate Limited' error.
 * @param {number} maxRequestsPerWindow Maximum number of requests per window.
 * @param {number} windowRemaining Number of seconds left in current window.
 * @param {number} [windowSize=60] Time between request quota resets in seconds (default 60).
 */
export function makeRateLimitedError(
    maxRequestsPerWindow: number,
    windowRemaining: number,
    windowSize: number = 60,
): ServerError<ErrorAction.Wait> {
    return {
        title: 'Rate Limited',
        subtitle: `Too many requests in the last ${windowSize} seconds (max ${maxRequestsPerWindow}).`,
        cause: 'Rapidly refreshing the page or loading new pages.',
        action: ErrorAction.Wait,
        actionData: windowRemaining,
    };
}

/**
 * Makes an 'Unauthenticated' error, for when the client has missing credentials.
 * @param {UnauthenticatedReason} reason Why authentication failed.
 * @param {string} attemptedActionName Name of the action attempted, e.g. 'edit users' or 'change your name'.
 */
export function makeUnauthenticatedError(
    reason: UnauthenticatedReason,
    attemptedActionName: string,
): ServerError<ErrorAction.Login | ErrorAction.Logout | ErrorAction.LoginAgain | ErrorAction.Report> {
    const baseError = {
        title: 'Unauthenticated',
        subtitle: `You must be logged in to ${attemptedActionName}.`,
        actionData: null,
    };
    switch (reason) {
        case UnauthenticatedReason.Missing:
            return {
                cause: null,
                action: ErrorAction.Login,
                ...baseError,
            };
        case UnauthenticatedReason.NotBearer:
            return {
                cause: 'The value of the `Authorization` header of your request does not follow the Bearer authentication scheme.',
                action: ErrorAction.LoginAgain,
                ...baseError,
            };
        case UnauthenticatedReason.Malformed:
            return {
                cause: 'Malformed access token, it may have been signed with a different secret key.',
                action: ErrorAction.LoginAgain,
                ...baseError,
            };
        case UnauthenticatedReason.NoExpiry:
            return {
                cause: 'Access token has no expiry date.',
                action: ErrorAction.LoginAgain,
                ...baseError,
            };
        case UnauthenticatedReason.Expired:
            return {
                cause: 'Current access token has expired.',
                action: ErrorAction.LoginAgain,
                ...baseError,
            };
        case UnauthenticatedReason.BadShape:
            return {
                cause: 'Access token payload had a bad shape, may have been signed by an outdated handler.',
                action: ErrorAction.LoginAgain,
                ...baseError,
            };
        case UnauthenticatedReason.NoAssociatedUser:
            return {
                cause: 'Access token credentials have no associated user, your account may have been deleted.',
                action: ErrorAction.Logout,
                ...baseError,
            };
    }
}

/**
 * Makes an 'Unauthorized' error, for when the client has missing {@link UserPermissions permissions}.
 * @param {string} attemptedActionName Name of the action attempted, e.g. 'edit users' or 'change your name'.
 * @param {UserPermissions} requiredPermissions All permissions required.
 * @param {UserPermissions} currentPermissions Permissions the client currently has.
 */
export function makeUnauthorizedError(
    attemptedActionName: string,
    requiredPermissions: UserPermissions,
    currentPermissions: UserPermissions,
): ServerError<ErrorAction.GiveUp> {
    const missingPermissions: UserPermissions = requiredPermissions & ~currentPermissions;

    return {
        title: 'Unauthorized',
        subtitle: `You don't have permission to ${attemptedActionName}.`,
        cause: null,
        action: ErrorAction.GiveUp,
        actionData: {
            current: permissionLevelToString(currentPermissions, true),
            required: permissionLevelToString(requiredPermissions, true),
            missing: permissionLevelToString(missingPermissions, true),
        },
    };
}
