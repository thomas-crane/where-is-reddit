
/**
 * Takes a subreddit name and removes any string similar /r/ or R/,
 * and converts it to lower case.
 * @param subreddit The subreddit to get the raw name of.
 */
export function getRawSubredditName(subreddit: string): string {
    return subreddit.trim().replace(/\/?r\//ig, '').toLowerCase();
}
