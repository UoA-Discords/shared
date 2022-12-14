import { EntryState } from './State';
import { EntryFacultyTags, EntryMiscTags } from './Tags';
import { UserReference } from '../User';
import { GuildData } from './GuildData';
import { ActionLog } from './ActionLog';

interface BaseEntry {
    /** ID of the guild this entry refers to. */
    id: string;

    state: EntryState;

    /** Without the `discord.gg/` prefix. */
    inviteCode: string;

    /**
     * Who created this invite on Discord.
     *
     * May be **null**, since some invites do not have a creator.
     *
     * Note that this user may not be registered on the site, as it is possible
     * to use an invite created by someone else.
     */
    inviteCreatedBy: UserReference | null;

    guildData: GuildData;

    /**
     * Array of server member count over the last 30 days,
     * with the first number being the oldest.
     *
     * Will not necessarily be length 30, since only starts tracking from
     * when the server was registered to the UoA Discords website.
     */
    memberCountHistory: [online: number, total: number][];

    createdBy: string;

    createdAt: string;

    likes: number;

    tags: {
        faculty: EntryFacultyTags;
        misc: EntryMiscTags;
    };
}

/** An entry that has not yet been looked at by a moderator. */
export interface PendingEntry extends BaseEntry {
    state: EntryState.Pending;
}

/** An entry that has been looked at by a moderator, and is no longer pending. */
export interface FullEntry<T extends Exclude<EntryState, EntryState.Pending>> extends BaseEntry {
    /** Latest state of this entry; approved, denied, or withdrawn. */
    state: T;

    log: ActionLog[];
}
