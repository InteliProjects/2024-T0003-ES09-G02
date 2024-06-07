import { Router, Request, Response } from "express";
import {body, param} from "express-validator";
import DistribuitionController from "../controllers/DistribuitionController";
import DistribuitionRepository from "../repository/DistribuitionRepository";
import DistribuitionService from "../services/DistribuitionService";
import multer from "multer";
import BucketRepository from "../repository/BucketRepository";
import ListRepository from "../repository/ListRepository";


const distribuitionRepository = new DistribuitionRepository();
const bucketRepository = new BucketRepository();
const listRepository = new ListRepository();
const distribuitionService = new DistribuitionService(distribuitionRepository, bucketRepository, listRepository);
const distribuitionController = new DistribuitionController(distribuitionService);

const router = Router();
const upload = multer({ dest: 'uploads/' });

const createDistribuitionValidation = [
    body('name').isString().notEmpty(),
    body('channel').isString().notEmpty(),
    body('anonymous_answer').isBoolean().notEmpty(),
    body('csv_file').isString().optional(),
    body('template').isString().optional(),
    body('research_id').isUUID().notEmpty(),
];

const updateDistribuitionValidation = [
    param('id').isUUID().notEmpty(),
    body('name').isString().optional(),
    body('channel').isString().optional(),
    body('created_at').isDate().optional(),
    body('answered').isBoolean().optional(),
    body('anonymous_answer').isBoolean().optional(),
    body('csv_file').isString().optional(),
    body('pendent').isBoolean().optional(),
    body('canceled_subscription').isBoolean().optional(),
    body('included').isBoolean().optional(),
    body('valid').isBoolean().optional(),
    body('sent').isBoolean().optional(),
    body('template').isString().optional(),
    body('research_id').isUUID().optional(),
    body('sent_at').isDate().optional(),
    body('updated_at').isDate().optional()
]

router.get('/', (req: Request, res: Response) => distribuitionController.getAllDistribuitions(req, res));
router.get('/:id', param('id').isUUID().notEmpty() ,(req: Request, res: Response) => distribuitionController.getDistribuitionById(req, res));
router.get('/research/:researchId', param('researchId').isUUID().notEmpty(), (req: Request, res: Response) => distribuitionController.getDistributionByResearchId(req, res));
router.post('/',  upload.single('file'),(req: Request, res: Response) => distribuitionController.createDistribuition(req, res));
router.put('/:id', updateDistribuitionValidation, (req: Request, res: Response) => distribuitionController.updateDistribuition(req, res));
router.delete('/:id', param('id').isUUID().notEmpty(), (req: Request, res: Response) => distribuitionController.deleteDistribuition(req, res));
router.post('/upload/:id', param('id').isUUID().notEmpty(), upload.single('file'), (req: Request, res: Response) => distribuitionController.uploadFile(req, res));
router.get('/download/:id', param('id').isUUID().notEmpty(), (req: Request, res: Response) => distribuitionController.downloadFile(req, res));
router.get('/valid/:id', param('id').isUUID().notEmpty(), (req: Request, res: Response) => distribuitionController.findByIdWhereIsValid(req, res));


export default router;
