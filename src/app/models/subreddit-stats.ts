export interface SubredditStats {
    url: string,
    name: string,
    active: number,
    subscribers: number
}

export interface SubredditStatSnapshot {
    timestamp: number;
    data: SubredditStats[]
}
