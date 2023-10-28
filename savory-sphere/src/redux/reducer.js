import { SET_EMAIL, SET_NAME, SET_PHOTO, SET_UID } from "./actions";

const initialState = {
    user: {
        uid: '',
        displayName: 'Guest',
        email: '',
        photoUrl: ''
    }
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
        default:
            return state;
    }
}

export default mainReducer;