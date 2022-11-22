import { UserPermissions } from '../types/User';

/**
 * Converts a bitfield of {@link UserPermissions} into an array of strings, with each array item corresponding to the
 * name of a bit in the `UserPermissions` enum.
 * @param {UserPermissions} n Bitfield of permissions to convert.
 * @param {boolean} [withNumbers=false] Whether to include numerical representation (1 << x) after names.
 *
 * @example
 * ```ts
 * permissionLevelToString(UserPermissions.CreateApplication | UserPermissions.Login)
 * // [ 'Login', 'CreateApplication' ]
 *
 * permissionLevelToString(UserPermissions.CreateApplication | UserPermissions.Login, true)
 * // [ 'Login (1 << 0)', 'CreateApplication (1 << 2)' ]
 * ```
 */
export default function permissionLevelToString(n: UserPermissions, withNumbers: boolean = false) {
    const values: string[] = [];
    while (n > 0) {
        const bit = n & (~n + 1);
        if (withNumbers) values.push(`${UserPermissions[bit]} (1 << ${Math.log2(bit)})`);
        else values.push(UserPermissions[bit]);

        n ^= bit;
    }
    return values;
}
