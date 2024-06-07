import ResearchModel from "../models/ResearchModel";
import InputResearchModel from '../inputModels/InputResearchModel'

export default interface IResearchRepository {
    findAll(): Promise<ResearchModel[]>;
    findById(id: string): Promise<ResearchModel | null>;
    create(research: InputResearchModel): Promise<ResearchModel>;
    update(id: string, research: ResearchModel): Promise<ResearchModel | null>;
    delete(id: string): Promise<string | null>;
}
