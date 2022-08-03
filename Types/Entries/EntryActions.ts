import { EntryStates } from './States';

export enum DenyOrWithdrawReasons {
    /** This server is not UoA specific. */
    Irrelevant,

    /** The invite for this server is invalid. */
    InviteInvalid,

    Other,
}

interface BaseEntryAction<T extends Exclude<EntryStates, EntryStates.PendingApproval>> {
    action: T;
    doneById: string;
    doneAt: string;
}

export type EntryActionApprove = BaseEntryAction<EntryStates.Approved>;

export interface EntryActionDenyOrWithdraw extends BaseEntryAction<EntryStates.Denied | EntryStates.Withdrawn> {
    reason: DenyOrWithdrawReasons;
    message?: string;
}

export type EntryAction = EntryActionApprove | EntryActionDenyOrWithdraw;
