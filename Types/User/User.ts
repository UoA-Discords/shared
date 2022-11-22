import { APIUser } from 'discord-api-types/v10';
import { EntryState } from '../Entry';
import { UserPermissions } from './Permissions';

/**
 * Basic user information, used to display a user without having
 * to call the API to get their full profile (if it exists).
 */
export interface BasicUserInfo {
    id: string;
    username: string;
    discriminator: string;
    avatar: string | null;
    permissions: UserPermissions;
}

export interface SiteUser extends Pick<APIUser, 'id' | 'username' | 'discriminator' | 'avatar' | 'public_flags'> {
    ip: string;
    firstLogin: string;
    lastLogin: string;
    permissions: UserPermissions;

    /**
     * Number of applications this user currently has that are of a certain state.
     *
     * E.g. having their application approved will increment `myApplicationStats[EntryStates.Approved]`
     * and decrement `myApplicationStats[EntryStates.Pending]`.
     */
    myApplicationStats: Record<EntryState, number>;

    /**
     * Number of entry state modifications this user has made, these should never decrement.
     *
     * E.g. changing an entry from withdrawn to approved will increment `myAdminStats[EntryStates.Approved]`
     * by 1, but will not decrease `myAdminStats[EntryStates.Withdrawn]`.
     */
    myAdminStats: Record<Exclude<EntryState, EntryState.Pending>, number>;

    likes: string[];
}
