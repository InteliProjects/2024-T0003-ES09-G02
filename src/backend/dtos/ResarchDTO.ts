import DistribuitionDTO from './DistribuitionDTO';

export default class ResearchDTO {
    constructor(
        public id: string,
        public name: string,
        public creationDate: Date,
        public identifier: string,
        public numberDistributions: number,
        public distributionDate: Date | null,
        public distribution_list: DistribuitionDTO[]
    ) {}
}