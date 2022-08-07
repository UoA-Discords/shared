export enum InvalidInviteReasons {
    /** This invite code does not exist. */
    NotFound,

    /** This invite has an expiry date, or it's expiry date is undefined. */
    Expires,

    /** This invite code does not correspond to any guild. */
    NoGuild,

    /** The guild associated with this invite does not have enough members. */
    TooSmall,

    /** The guild associated with this invite does not have a server icon. */
    NoIcon,

    /** The verification level of the guild associated with this invite is too low. */
    NotVerified,

    /** This invite code resulted in a unknown error occurring during validation. */
    Unknown,
}
