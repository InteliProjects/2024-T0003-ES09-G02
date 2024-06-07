import { Request, Response } from "express";
import IResearchService from "../interfaces/IResarchService";
import ResearchDTO from "../dtos/ResarchDTO";
import InputResearchDTO from "../inputDtos/InputReserachDTO";
import { validateRequest } from "../validation/ValidateRequest";
import redisClient from '../redis/redisClient';

export default class ResearchController {
    constructor(private researchService: IResearchService) {}

    async getAllResearches(req: Request, res: Response): Promise<Response> {
        const cacheKey = 'allResearches';
        const cachedResearches = await redisClient.get(cacheKey);
        if (cachedResearches) {
            return res.json(JSON.parse(cachedResearches));
        } else {
            const researches = await this.researchService.getAllResearches();
            await redisClient.setEx(cacheKey, 600, JSON.stringify(researches));
            return res.json(researches);
        }
    }

    async getResearchById(req: Request, res: Response): Promise<Response> {
        const erros = validateRequest(req, res);
        if (erros) return erros;
        const id = req.params.id;
        const cacheKey = 'Researche';
        const cachedResearches = await redisClient.get(cacheKey);
        if(cachedResearches){
            return res.json(JSON.parse(cachedResearches));
        }else{
        const research = await this.researchService.getResearchById(id);
        
        if (!research) {
            return res.status(404).json({ message: "Research not found" });
        }
        await redisClient.set(cacheKey, JSON.stringify(research), {
            EX: 3600,
        });
        return res.json(research);
        }
    }

    async createResearch(req: Request, res: Response): Promise<Response> {
        const erros = validateRequest(req, res);
        if (erros) return erros;
        const researchDto = new InputResearchDTO(req.body.name, req.body.identifier);
        const newResearch = await this.researchService.createResearch(researchDto);
        res.header("Location", `/researches/${newResearch.id}`);
        const cacheKey = 'allResearches';
        const cachedResearches = await redisClient.get(cacheKey);
        if (cachedResearches) {
            await redisClient.setEx(cacheKey, 600, JSON.stringify([...JSON.parse(cachedResearches), newResearch]));
        }
        return res.status(201).json(newResearch)
    }

    async updateResearch(req: Request, res: Response): Promise<Response> {
        const erros = validateRequest(req, res);
        if (erros) return erros;
        const id = req.params.id;
        const researchDto = new ResearchDTO(req.body.id, req.body.name, req.body.creationDate, req.body.identifier, req.body.numberDistributions, req.body.distributionDate, req.body.distribution_list);
        const updatedResearch = await this.researchService.updateResearch(id, researchDto);

        if (!updatedResearch) {
            return res.status(404).json({ message: "Research not found" });
        }
        return res.json(updatedResearch);
    }

    async deleteResearch(req: Request, res: Response): Promise<Response> {
        const erros = validateRequest(req, res);
        if (erros) return erros;
        const id = req.params.id
        const deleteResearch = await this.researchService.deleteResearch(id);

        if (!deleteResearch) {
            return res.status(404).json({ message: "Research not found" });
        }
        return res.status(204).send();
    }
}
