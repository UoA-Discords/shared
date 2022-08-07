import { APIUser } from 'discord-api-types/v10';
import { UserPermissionLevels } from './PermissionLevels';

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
        applied: number;
        approved: number;
        denied: number;
        withdrawn: number;
    };
    likes: string[];
    dislikes: string[];
}
