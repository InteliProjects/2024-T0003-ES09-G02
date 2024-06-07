export default class AnswersModel {
    constructor(
        public id: string,
        public phoneNumber: string,
        public Time: number,
        public finished: boolean,
        public started: boolean,
        public answer: string,
        public distribution_id: string,
    ) {}
}