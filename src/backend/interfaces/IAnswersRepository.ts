import AnswersModel from "../models/AnswersModel";

export default interface IAnswersRepository {
    findAll(): Promise<AnswersModel[]>;
    findById(id: string): Promise<AnswersModel | null>;
    create(research: AnswersModel): Promise<AnswersModel>;
    update(id: string, research: AnswersModel): Promise<AnswersModel | null>;
    delete(id: string): Promise<string | null>;
}
