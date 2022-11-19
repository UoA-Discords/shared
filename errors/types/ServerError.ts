import { ErrorAction, ErrorActionData } from './ErrorAction';

export interface ServerError<T extends ErrorAction> {
    /**
     * Title of this error, e.g:
     *
     * - Rate Limited
     * - Session Expired
     * - Authentication Failed
     * - Unauthorized
     */
    title: string;

    /**
     * Brief description of this error, e.g:
     * - Too many requests in the last 60 seconds.
     * - Too long since last login/refresh.
     * - You must be logged in to edit users.
     * - Missing 'Edit Users' permission.
     */
    subtitle: string;

    /**
     * Description of what (usually) causes this error to occur, e.g:
     * - The account you are currently logged in as has been deleted.
     * - Rapidly refreshing the page or loading new pages.
     *
     * Only needed if unclear from title/subtitle.
     */
    cause: string | null;

    /** Recommended action the client should take in response to this error. */
    action: T;

    /**
     * Accompanying data for the recommended action, for instance the {@link ErrorAction.Wait wait} action will include
     * how long (in seconds) to wait for.
     */
    actionData: ErrorActionData<T>;
}
