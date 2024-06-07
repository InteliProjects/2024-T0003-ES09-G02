import DistribuitionDTO from '../dtos/DistribuitionDTO'
import InputDistribuitionDTO from '../inputDtos/InputDistributionDTO';
import fs from 'fs';

export default interface IDistribuitionService {
    getAllDistribuitions(): Promise<DistribuitionDTO[]>;
    getDistribuitionById(id: string): Promise<DistribuitionDTO | null>;
    getDistributionByResearchId(researchId: string): Promise<DistribuitionDTO[] | null>;
    createDistribuition(distribuition: InputDistribuitionDTO): Promise<DistribuitionDTO>;
    updateDistribuition(id: string, distribuition: DistribuitionDTO): Promise<DistribuitionDTO | null>;
    deleteDistribuition(id: string): Promise<string | null>;
    uploadFile(id: string, file: Express.Multer.File): Promise<string | null>;
    downloadFile(id: string): Promise<fs.ReadStream>;
    findByIdWhereIsValid(id: string): Promise<DistribuitionDTO | null>;
}