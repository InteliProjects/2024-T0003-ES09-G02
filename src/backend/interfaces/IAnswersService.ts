import AnswersDTO from "../dtos/AnswersDTO";

export default interface IResearchService {
    getAllAnswers(): Promise<AnswersDTO[]>;
    getAnswerById(id: string): Promise<AnswersDTO | null>;
    createAnswer(research: AnswersDTO): Promise<AnswersDTO>;
    updateAnswer(id: string, research: AnswersDTO): Promise<AnswersDTO | null>;
    deleteAnswer(id: string): Promise<string | null>;
}
