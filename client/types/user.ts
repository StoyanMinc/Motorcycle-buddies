export interface User {
    _id: string;
    email: string;
    username: string;
    photo: string;
    bio: string;
    role: string;
    isVerified: boolean;
    createdAt: string
}

export interface UpdateUser {
    username: string;
    bio: string;
}