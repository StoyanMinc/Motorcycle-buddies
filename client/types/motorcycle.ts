export interface Motorcycle {
    _id: string;
    manufacturer: string;
    model: string;
    description: string;
    year: string;
    boughtYear: string;
    soldYear: string;
    owner: { username: string };
    image: string;
    imagePublicId: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateMotorcycleType {
    manufacturer: string;
    model: string;
    description: string;
    year: string;
    boughtYear: string;
    soldYear: string;
    image: File | null | string
}