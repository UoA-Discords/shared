/** All possible states of Discord server entries in the database.  */
export enum EntryStates {
    /** Initial state of entries, should be hidden from public. */
    Pending,

    /** Resting state of entries, should be visible to public. */
    Approved,

    /** Should be invisible to public. */
    Denied,

    /** Effectively "retroactively denied", should be invisible to public. */
    Withdrawn,
}
