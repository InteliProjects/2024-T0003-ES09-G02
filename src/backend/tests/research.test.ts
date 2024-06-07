import ResearchService from '../services/ResearchService';
import IResearchRepository from '../interfaces/IDistribuitionRepository';
import ResearchDTO from '../dtos/ResarchDTO';
import ResearchModel from '../models/ResearchModel'; 

const mockResearchRepository = {
  findAll: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const researchService = new ResearchService(mockResearchRepository);

describe('ResearchService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllResearches', () => {
    it('should return an array of research DTOs', async () => {
      const mockResearches = [
        new ResearchModel('1', 'Research 1', new Date(), '001', 5, new Date(), []),
        new ResearchModel('2', 'Research 2', new Date(), '002', 3, new Date(), []),
      ];
      mockResearchRepository.findAll.mockResolvedValue(mockResearches);

      const researches = await researchService.getAllResearches();

      expect(mockResearchRepository.findAll).toHaveBeenCalled();
      expect(researches).toHaveLength(mockResearches.length);
      expect(researches[0]).toBeInstanceOf(ResearchDTO);
    });
  });

  describe('getResearchById', () => {
    it('should return a research DTO when found', async () => {
      const mockResearch = new ResearchModel('1', 'Research 1', new Date(), '001', 5, new Date(), []);
      mockResearchRepository.findById.mockResolvedValue(mockResearch);

      const research = await researchService.getResearchById('1');

      expect(mockResearchRepository.findById).toHaveBeenCalledWith('1');
      expect(research).toBeInstanceOf(ResearchDTO);
      expect(research?.id).toBe('1');
    });

    it('should return null when not found', async () => {
      mockResearchRepository.findById.mockResolvedValue(null);

      const research = await researchService.getResearchById('unknown');

      expect(mockResearchRepository.findById).toHaveBeenCalledWith('unknown');
      expect(research).toBeNull();
    });
  });

  describe('createResearch', () => {
    it('should create and return the created research DTO', async () => {
      const mockResearchDto = new ResearchDTO('1', 'Research New', new Date(), 'new001', 10, new Date(), []);
      mockResearchRepository.create.mockResolvedValue(mockResearchDto);

      const createdResearch = await researchService.createResearch(mockResearchDto);

      expect(mockResearchRepository.create).toHaveBeenCalledWith(expect.any(ResearchModel));
      expect(createdResearch).toEqual(mockResearchDto);
    });
  });

  describe('updateResearch', () => {
    it('should update and return the updated research DTO', async () => {
      const mockResearchDto = new ResearchDTO('1', 'Research Updated', new Date(), 'updated001', 20, new Date(), []);
      mockResearchRepository.update.mockResolvedValue(mockResearchDto);

      const updatedResearch = await researchService.updateResearch('1', mockResearchDto);

      expect(mockResearchRepository.update).toHaveBeenCalledWith('1', expect.any(ResearchModel));
      expect(updatedResearch).toEqual(mockResearchDto);
    });

    it('should return null if the research to update is not found', async () => {
      mockResearchRepository.update.mockResolvedValue(null);

      const updatedResearch = await researchService.updateResearch('unknown', new ResearchDTO('1', 'Research Updated', new Date(), 'updated001', 20, new Date(), []));

      expect(mockResearchRepository.update).toHaveBeenCalledWith('unknown', expect.any(ResearchModel));
      expect(updatedResearch).toBeNull();
    });
  });

  describe('deleteResearch', () => {
    it('should call delete on the repository with the correct id', async () => {
      await researchService.deleteResearch('1');

      expect(mockResearchRepository.delete).toHaveBeenCalledWith('1');
    });
  });
});
