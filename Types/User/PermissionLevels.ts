export enum UserPermissionLevels {
    /** User cannot do anything besides look at servers on the site and login. */
    None,

    /** User can and like and dislike existing entries. */
    LikeDislike,

    /** Default level, user can create applications (limit of 1 pending application per user). */
    Default,

    /** User can create more applications (limit of 10 pending applications per user). */
    Elevated,

    /** User can approve/deny applications and modify existing entries. */
    Moderator,

    /** User can change other user's permission levels up to (and including) moderator. */
    Administrator,

    /** User can change other user's permission levels up to (and including) administrator. */
    Owner,
}
