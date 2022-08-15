import { EntryStates } from './States';
import { EntryFacultyTags } from './Tags';
import { APIInviteGuild } from 'discord-api-types/v10';
import { FeaturedData } from './FeaturedData';
import { BasicUserInfo } from '../User';

export interface BaseEntry {
    id: string;

    state: EntryStates;

    inviteCode: string;

    /** Won't necessarily have a corresponding full user profile on the server. */
    inviteCreatedBy: BasicUserInfo;

    guildData: APIInviteGuild;

    /**
     * Array of server member count over the last 30 days,
     * with the first number being the oldest.
     *
     * Will not necessarily be length 30, since only starts tracking from
     * when the server was registered to the UoA Discords website.
     */
    memberCountHistory: number[];
    createdBy: BasicUserInfo;
    createdAt: string;

    likes: number;
    dislikes: number;
    facultyTags: EntryFacultyTags[];

    featured?: FeaturedData;
}

export interface PendingEntry extends BaseEntry {
    state: EntryStates.Pending;
}

export interface ApprovedEntry extends BaseEntry {
    state: EntryStates.Approved;
    approvedBy: BasicUserInfo;
    approvedAt: string;
}

export interface DeniedEntry extends BaseEntry {
    state: EntryStates.Denied;
    deniedBy: BasicUserInfo;
    deniedAt: string;
    reason: string;
}

export interface WithdrawnEntry extends BaseEntry {
    state: EntryStates.Withdrawn;
    withdrawnBy: BasicUserInfo;
    withdrawnAt: string;
    reason: string;
}

export type Entry = WithdrawnEntry | DeniedEntry | ApprovedEntry | PendingEntry;
