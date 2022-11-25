/** All possible states of Discord server entries in the database.  */
export enum EntryState {
    /** Initial state of entries, should be private. */
    Pending,

    /** Resting state of entries, should be public. */
    Approved,

    /** Approved and also currently featured. */
    Featured,

    /** Should be private. */
    Denied,

    /** Effectively 'retroactively denied', should be private. */
    Withdrawn,
}
