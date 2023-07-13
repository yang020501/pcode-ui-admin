export interface UserState {
    users?: Array<User> | null
}
export interface UserActionRequest {
    id: string
}
export interface User {
    id: string,
    username: string,
    fullName: string,
    userStatus: number
}

export interface SetUserStatusReuest {
    user: UserActionRequest
    status: number
}