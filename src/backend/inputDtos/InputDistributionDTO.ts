export default class InputDistribuitionDTO {
    constructor(
        public name: string,
        public channel: string,
        public anonymous_answer: boolean,
        public csv_file: string,
        public template: string,
        public research_id: string,
    ) {}
}