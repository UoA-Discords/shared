export enum UserPermissions {
    /** Can login via Discord. */
    Login = 1 << 0,

    /** Can like/dislike entries. */
    Like = 1 << 1,

    /** Can create an application (max 1 pending per user). */
    CreateApplication = 1 << 2,

    /** Can create many applications (max 10 pending per user). */
    CreateManyApplications = 1 << 3,

    /** Can edit, approve, and deny applications. */
    ManageApplications = 1 << 4,

    /** Can edit, withdraw, and reinstate entries.  */
    ManageEntries = 1 << 5,

    /** Can feature and unfeature approved entries. */
    Feature = 1 << 6,

    /**
     * Can assign and remove permissions (including themselves).
     *
     * Cannot modify users with this permision or the owner permission (excluding themselves).
     */
    ManageUsers = 1 << 7,

    /** Can assign and remove the 'manage users' permission. */
    Owner = 1 << 8,
}

export const defaultPermissions = UserPermissions.Login | UserPermissions.Like | UserPermissions.CreateApplication;
