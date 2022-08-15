import { APIUser } from 'discord-api-types/v10';
import { UserPermissionLevels } from './PermissionLevels';

/**
 * Basic user information, used to display a user without having
 * to call the API to get their full profile (if it exists).
 */
export interface BasicUserInfo {
    id: string;
    username: string;
    discriminator: string;
    avatar: string | null;
    permissionLevel: UserPermissionLevels;
}

export interface SiteUser extends Pick<APIUser, `id` | `username` | `discriminator` | `avatar` | `public_flags`> {
    ip: string;
    firstLogin: string;
    lastLogin: string;
    permissionLevel: UserPermissionLevels;

    /**
     * Statistics should always be current.
     *
     * I.e. If one of this user's applications moves from applied to approved,
     * applied should be decremented and approved should be incremented.
     */
    applicationStats: {
        /** Number of applications this user currently has that are pending. */
        applied: number;
        /** Number of applications this user curently has that are approved. */
        approved: number;
        /** Number of applications this user curently has that are denied. */
        denied: number;
        /** Number of applications this user curently has that are withdrawn. */
        withdrawn: number;
    };

    likes: string[];
    dislikes: string[];
}
