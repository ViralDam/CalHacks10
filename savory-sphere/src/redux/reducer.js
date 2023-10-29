
import { SET_BIO, SET_DOB, SET_EMAIL, SET_FOODIE, SET_NAME, SET_PHOTO, SET_P_FEED, SET_UID } from "./actions";

const initialState = {
    user: {
        uid: '',
        displayName: 'Guest',
        email: '',
        photoUrl: '',
        bio: '',
        dob: '',
        foodies: [],
    },
    pFeed: [
        {
            id: '1',
            imageUrl: 'https://cdn.loveandlemons.com/wp-content/uploads/2021/04/green-salad.jpg',
            caption: 'Love this healthy salad! #HealthyEating',
            ratings: 80,
        },
        {
            id: '2',
            imageUrl: 'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2018/03/How-to-Boil-Eggs-main-1-2.jpg',
            caption: 'Ande ande ande!',
            ratings: 95,
        },
        {
            id: '3',
            imageUrl: 'https://images.freeimages.com/images/large-previews/ab2/burger-and-fries-1328407.jpg',
            caption: 'Burger',
            ratings: 25,
        },
    ]
}

const mainReducer = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case SET_EMAIL:
            return {
                ...state, user: {
                    ...state.user,
                    email: action.email ?? "",
                }
            };
        case SET_NAME:
            return {
                ...state, user: {
                    ...state.user,
                    displayName: action.name ?? "Guest",
                }
            };
        case SET_PHOTO:
            return {
                ...state, user: {
                    ...state.user,
                    photoUrl: action.url ?? "",
                }
            };
        case SET_UID:
            return {
                ...state, user: {
                    ...state.user,
                    uid: action.uid,
                }
            };
        case SET_BIO:
            return {
                ...state, user: {
                    ...state.user,
                    bio: action.bio,
                }
            };
        case SET_DOB:
            return {
                ...state, user: {
                    ...state.user,
                    dob: action.dob,
                }
            };
        case SET_FOODIE:
            return {
                ...state, user: {
                    ...state.user,
                    foodies: action.foodie
                }
            }
        case SET_P_FEED:
            const feed = [...state.pFeed, action.feed]
            return {
                ...state,
                pFeed: feed
            }
        default:
            return state;
    }
}

export default mainReducer;