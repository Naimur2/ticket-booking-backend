export interface IUserProps {
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

export interface ILocation {
    name: string;
    address: string;
    phone: string;
    email: string;
    description: string;
    image?: string;
}

export interface IBus {
    _id?: string;
    busName: string;
    busLiscenseNumber: string;
    busType: "AC" | "Non-AC";
    busDescription: string;
    busImage?: string;
    seatNumber: string;
}

export interface ICoach {
    _id?: string;
    startingPoint: ILocation | string;
    destination: ILocation | string;
    bus: IBus | string;
    startingTime: string;
}
