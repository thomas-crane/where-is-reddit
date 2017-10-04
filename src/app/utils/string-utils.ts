export function getRawSubredditName(subreddit: string): string {
    return subreddit.trim().replace(/\/?r\//ig, '').toLowerCase();
}
