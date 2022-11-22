/** Reasons why authentication may fail (HTTP 401), assuming a bearer scheme. */
export enum UnauthenticatedReason {
    /** Missing `Authorization` header. */
    Missing,

    /** `Authorization` header was present, but not `Bearer` scheme. */
    NotBearer,

    /** Access token was present but malformed. */
    Malformed,

    /** Access token had no expiry date. */
    NoExpiry,

    /** Access token was expired. */
    Expired,

    /** Access token payload was of a bad shape. */
    BadShape,

    /** Credentials within access token corresponded to no known user. */
    NoAssociatedUser,
}
