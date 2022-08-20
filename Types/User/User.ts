import { APIUser } from 'discord-api-types/v10';
import { EntryStates } from '../Entries';
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
     * Number of applications this user currently has that are of a certain state.
     *
     * These should decrement on state change.
     *
     * E.g. having their entry approved will increment `myApplicationStats[EntryStates.Approved]`
     * and decrement `myApplicationStats[EntryStates.Pending]`.
     */
    myApplicationStats: Record<EntryStates, number>;

    /** Number of entry state modifications this user has made,
     * these should never decrement.
     *
     * E.g. changing an entry from withdrawn to approved will increment `myAdminStats[EntryStates.Approved]`
     * by 1, but will not decrease `myAdminStats[EntryStates.Withdrawn]`.
     */
    myAdminStats: Record<Exclude<EntryStates, EntryStates.Pending>, number>;

    likes: string[];
}
