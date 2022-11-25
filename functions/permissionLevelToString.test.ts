import { UserPermissions } from '../types/User';
import permissionLevelToString from './permissionLevelToString';

describe('permissionLevelToString', () => {
    it('returns some expected values', () => {
        expect(permissionLevelToString(UserPermissions.Like | UserPermissions.Login)).toEqual(
            expect.arrayContaining(['Like', 'Login']),
        );
    });
});
