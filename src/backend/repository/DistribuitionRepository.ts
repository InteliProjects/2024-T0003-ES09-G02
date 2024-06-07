import IDistribuitionRepository from "../interfaces/IDistribuitionRepository";
import DistribuitionModel from "../models/DistribuitionModel";
import InputDistribuitionModel from "../inputModels/InputDistributionModel";
import InputUpdateDistribuitionModel from "../inputModels/inputUpdateDistributionModel";
import { prisma } from "../app";
// import AWS from 'aws-sdk';
import dotenv from 'dotenv'; 
import fs from 'fs';
import path from 'path';


dotenv.config();

export default class DistribuitionRepository implements IDistribuitionRepository {


    async findAll(): Promise<DistribuitionModel[]> {
        const distribuitions = await prisma.distribution.findMany({
            include: {
                DistributionList: true
            }
        });
        return distribuitions;
    }

    async findById(id: string): Promise<DistribuitionModel | null> {
        const distribuition = await prisma.distribution.findUnique({
            where: {
                id: id
            },
            include: {
                DistributionList: true
            }
        });
        if(!distribuition) return null;
        return distribuition;
    }

    async findByResearchId(researchId: string): Promise<DistribuitionModel[] | null> {
        const distribuitions = await prisma.distribution.findMany({
            where: {
                research_id: researchId
            },
            include: {
                DistributionList: true
            }
        });
        if(!distribuitions) return null;
        return distribuitions;
    }

    async create(distribuition: InputDistribuitionModel): Promise<DistribuitionModel> {
        const distributionCreated = await prisma.distribution.create({
            data: {
                name: distribuition.name,
                channel: distribuition.channel,
                anonymous_answer: distribuition.anonymous_answer,
                csv_file: distribuition.csv_file,
                template: distribuition.template,
                research_id: distribuition.research_id,
            },
            include: {
                DistributionList: true
            }
        });
        return distributionCreated;
    }

    async update(id: string, distribuitionUpdate: InputUpdateDistribuitionModel): Promise<DistribuitionModel | null> {
        const distribuitionUpdated = await prisma.distribution.update({
            where: {
                id: id
            },
            data: {
                name: distribuitionUpdate.name,
                channel: distribuitionUpdate.channel,
                created_at: distribuitionUpdate.created_at,
                answered: distribuitionUpdate.answered,
                anonymous_answer: distribuitionUpdate.anonymous_answer,
                csv_file: distribuitionUpdate.csv_file,
                pendent: distribuitionUpdate.pendent,
                canceled_subscription: distribuitionUpdate.canceled_subscription,
                included: distribuitionUpdate.included,
                valid: distribuitionUpdate.valid,
                sent: distribuitionUpdate.sent,
                template: distribuitionUpdate.template,
                research_id: distribuitionUpdate.research_id,
                sent_at: distribuitionUpdate.sent_at,
                updated_at: new Date()
            },
            include: {
                DistributionList: true
            }
        });
        return distribuitionUpdated;
    }

    async delete(id: string): Promise<string | null> {
        const distribuitionDeleted = await prisma.distribution.delete({
            where: {
                id: id
            }
        });
        if(!distribuitionDeleted) return null;
        return "Research deleted successfully"

    }

    async uploadFile(id: string, file: Express.Multer.File): Promise<void> {
        const uploadPath = path.join(__dirname, '..', 'uploads');
        if(!fs.existsSync(uploadPath)){
            fs.mkdirSync(uploadPath);
        }
        const filePath = path.join(uploadPath, `${id}.csv`);
        try{
        fs.writeFileSync(filePath, file.buffer);
        await prisma.distribution.update({
            where: {
                id: id
            },
            data: {
                csv_file: filePath, 
            }
        });
        console.log('Arquivo salvo com sucesso');
        }
        catch (error) {
            console.error('Erro ao fazer upload do arquivo', error);
            throw new Error('Erro ao fazer upload do arquivo');
        }
    }

    async downloadFile(id: string): Promise<fs.ReadStream> {
        const distribuition = await prisma.distribution.findUnique({
            where: {
                id: id
            }
        });
        if(!distribuition) throw new Error("Distribuition not found");

        const filePath = distribuition.csv_file;
        const fileStream = fs.createReadStream(filePath, 'utf-8');
        
        return fileStream;
    }

    async findByIdWhereIsValid(id: string): Promise<DistribuitionModel | null> {
        const distribution = await prisma.distribution.findUnique({
            where: { id },
        });
    
        if (!distribution) return null;
    
        const validDistributionLists = await prisma.distributionList.findMany({
            where: {
                distribution_id: id,
                isValid: true,
            },
        });

        const result = {
            ...distribution,
            DistributionList: validDistributionLists,
        };
    
        return result;
    }
}
