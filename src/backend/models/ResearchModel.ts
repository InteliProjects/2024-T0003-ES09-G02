import DistribuitionModel from './DistribuitionModel';

export default class ResearchModel {
    constructor(
        public id: string,
        public name: string,
        public creationDate: Date,
        public identifier: string,
        public numberDistributions: number,
        public distributionDate: Date | null,
        public distribution_list: DistribuitionModel[]
    ) {}
}