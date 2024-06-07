import { Router, Request, Response } from "express";
import {body, param} from "express-validator";
import AnswersController from "../controllers/AnswersConstroller";
import AnswersRepository from "../repository/AnswersRepository";
import AnswersService from "../services/AnswersService";

const answersRepository = new AnswersRepository();
const answersService = new AnswersService(answersRepository);
const answersController = new AnswersController(answersService);

const router = Router();

const AnswerValidation = [
    body('phoneNumber').isString().notEmpty(),
    body('Time').notEmpty(),
    body('finished').isBoolean().notEmpty(),
    body('started').isBoolean().notEmpty(),
    body('answer').isString().notEmpty(),
    body('distribution_id').isString().notEmpty()
]



router.get('/', (req: Request, res: Response) => answersController.getAllAnswers(req, res));
router.get('/:id', param('id').isUUID().notEmpty() , (req: Request, res: Response) => answersController.getAnswerById(req, res));
router.post('/', AnswerValidation ,(req: Request, res: Response) => answersController.createAnswer(req, res));
router.put('/:id', AnswerValidation ,(req: Request, res: Response) => answersController.updateAnswer(req, res));
router.delete('/:id', param('id').isUUID().notEmpty() ,(req: Request, res: Response) => answersController.deleteAnswer(req, res));

export default router;
