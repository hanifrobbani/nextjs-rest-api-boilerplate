export type getUserResponse = {
    id: number,
    username: string,
    email: string,
    password: number|null,
}[]
export type PostUserPayload  = {
    username: string,
    email: string,
    password: string,
}

export type postUserResponse = {
    message: string,
    status: number
}