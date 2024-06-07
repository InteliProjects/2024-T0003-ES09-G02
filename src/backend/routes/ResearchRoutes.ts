import { Router, Request, Response } from "express";
import {body, param} from "express-validator";
import ResearchController from "../controllers/ResearchController";
import ResearchRepository from "../repository/ResearchRepository";
import ResearchService from "../services/ResearchService";

const researchRepository = new ResearchRepository();
const researchService = new ResearchService(researchRepository);
const researchController = new ResearchController(researchService);

const router = Router();

const createResearchValidation = [
    body('name').isString().notEmpty(),
    body('identifier').isString().notEmpty()
]

const updateResearchValidation = [
    param('id').isUUID().notEmpty(),
    body('name').isString().optional(),
    body('creationDate').isDate().optional(),
    body('identifier').isString().optional(),
    body('numberDistributions').isInt().optional(),
    body('distributionDate').isDate().optional(),
    body('distribution_list').isArray().optional()
    
]

router.get('/', (req: Request, res: Response) => researchController.getAllResearches(req, res));
router.get('/:id', param('id').isUUID().notEmpty() , (req: Request, res: Response) => researchController.getResearchById(req, res));
router.post('/', createResearchValidation ,(req: Request, res: Response) => researchController.createResearch(req, res));
router.put('/:id', updateResearchValidation ,(req: Request, res: Response) => researchController.updateResearch(req, res));
router.delete('/:id', param('id').isUUID().notEmpty() ,(req: Request, res: Response) => researchController.deleteResearch(req, res));

export default router;
