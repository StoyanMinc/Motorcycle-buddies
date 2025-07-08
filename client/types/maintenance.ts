export interface AddModalProps {
    closeModal: () => void,
    refetch: () => void
}

export interface CreateMaintenance {
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
