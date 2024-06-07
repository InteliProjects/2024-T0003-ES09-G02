import IAnswersRepository from "../interfaces/IAnswersRepository";
import AnswersModel from "../models/AnswersModel";
import {prisma} from "../app"


export default class AnswersRepository implements IAnswersRepository {

    async findAll(): Promise<AnswersModel[]> {
        const answers = await prisma.answers.findMany();
        return answers
    }

    async findById(id: string): Promise<AnswersModel | null> {
        const answer = await prisma.answers.findUnique({
            where: {
                id: id
            },
        });
        if(!answer) return null;
        return answer;
    }

    async create(research: AnswersModel): Promise<AnswersModel> {
        const answerCreated = await prisma.answers.create({
            data: {
                phoneNumber: research.phoneNumber,
                Time: research.Time,
                finished: research.finished,
                started: research.started,
                answer: research.answer,
                distribution_id: research.distribution_id,
            },
        });
        return answerCreated;
    }
    

    async update(id: string, researchUpdate: AnswersModel): Promise<AnswersModel | null> {
        const answerUpdated = await prisma.answers.update({
            where: {
                id: id
            },
            data: {
                phoneNumber: researchUpdate.phoneNumber,
                Time: researchUpdate.Time,
                finished: researchUpdate.finished,
                started: researchUpdate.started,
                answer: researchUpdate.answer,
                distribution_id: researchUpdate.distribution_id,
            },

        });
        if(!answerUpdated) return null;
        return answerUpdated;
    }
    
    async delete(id: string): Promise<string | null> {
        const answerDeleted = await prisma.answers.delete({
            where: {
                id: id
            }
        });
        if(!answerDeleted) return null;
        return "answer deleted successfully"
    }
}
