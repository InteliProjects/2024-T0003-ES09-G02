import { Request, Response } from "express";
import IAnswersService from "../interfaces/IAnswersService";
import AnswersDTO from "../dtos/AnswersDTO";
import { validateRequest } from "../validation/ValidateRequest";

export default class AnswersController {
    constructor(private answersService: IAnswersService) {}

    async getAllAnswers(req: Request, res: Response): Promise<Response> {
        const answers = await this.answersService.getAllAnswers();
        return res.json(answers);
    }

    async getAnswerById(req: Request, res: Response): Promise<Response> {
        const erros = validateRequest(req, res);
        if (erros) return erros;
        const id = req.params.id;
        const answer = await this.answersService.getAnswerById(id);
        
        if (!answer) {
            return res.status(404).json({ message: "Answer not found" });
        }
        return res.json(answer);
    }

    async createAnswer(req: Request, res: Response): Promise<Response> {
        const erros = validateRequest(req, res);
        if (erros) return erros;
        const answerDto = new AnswersDTO(req.body.id, req.body.phoneNumber, req.body.Time, req.body.finished, req.body.started, req.body.answer, req.body.distribution_id);
        const newAnswer = await this.answersService.createAnswer(answerDto);
        res.header("Location", `/answers/${newAnswer.id}`);
        return res.status(201).json(newAnswer)
    }

    async updateAnswer(req: Request, res: Response): Promise<Response> {
        const erros = validateRequest(req, res);
        if (erros) return erros;
        const id = req.params.id;
        const answerDto = new AnswersDTO(req.body.id, req.body.phoneNumber, req.body.Time, req.body.finished, req.body.started, req.body.answer, req.body.distribution_id);
        const updatedAnswer = await this.answersService.updateAnswer(id, answerDto);

        if (!updatedAnswer) {
            return res.status(404).json({ message: "Answer not found" });
        }
        return res.json(updatedAnswer);
    }

    async deleteAnswer(req: Request, res: Response): Promise<Response> {
        const erros = validateRequest(req, res);
        if (erros) return erros;
        const id = req.params.id
        const deleteAnswer = await this.answersService.deleteAnswer(id);

        if (!deleteAnswer) {
            return res.status(404).json({ message: "Answer not found" });
        }
        return res.status(204).send();
    }
}
