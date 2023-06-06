import {ITweetsProps} from '@allTypes/reduxTypes/tweetsStateTypes'

export const getInitialState = (): ITweetsProps => ({
        tweetsList: [{
            name: 'Sergei',
            userName: '@Sergei757063608',
            text: '',
            id: '1',
            imageURL: '',
        }],
        tweetOfId: '',
        tweetOfIndex: 0,
        count: 0
    }
)
