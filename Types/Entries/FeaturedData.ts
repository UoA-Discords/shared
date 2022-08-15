import { BasicUserInfo } from '../User';

export interface FeaturedData {
    /** User ID of person who featured this guild. */
    featuredBy: BasicUserInfo;

    featuredSince: string;
}
