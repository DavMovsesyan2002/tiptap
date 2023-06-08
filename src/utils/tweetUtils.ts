interface ICreateNewTweetProps{
    uuid: string
}

export const createNewTweetObject = ({uuid}: ICreateNewTweetProps) => ({
    name: 'Sergei',
    userName: '@Sergei757063608',
    text: '',
    id: uuid,
    imageURL: '',
});

export default {
    createNewTweetObject,
};