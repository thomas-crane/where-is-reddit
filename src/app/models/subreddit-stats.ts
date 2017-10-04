/**
 * An object which includes some statistics about a subreddit
 * as well as the name and url of the subreddit.
 */
export interface SubredditStats {
    /**
     * The url of the subreddit. This could be used in a link
     * to navigate to the subreddit.
     */
    url: string,
    /**
     * The display name of the subreddit. This can include
     * lower case or capital letters
     */
    name: string,
    /**
     * The number of active users on the subreddit.
     */
    active: number,
    /**
     * The number of subscribers to the subreddit.
     */
    subscribers: number
}

/**
 * An object which includes an array of
 * SubredditStats objects which were generated
 * at the UTC timestamp.
 */
export interface SubredditStatSnapshot {
    /**
     * The UTC timestamp of when the snapshot was taken.
     */
    timestamp: number;
    /**
     * An array of all subreddit stats at the time of the snapshot.
     */
    data: SubredditStats[]
}
