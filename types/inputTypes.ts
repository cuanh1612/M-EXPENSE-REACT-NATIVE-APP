export interface ITrip {
    id?: string;
    name: string;
    destination: string;
    description: string;
    note: string;
    topic: string;
    date?: string;
    RequiredRiskAssessment?: boolean;
    image?: string;
    userId?: string;
}

export interface IExpense {
    id?: string;
    type?: string;
    date?: string;
    time?: string;
    amount: number;
    additionalComments?: string;
    tripId?: string;
    userId?: string;
}

export interface IUser {
    id?: string;
    name?: string;
    email: string;
    password: string;
}