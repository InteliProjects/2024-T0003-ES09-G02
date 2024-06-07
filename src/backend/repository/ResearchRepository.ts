import IResearchRepository from "../interfaces/IResarchRepository";
import ResearchModel from "../models/ResearchModel";
import InputResearchModel from "../inputModels/InputResearchModel";
import {prisma} from "../app"


export default class ResearchRepository implements IResearchRepository {

    async findAll(): Promise<ResearchModel[]> {
        const researches = await prisma.research.findMany({
            include: {
                distribution_list: {
                    include: {
                        DistributionList: true
                    } 
                }
            }
        });
        const researchesModel = researches.map(research => new ResearchModel(research.id, research.name, research.creationDate, research.identifier, research.numberDistributions, research.distributionDate, research.distribution_list));
        return researchesModel;
    }

    async findById(id: string): Promise<ResearchModel | null> {
        const research = await prisma.research.findUnique({
            where: {
                id: id
            },
            include: {
                distribution_list: {
                    include: {
                        DistributionList: true
                    } 
                }
            }
        });
        if(!research) return null;
        const researchModel = new ResearchModel(research.id, research.name, research.creationDate, research.identifier, research.numberDistributions, research.distributionDate, research.distribution_list);
        return researchModel;
    }

    async create(research: InputResearchModel): Promise<ResearchModel> {
        const researchCreated = await prisma.research.create({
            data: {
                name: research.name,
                identifier: research.identifier,
            },
            include: {
                distribution_list: {
                    include: {
                        DistributionList: true
                    } 
                }
            }

        });
        return researchCreated;
    }
    

    async update(id: string, researchUpdate: ResearchModel): Promise<ResearchModel | null> {
        const researchUpdated = await prisma.research.update({
            where: {
                id: id
            },
            data: {
                name: researchUpdate.name,
                identifier: researchUpdate.identifier,
                numberDistributions: researchUpdate.numberDistributions,
                distributionDate: researchUpdate.distributionDate,
            },
            include: {
                distribution_list: {
                    include: {
                        DistributionList: true
                    } 
                }
            }
        });
        if(!researchUpdated) return null;
        return researchUpdated;
    }
    
    async delete(id: string): Promise<string | null> {
        const researchDeleted = await prisma.research.delete({
            where: {
                id: id
            }
        });
        if(!researchDeleted) return null;
        return "Research deleted successfully"
    }
}
