import { UserPermissionLevels } from '../Types/User/PermissionLevels';

export function permissionLevelToString(level: UserPermissionLevels, includeRawValue: boolean): string {
    const suffix = includeRawValue ? ` (${level})` : ``;
    switch (level) {
        case UserPermissionLevels.Administrator:
            return `administrator${suffix}`;
        case UserPermissionLevels.Default:
            return `default${suffix}`;
        case UserPermissionLevels.Elevated:
            return `elevated${suffix}`;
        case UserPermissionLevels.LikeDislike:
            return `reduced${suffix}`;
        case UserPermissionLevels.Moderator:
            return `moderator${suffix}`;
        case UserPermissionLevels.None:
            return `none${suffix}`;
        case UserPermissionLevels.Owner:
            return `owner${suffix}`;
    }
}
