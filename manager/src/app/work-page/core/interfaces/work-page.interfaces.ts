export interface Client {
    name: string;
    phoneNumber: string;
    date: string;
}

export interface ReviewClient {
    key: string,
    data: Client
}