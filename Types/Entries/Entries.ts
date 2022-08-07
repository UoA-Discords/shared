import { DenyOrWithdrawReasons, EntryAction } from './EntryActions';
import { EntryStates } from './States';
import { EntryFacultyTags } from './Tags';
import { APIInviteGuild } from 'discord-api-types/v10';

interface BaseEntry {
    id: string;

    state: EntryStates;
    inviteCode: string;

    guildData: APIInviteGuild;

    /**
     * Array of server member count over the last 30 days,
     * with the first number being the oldest.
     *
     * Will not necessarily be length 30, since only starts tracking from
     * when the server was registered to the UoA Discords website.
     */
    memberCountHistory: number[];
    createdById: string;
    createdAt: string;

    likes: number;
    dislikes: number;
    log: EntryAction[];
    tags: EntryFacultyTags[];
}

export interface PendingEntry extends BaseEntry {
    state: EntryStates.PendingApproval;
    log: [];
}

export interface ApprovedEntry extends BaseEntry {
    state: EntryStates.Approved;
    approvedById: string;
    approvedAt: string;
}

export interface DeniedEntry extends BaseEntry {
    state: EntryStates.Denied;
    deniedById: string;
    deniedAt: string;
    reason: DenyOrWithdrawReasons;
    message?: string;
}

export interface WithdrawnEntry extends BaseEntry {
    state: EntryStates.Withdrawn;
    withdrawnById: string;
    withdrawnAt: number;
    reason: DenyOrWithdrawReasons;
    message?: string;
}

export type AnyEntry = WithdrawnEntry | DeniedEntry | ApprovedEntry | PendingEntry;
