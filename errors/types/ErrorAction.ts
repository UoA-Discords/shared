export enum ErrorAction {
    /**
     * Should wait some time before trying this request again (e.g. rate limited).
     *
     * Additional data: number of seconds to wait.
     */
    Wait,

    /** Should login before trying this request again (e.g. unauthenticated). */
    Login,

    /**
     * Should logout and not attempt this request again (e.g. authenticated user no longer exists).
     *
     * Additional data: none.
     */
    Logout,

    /**
     * Should log out and log back in before reattempting this request (e.g. expired login credentials).
     *
     * Additional data: none.
     */
    LoginAgain,

    /**
     * Should report this error to a developer.
     *
     * Additional data: none.
     */
    Report,

    /**
     * Don't try to make this request again, unless the requested has obtained the required permissions to do so.
     *
     * Additional data: object containing arrays of required, current, and missing permissions.
     */
    GiveUp,
}

export type ErrorActionData<T extends ErrorAction> = T extends ErrorAction.Wait
    ? number
    : T extends ErrorAction.GiveUp
    ? { current: string[]; required: string[]; missing: string[] }
    : null;
