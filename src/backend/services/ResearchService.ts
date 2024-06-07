import IResearchService from "../interfaces/IResarchService";
import IResearchRepository from "../interfaces/IResarchRepository";
import ResearchDTO from "../dtos/ResarchDTO";
import ResearchModel from "../models/ResearchModel";
import InputResearchModel from '../inputModels/InputResearchModel'
import InputResearchDTO from "../inputDtos/InputReserachDTO";

export default class ResearchService implements IResearchService {
  constructor(private researchRepository: IResearchRepository) { }

  async getAllResearches(): Promise<ResearchDTO[]> {
    const researches = await this.researchRepository.findAll();
    return researches.map(research => new ResearchDTO(research.id, research.name, research.creationDate, research.identifier, research.numberDistributions, research.distributionDate, research.distribution_list));
  }

  async getResearchById(id: string): Promise<ResearchDTO | null> {
    const research = await this.researchRepository.findById(id);
    if (!research) return null;
    return new ResearchDTO(research.id, research.name, research.creationDate, research.identifier, research.numberDistributions, research.distributionDate, research.distribution_list);
  }

  async createResearch(researchDto: InputResearchDTO): Promise<ResearchDTO> {
    const newResearch = new InputResearchModel(researchDto.name, researchDto.identifier);
    const research = await this.researchRepository.create(newResearch);
    return research;
  }

  async updateResearch(id: string, researchDto: ResearchDTO): Promise<ResearchDTO | null> {
    const researchToUpdate = new ResearchModel(researchDto.id, researchDto.name, researchDto.creationDate, researchDto.identifier, researchDto.numberDistributions, researchDto.distributionDate, researchDto.distribution_list);
    const updatedResearch = await this.researchRepository.update(id, researchToUpdate);
    const existingResearch = await this.researchRepository.findById(id);
    if (!existingResearch) {
      throw new Error("Pesquisa não encontrada.");
    }
    if (!updatedResearch) return null;
    return new ResearchDTO(updatedResearch.id, updatedResearch.name, updatedResearch.creationDate, updatedResearch.identifier, updatedResearch.numberDistributions, updatedResearch.distributionDate, updatedResearch.distribution_list);
  }

  async deleteResearch(id: string): Promise<string | null> {
    const existingResearch = await this.researchRepository.findById(id);
    if (!existingResearch) {
      throw new Error("Pesquisa não encontrada.");
    }
    const deleteResearch = await this.researchRepository.delete(id);
    return deleteResearch;
  }

}
