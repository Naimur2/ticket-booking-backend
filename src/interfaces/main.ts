export interface ITrackTime {
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IUserProps extends ITrackTime {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    role: "admin" | "user";
    termsAccepted?: boolean;
}

export interface ITokenData {
    _id: string;
    email: string;
}

export interface IAddLocationProps extends ITrackTime {
    name: string;
    address: string;
    phone: string;
    email: string;
    description: string;
    image?: string;
}

export interface IBus extends ITrackTime {
    busName: string;
    busNumber: string;
    busType: string;
    busDescription: string;
    busImage: string;
    seatNumber: number;
}
