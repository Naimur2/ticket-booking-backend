export interface ITokenData {
    _id: string;
    email: string;
}

export interface ILocation {
    _id?: string;
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

export interface ISeat {
    seatNumber: string;
    seatStatus: boolean;
    user?: string;
}

export interface ICoach {
    _id?: string;
    startingPoint: ILocation | string;
    destination: ILocation | string;
    bus: IBus | string;
    startingTime: string;
    price: number | string;
    date: Date;
    seats: ISeat[];
    maximumSeats: number;
}

export interface IUserSeats {
    _id?: string;
    coach: ICoach | string;
    seats: string[] | ISeat[];
}
export interface IUserProps {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    role: "admin" | "user";
    termsAccepted?: boolean;
    tickets?: IUserSeats[];
    phone?: string;
}
