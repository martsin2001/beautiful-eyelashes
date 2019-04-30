export class AcceptedClient {
    constructor(
        public name: string,
        public phone: string,
        public date: string
    ) { }
}

export class ReviewAcceptedClient {
    constructor(
        public key: string,
        public data: AcceptedClient
    ) { }
}