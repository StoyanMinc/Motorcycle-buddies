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
        __v: number,
        type: string
    },
    tripTitle: string,
    address: string,
    friends: [string],
    gps: string,
    date: string,
    owner: string,
    _id: string,
    createdAt: string,
    updatedAt: string,
    __v: string,
}



export interface CreateTrip {
    motorcycleId: string,
    tripTitle: string,
    address: string,
    friends: string,
    gps: string,
    date: string,
}