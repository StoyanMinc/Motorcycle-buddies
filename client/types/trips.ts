export interface Trip {
    motorcycleId: {
        _id: string,
        manufacturer: string,
        model: string,
        description: string,
        year: string,
        boughtYear: string,
        soldYear: string,
        owner: string,
        image: string,
        imagePublicId: string,
        createdAt: string,
        updatedAt: string,
        __v: number
    },
    tripTitle: string,
    friends: [string],
    gps: string,
    date: string,
    owner: string,
    _id: string,
    createdAt: string,
    updatedAt: string,
    __v: string,
}

export interface AddTripProps {
    closeModal: () => void,
    refetch: () => void,
    editData?: EditTrip | null;
}

export interface CreateTrip {
    motorcycleId: string,
    tripTitle: string,
    friends: string,
    gps: string,
    date: string,
}

export interface EditTrip {
    _id: string,
    motorcycleId: string,
    tripTitle: string,
    friends: string[],
    gps: string,
    date: string,
}