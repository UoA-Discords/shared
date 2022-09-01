import { EntryStates } from './States';
import { EntryFacultyTags } from './Tags';
import { BasicUserInfo } from '../User';
import { GuildData } from './GuildData';

interface BaseEntry {
    /** ID of the guild this entry refers to. */
    id: string;

    state: EntryStates;

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
    inviteCreatedBy: BasicUserInfo | null;

    guildData: GuildData;

    /**
     * Array of server member count over the last 30 days,
     * with the first number being the oldest.
     *
     * Will not necessarily be length 30, since only starts tracking from
     * when the server was registered to the UoA Discords website.
     */
    memberCountHistory: [online: number, total: number][];

    /** This user definitely should be registered. */
    createdBy: BasicUserInfo;
    createdAt: string;

    likes: number;
    facultyTags: EntryFacultyTags[];
}

/** An entry that has not yet been looked at by a moderator. */
export interface PendingEntry extends BaseEntry {
    state: EntryStates.Pending;
}

/** An entry that has been looked at by a moderator, and is no longer pending. */
export interface FullEntry<T extends Exclude<EntryStates, EntryStates.Pending>> extends BaseEntry {
    /** Latest state of this entry; approved, denied, or withdrawn. */
    state: T;

    /**
     * User who transitioned this entry into its latest state,
     * may be **null** if the entry was automatically withdrawn.
     */
    stateActionDoneBy: T extends EntryStates.Withdrawn ? BasicUserInfo | null : BasicUserInfo;

    /** When this entry was transitioned into its current state. */
    stateActionDoneAt: string;

    stateActionReason: T extends EntryStates.Withdrawn | EntryStates.Denied ? string : null;
}
