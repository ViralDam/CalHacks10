export const SET_EMAIL = "SET_EMAIL";
export const SET_NAME = "SET_NAME";
export const SET_PHOTO = "SET_PHOTO";
export const SET_UID = "SET_UID";
export const SET_BIO = "SET_BIO";
export const SET_DOB = "SET_DOB";
export const SET_FOODIE = "SET_FOODIE";
export const SET_P_FEED = "SET_P_FEED";

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

export function setUserBio(bio) {
    return {
        type: SET_BIO,
        bio,
    };
}

export function setUserDob(dob) {
    return {
        type: SET_DOB,
        dob,
    };
}

export function setFoodie(foodie) {
    return {
        type: SET_FOODIE,
        foodie,
    };
}

export function addPFeed(feed) {
    return {
        type: SET_P_FEED,
        feed,
    };
}
