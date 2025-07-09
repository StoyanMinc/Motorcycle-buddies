export interface AddModalProps {
    closeModal: () => void,
    refetch: () => void,
    editData?: EditMaintenance | null; 
}

export interface CreateMaintenance {
    motorcycleId: string,
    serviceType: string,
    description: string,
    cost: number,
    km: number,
    date: string
}

export interface EditMaintenance {
    _id: string,
    motorcycleId: string,
    serviceType: string,
    description: string,
    cost: number,
    km: number,
    date: string
}

export interface Maintenance {
    _id: string;
    serviceType: string,
    description: string;
    cost: number;
    km: string;
    date: string;
    motorcycleId: {
        manufacturer: string,
        model: string,
        _id: string
    };
    createdAt: string;
    updatedAt: string;
}

export interface MaintenanceDetails {
    _id: string;
    serviceType: string,
    description: string;
    cost: number;
    km: string;
    date: string;
    motorcycleId: {
        boughtYear: string,
        createdAt: string,
        description: string,
        image: string,
        imagePublicId: string,
        manufacturer: string,
        model: string,
        owner: string,
        soldYear: string,
        updatedAt: string,
        year: string,
        _v: number
        _id: string,
    };
    createdAt: string;
    updatedAt: string;
}
