import { Request, Response } from "express";
import IDistribuitionService from "../interfaces/IDistribuitionService";
import DistribuitionDTO from "../dtos/DistribuitionDTO";
import InputDistribuitionDTO from "../inputDtos/InputDistributionDTO";
import { validateRequest } from "../validation/ValidateRequest";
import { sendSMS } from '../utils/sendSms';
import multer from 'multer';
import redisClient from '../redis/redisClient';

export default class DistribuitionController {
    constructor(private distribuitionService: IDistribuitionService) {}

    async getAllDistribuitions(req: Request, res: Response) {
        const cacheKey = 'allDistribuitions';
        const cachedDistribuitions = await redisClient.get(cacheKey);
        if (cachedDistribuitions) {
            return res.json(JSON.parse(cachedDistribuitions));
        } else {
            const distribuitions = await this.distribuitionService.getAllDistribuitions();
            await redisClient.setEx(cacheKey, 600, JSON.stringify(distribuitions));
            return res.json(distribuitions);
        }
    }

    async getDistribuitionById(req: Request, res: Response): Promise<Response> {
        const erros = validateRequest(req, res);
        if (erros) return erros;
    
        const id = req.params.id;
        const cacheKey = `distribuition:${id}`;
        const cachedDistribuition = await redisClient.get(cacheKey);
        if (cachedDistribuition) {
            return res.json(JSON.parse(cachedDistribuition));
        } else {
            const distribuition = await this.distribuitionService.getDistribuitionById(id);
            if (!distribuition) {
                return res.status(404).json({ message: "Research not found" });
            }
            await redisClient.set(cacheKey, JSON.stringify(distribuition), {
                EX: 3600,
            });
            return res.json(distribuition);
        }
    }

    async getDistributionByResearchId(req: Request, res: Response): Promise<Response> {
        const errors = validateRequest(req, res);
        if (errors) return errors;

        const researchId = req.params.researchId;
        const cacheKey = `distribuitionId:${researchId}`;
        const cachedDistribuition = await redisClient.get(cacheKey);
        if (cachedDistribuition) {
            return res.json(JSON.parse(cachedDistribuition));
        }else{

        const distribuitions = await this.distribuitionService.getDistributionByResearchId(researchId);
        if(!distribuitions) {
            return res.status(404).json({ message: "Research not found" });
        }
        await redisClient.set(cacheKey, JSON.stringify(distribuitions), {
            EX: 3600,
        });
        return res.json(distribuitions);
        }
    }

    async createDistribuition(req: Request, res: Response): Promise<Response> {
        const errors = validateRequest(req, res);
        if (errors) return errors;

        const file = req.file;

        if (file && file.mimetype === 'text/csv'){
            const InputdistribuitionDTO = new InputDistribuitionDTO(req.body.name, req.body.channel, req.body.anonymous_answer, req.body.csv_file, req.body.template, req.body.research_id);
            const newDistribuition = await this.distribuitionService.createDistribuition(InputdistribuitionDTO);

            if(newDistribuition.id){
                const uploadFile = await this.distribuitionService.uploadFile(newDistribuition.id, file);

                if(!uploadFile) {
                    return res.status(404).json({ message: "Error to upload file" });
                }

                const validDistribution = await this.distribuitionService.findByIdWhereIsValid(newDistribuition.id);

                if(!validDistribution){
                    return res.status(404).json({ message: "Error to validate distribution" });
                }
                
                for (let i = 0; i < validDistribution.DistributionList.length; i++) {
                    sendSMS(`+${validDistribution.DistributionList[i].phoneNumber}`, validDistribution.DistributionList[i].name, validDistribution.template, validDistribution.id)
                        .then(() => console.log('SMS enviado com sucesso'))
                        .catch((err: any) => console.error('Erro ao enviar SMS:', err));
                    
                }
                
            }
            res.header('Location', `/distribuitions/${newDistribuition.id}`);
            const cacheKey = 'allDistribuitions';
            const cachedDistribuitions = await redisClient.get(cacheKey);
            if (cachedDistribuitions) {
                await redisClient.setEx(cacheKey, 600, JSON.stringify([...JSON.parse(cachedDistribuitions), newDistribuition]));
            }
            return res.status(201).json(newDistribuition);
        }
        return res.status(404).json({ message: "FIle type not csv" });
    }

    async updateDistribuition(req: Request, res: Response): Promise<Response> {
        const errors = validateRequest(req, res);
        if (errors) return errors;

        const id = req.params.id;
        const distribuitionDto = new DistribuitionDTO(req.body.id, req.body.name, req.body.channel, req.body.created_at, req.body.answered, req.body.anonymous_answer, req.body.csv_file,req.body.pendent, req.body.canceled_subscription, req.body.included, req.body.valid, req.body.sent, req.body.template, req.body.research_id, req.body.sent_at, req.body.updated_at, req.body.DistributionList);
        const updatedDistribuition = await this.distribuitionService.updateDistribuition(id, distribuitionDto);
        if (!updatedDistribuition) {
            return res.status(404).json({ message: "Distribuition not found" });
        }
        return res.json(updatedDistribuition);
    }

    async deleteDistribuition(req: Request, res: Response): Promise<Response> {
        const errors = validateRequest(req, res);
        if (errors) return errors;
        const id = req.params.id;
        const deleteDistribuition =  await this.distribuitionService.deleteDistribuition(id);
        if(!deleteDistribuition) {
            return res.status(404).json({ message: "Distribuition not found" });
        }
        return res.status(204).send();
    }

    async uploadFile(req: Request, res: Response): Promise<Response> {
        const errors = validateRequest(req, res);
        if(errors) return errors;
        const id = req.params.id;
        const file = req.file;
        if (file && file.mimetype === 'text/csv'){
            const uploadFile = await this.distribuitionService.uploadFile(id, file);
            return res.json({ message: uploadFile })
        }
        return res.status(404).json({ message: "FIle type not csv" });
    }

    async downloadFile(req: Request, res: Response): Promise<Response> {
        const errors = validateRequest(req, res);
        if(errors) return errors;
        const id = req.params.id;
        const file = await this.distribuitionService.downloadFile(id);
        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', 'attachment; filename=' + id);
        return file.pipe(res);
    }

    async findByIdWhereIsValid(req: Request, res: Response): Promise<Response> {
        const errors = validateRequest(req, res);
        if (errors) return errors;
        const id = req.params.id;
        const cacheKey = `distribuitionIdValid:${id}`;
        const cachedDistribuition = await redisClient.get(cacheKey);
        if (cachedDistribuition) {
            return res.json(JSON.parse(cachedDistribuition));
        } else {
        const distribuition = await this.distribuitionService.findByIdWhereIsValid(id);
        if (!distribuition) {
            return res.status(404).json({ message: "Research not found" });
        }
        await redisClient.set(cacheKey, JSON.stringify(distribuition), {
            EX: 3600,
        });
        return res.json(distribuition);
        }
    }

}
