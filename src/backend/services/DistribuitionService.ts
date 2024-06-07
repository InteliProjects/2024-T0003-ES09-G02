import IDistribuitionService from "../interfaces/IDistribuitionService";
import IDistribuitionRepository from "../interfaces/IDistribuitionRepository";
import IBucketRepository from "../interfaces/IBucketRepository";
import IListRepository from "../interfaces/IListRepository";
import DistribuitionDTO from "../dtos/DistribuitionDTO";
import DistribuitionModel from "../models/DistribuitionModel";
import InputDistribuitionModel from "../inputModels/InputDistributionModel";
import InputDistribuitionDTO from "../inputDtos/InputDistributionDTO";
import InputUpdateDistribuitionModel from "../inputModels/inputUpdateDistributionModel";
import {ValidateCsvFile} from "../validation/ValidateCsvFile"
import fs from "fs";

export default class DistribuitionService implements IDistribuitionService {
  constructor(private distribuitionRepository: IDistribuitionRepository, private BucketRepository: IBucketRepository, private ListRepository: IListRepository) {}

  async getAllDistribuitions(): Promise<DistribuitionDTO[]> {
    const distribuitions = await this.distribuitionRepository.findAll();
    return distribuitions.map(distribuition => new DistribuitionDTO(distribuition.id, distribuition.name, distribuition.channel, distribuition.created_at, distribuition.answered, distribuition.anonymous_answer, distribuition.csv_file, distribuition.pendent, distribuition.canceled_subscription, distribuition.included, distribuition.valid, distribuition.sent, distribuition.template, distribuition.research_id, distribuition.sent_at, distribuition.updated_at, distribuition.DistributionList));
  }

  async getDistribuitionById(id: string): Promise<DistribuitionDTO | null> {
    const distribuition = await this.distribuitionRepository.findById(id);
    if (!distribuition) return null;
    return new DistribuitionDTO(distribuition.id, distribuition.name, distribuition.channel, distribuition.created_at, distribuition.answered, distribuition.anonymous_answer, distribuition.csv_file, distribuition.pendent, distribuition.canceled_subscription, distribuition.included, distribuition.valid, distribuition.sent, distribuition.template, distribuition.research_id, distribuition.sent_at, distribuition.updated_at, distribuition.DistributionList);
  }

  async getDistributionByResearchId(researchId: string): Promise<DistribuitionDTO[] | null> {
    const distribuitions = await this.distribuitionRepository.findByResearchId(researchId);
    if (!distribuitions) return null;
    return distribuitions.map(distribuition => new DistribuitionDTO(distribuition.id, distribuition.name, distribuition.channel, distribuition.created_at, distribuition.answered, distribuition.anonymous_answer, distribuition.csv_file, distribuition.pendent, distribuition.canceled_subscription, distribuition.included, distribuition.valid, distribuition.sent, distribuition.template, distribuition.research_id, distribuition.sent_at, distribuition.updated_at, distribuition.DistributionList));
  }

  async createDistribuition(distribuitionDto: InputDistribuitionDTO): Promise<DistribuitionDTO> {
    distribuitionDto.anonymous_answer = Boolean(distribuitionDto.anonymous_answer);
    const newDistribuition = new InputDistribuitionModel(distribuitionDto.name, distribuitionDto.channel, distribuitionDto.anonymous_answer, distribuitionDto.csv_file, distribuitionDto.template, distribuitionDto.research_id);
    const distribuition = await this.distribuitionRepository.create(newDistribuition);
    return distribuition;
  }

  async updateDistribuition(id: string, distribuitionDto: DistribuitionDTO): Promise<DistribuitionDTO | null> {
    const distribuitionToUpdate = new InputUpdateDistribuitionModel(distribuitionDto.id, distribuitionDto.name, distribuitionDto.channel, distribuitionDto.created_at, distribuitionDto.answered, distribuitionDto.anonymous_answer, distribuitionDto.csv_file, distribuitionDto.pendent, distribuitionDto.canceled_subscription, distribuitionDto.included, distribuitionDto.valid, distribuitionDto.sent, distribuitionDto.template, distribuitionDto.research_id, distribuitionDto.sent_at, distribuitionDto.updated_at);
    const updatedDistribuition = await this.distribuitionRepository.update(id, distribuitionToUpdate);
    if (!updatedDistribuition) return null;
    return new DistribuitionDTO(updatedDistribuition.id, updatedDistribuition.name, updatedDistribuition.channel, updatedDistribuition.created_at, updatedDistribuition.answered, updatedDistribuition.anonymous_answer, updatedDistribuition.csv_file, updatedDistribuition.pendent, updatedDistribuition.canceled_subscription, updatedDistribuition.included, updatedDistribuition.valid, updatedDistribuition.sent, updatedDistribuition.template, updatedDistribuition.research_id, updatedDistribuition.sent_at, updatedDistribuition.updated_at, updatedDistribuition.DistributionList);
  }

  async deleteDistribuition(id: string): Promise<string | null> {
    return await this.distribuitionRepository.delete(id);
  }

  async uploadFile(id: string, file: Express.Multer.File): Promise<string | null> {
    await ValidateCsvFile(file, id);
    await this.ListRepository.createList(file,id);
    const uploadFile =  await this.BucketRepository.uploadFile(id,file);
    if(uploadFile != null){
      fs.unlinkSync(file.path);
    }
    return "Arquivo enviado";
  }
    
  async downloadFile(id: string): Promise<fs.ReadStream> {
    return await this.distribuitionRepository.downloadFile(id);
  }

  async findByIdWhereIsValid(id: string): Promise<DistribuitionDTO | null> {
    const distribuition = await this.distribuitionRepository.findByIdWhereIsValid(id);
    if (!distribuition) return null;
    return new DistribuitionDTO(distribuition.id, distribuition.name, distribuition.channel, distribuition.created_at, distribuition.answered, distribuition.anonymous_answer, distribuition.csv_file, distribuition.pendent, distribuition.canceled_subscription, distribuition.included, distribuition.valid, distribuition.sent, distribuition.template, distribuition.research_id, distribuition.sent_at, distribuition.updated_at, distribuition.DistributionList);
  }

}
