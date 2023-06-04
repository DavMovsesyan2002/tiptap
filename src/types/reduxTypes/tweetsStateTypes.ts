export interface ITweetsProps {
    tweetsList: ITweetProps[]
}

export interface ITweetProps{
    imageURL: string;
    name: string;
    text: string;
    userName: string;
    id: string
}