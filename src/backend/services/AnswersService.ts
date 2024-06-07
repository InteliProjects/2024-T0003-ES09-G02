import IAnswersService from "../interfaces/IAnswersService";
import IAnswersRepository from "../interfaces/IAnswersRepository";
import AnswersDTO from "../dtos/AnswersDTO";
import AnswersModel from "../models/AnswersModel";


export default class AnswersService implements IAnswersService {
  constructor(private AnswerRepository: IAnswersRepository) { }

  async getAllAnswers(): Promise<AnswersDTO[]> {
    const Answers = await this.AnswerRepository.findAll();
    return Answers
  }

  async getAnswerById(id: string): Promise<AnswersDTO | null> {
    const Answers = await this.AnswerRepository.findById(id);
    if (!Answers) return null;
    return Answers;
  } 

  async createAnswer(answersDTO: AnswersDTO): Promise<AnswersDTO> {
    const newAnswer = new AnswersModel(answersDTO.id, answersDTO.phoneNumber, answersDTO.Time, answersDTO.finished, answersDTO.started, answersDTO.answer, answersDTO.distribution_id);
    const Answer = await this.AnswerRepository.create(newAnswer);
    return Answer;
  }

  async updateAnswer(id: string, answersDTO: AnswersDTO): Promise<AnswersDTO | null> {
    const answerToUpdate = new AnswersModel(answersDTO.id, answersDTO.phoneNumber, answersDTO.Time, answersDTO.finished, answersDTO.started, answersDTO.answer, answersDTO.distribution_id);
    const updatedAnswer = await this.AnswerRepository.update(id, answerToUpdate);
    const existingAnswer  = await this.AnswerRepository.findById(id);
    if (!existingAnswer) {
      throw new Error("Resposta não encontrada.");
    }
    if (!updatedAnswer) return null;
    return updatedAnswer;
  }

  async deleteAnswer(id: string): Promise<string | null> {
    const existingAnswer = await this.AnswerRepository.findById(id);
    if (!existingAnswer) {
      throw new Error("Pesquisa não encontrada.");
    }
    const deleteResearch = await this.AnswerRepository.delete(id);
    return deleteResearch;
  }

}
