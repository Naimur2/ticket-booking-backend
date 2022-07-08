export interface IUserProps {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    role: "admin" | "user";
    createdAt?: Date;
    updatedAt?: Date;
    termsAccepted?: boolean;
}

export interface ITokenData {
    _id: string;
    email: string;
}

export interface IAddLocationProps {
    name: string;
    address: string;
    phone: string;
    email: string;
    description: string;
    image?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
