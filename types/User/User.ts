import { APIUser } from 'discord-api-types/v10';
import { EntryState } from '../Entry';
import { UserPermissions } from './Permissions';

/**
 * A Discord user who is referenced in the site but doesn't have a full account on it.
 *
 * This can happen if a user's profile is deleted, or if they created an invite that someone else made an application
 * for.
 */
export interface NonSiteUser {
    id: string;
    username: string;
    discriminator: string;
    avatar: string | null;
}

export interface SiteUser extends Pick<APIUser, 'id' | 'username' | 'discriminator' | 'avatar' | 'public_flags'> {
    ip: string;
    firstLogin: string;
    lastLogin: string;
    permissions: UserPermissions;

    /**
     * Number of applications this user currently has that are of a certain state.
     *
     * E.g. having their application approved will increment `applicationStats[EntryStates.Approved]`
     * and decrement `applicationStats[EntryStates.Pending]`.
     */
    applicationStats: Record<EntryState, number>;

    /**
     * Number of entry state modifications this user has made.
     *
     * E.g. changing an entry from withdrawn to approved will increment `adminStats[EntryStates.Approved]`
     * by 1, and will decrease `adminStats[EntryStates.Withdrawn]` by 1 for the user who originally approved the entry.
     */
    adminStats: Record<Exclude<EntryState, EntryState.Pending>, number>;

    likes: string[];
}

/** The ID of the user if they are registered to the site, otherwise their basic information. */
export type UserReference = NonSiteUser | string;
