import DistribuitionModel from "../models/DistribuitionModel";
import InputDistributionModel from "../inputModels/InputDistributionModel";
import fs from "fs";
import InputUpdateDistribuitionModel from "../inputModels/inputUpdateDistributionModel";

export default interface IResearchRepository {
    findAll(): Promise<DistribuitionModel[]>;
    findById(id: string): Promise<DistribuitionModel | null>;
    findByResearchId(researchId: string): Promise<DistribuitionModel[] | null>;
    create(distribuition: InputDistributionModel): Promise<DistribuitionModel>;
    update(id: string, research: InputUpdateDistribuitionModel): Promise<DistribuitionModel | null>;
    delete(id: string): Promise<string | null>;
    uploadFile(id: string, file: Express.Multer.File): Promise<void>;
    downloadFile(id: string): Promise<fs.ReadStream>;
    findByIdWhereIsValid(id: string): Promise<DistribuitionModel | null>;
}
