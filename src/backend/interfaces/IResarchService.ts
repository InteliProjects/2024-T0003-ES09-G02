import ResearchDTO from "../dtos/ResarchDTO";
import InputResearchDTO from "../inputDtos/InputReserachDTO";

export default interface IResearchService {
    getAllResearches(): Promise<ResearchDTO[]>;
    getResearchById(id: string): Promise<ResearchDTO | null>;
    createResearch(research: InputResearchDTO): Promise<ResearchDTO>;
    updateResearch(id: string, research: ResearchDTO): Promise<ResearchDTO | null>;
    deleteResearch(id: string): Promise<string | null>;
}
