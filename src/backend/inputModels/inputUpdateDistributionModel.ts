export default class InputUpdateDistribuitionModel {
    constructor(
        public id: string,
        public name: string,
        public channel: string,
        public created_at: Date,
        public answered: number,
        public anonymous_answer: boolean,
        public csv_file: string,
        public pendent: number, 
        public canceled_subscription: number,
        public included: number,
        public valid: number, 
        public sent: number, 
        public template: string,
        public research_id: string,
        public sent_at: Date | null,
        public updated_at: Date
    ) {}
}