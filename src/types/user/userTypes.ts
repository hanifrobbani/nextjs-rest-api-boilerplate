export type getUserResponse = {
    name: string,
    email: string,
    age: number|null,
}
export type PostUserPayload  = {
    name: string,
    email: string,
    age: number,
}

export type postUserResponse = {
    message: string,
    status: number
}