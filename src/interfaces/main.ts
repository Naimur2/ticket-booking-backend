export interface UserProps {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    role: "admin" | "user";
    createdAt?: Date;
    updatedAt?: Date;
}
