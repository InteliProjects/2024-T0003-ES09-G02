export default class DistributionListDTO {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public phoneNumber: string,
        public age: number,
        public isValid: boolean,
        public distribution_id: string,

    ) {}
}