export const SET_EMAIL = "SET_EMAIL";
export const SET_NAME = "SET_NAME";
export const SET_PHOTO = "SET_PHOTO";
export const SET_UID = "SET_UID";

export function setUserName(name) {
    return {
        type: SET_NAME,
        name,
    };
}

export function setUserEmail(email) {
    return {
        type: SET_EMAIL,
        email,
    };
}

export function setUserPhoto(url) {
    return {
        type: SET_PHOTO,
        url,
    };
}

export function setUserUid(uid) {
    return {
        type: SET_UID,
        uid,
    };
}