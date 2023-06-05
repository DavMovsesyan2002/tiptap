export interface ITweetsProps {
    tweetsList: ITweetProps[]
    count: number
}

export interface ITweetProps{
    imageURL: string;
    name: string;
    text: string;
    userName: string;
    id: string
}