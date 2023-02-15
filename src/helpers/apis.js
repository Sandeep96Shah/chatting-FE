const API_ROOT = "http://13.233.24.54:8000"

export const APIUrls = {
    signIn : () => `${API_ROOT}/userSession`,
    validate : () => `${API_ROOT}/user/sign-in`,
    users : () => `${API_ROOT}/all-users`,
    friends : () => `${API_ROOT}/user-friends`,
    search : () => `${API_ROOT}/search-friend`,
    makeFriend: (from, to) => `${API_ROOT}/friendship/${to}`,
    chatroom : (from, to) => `${API_ROOT}/private/${from}/${to}/chatroom`,
    privateMessage : (to) => `${API_ROOT}/private-message/${to}/`,
    addMessage : (to) => `${API_ROOT}/private-message/${to}/add`,
    currentUserDetails: () => `${API_ROOT}/current-user`,
    signUp: () => `${API_ROOT}/user/sign-up`,
}

