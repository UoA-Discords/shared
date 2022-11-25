import { NonSiteUser } from '../User';
import { EntryState } from './State';

/** Information about a change in state of an entry, who performed it, and for what reason. */
export interface ActionLog<
    T extends Exclude<EntryState, EntryState.Pending> = Exclude<EntryState, EntryState.Pending>,
> {
    /** The state that the entry was changed to. */
    newState: T;

    /** ISO string timestamp for this action. */
    doneAt: string;

    /**
     * User who transition this entry into its latest state, may be **null** if the entry was automatically
     * withdrawn/denied.
     */
    doneBy: T extends EntryState.Withdrawn | EntryState.Denied ? NonSiteUser | null : NonSiteUser;

    /** Justification or explanation for this action. */
    reason: string;
}
