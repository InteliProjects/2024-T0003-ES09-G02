import DistribuitionService from "../services/DistribuitionService";
import IDistribuitionRepository from "../interfaces/IDistribuitionRepository";
import DistribuitionDTO from "../dtos/DistribuitionDTO";
import DistribuitionModel from "../models/DistribuitionModel";

const mockDistribuitionRepository = {
  findAll: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  uploadFile: jest.fn(),
  downloadFile: jest.fn(),
};

const distribuitionService = new DistribuitionService(mockDistribuitionRepository);

describe('DistribuitionService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })

    describe('getAllDistribuitions', () => {
        it('should return an array of distribuition DTOs', async () => {
            const mockDistribuitions = [
                new DistribuitionModel('1', 'Distribuition 1', '001', new Date(), 12, false, '', 12, 4, 7, 8, 8, 'SMS', '', new Date(), new Date()),
                new DistribuitionModel('1', 'Distribuition 2', '001', new Date(), 12, false, '', 12, 4, 7, 8, 8, 'SMS', '', new Date(), new Date()),
            ];
            mockDistribuitionRepository.findAll.mockResolvedValue(mockDistribuitions);

            const distribuitions = await distribuitionService.getAllDistribuitions();

            expect(mockDistribuitionRepository.findAll).toHaveBeenCalled();
            expect(distribuitions).toHaveLength(mockDistribuitions.length);
            expect(distribuitions[0]).toBeInstanceOf(DistribuitionDTO);
        });
    });

    describe('getDistribuitionById', () => {
        it('should return a distribuition DTO when found', async () => {
            const mockDistribuition = new DistribuitionModel('1', 'Distribuition 1', '001', new Date(), 12, false, '', 12, 4, 7, 8, 8, 'SMS', '', new Date(), new Date());
            mockDistribuitionRepository.findById.mockResolvedValue(mockDistribuition);

            const distribuition = await distribuitionService.getDistribuitionById('1');

            expect(mockDistribuitionRepository.findById).toHaveBeenCalledWith('1');
            expect(distribuition).toBeInstanceOf(DistribuitionDTO);
            expect(distribuition?.id).toBe('1');
        });

        it('should return null when not found', async () => {
            mockDistribuitionRepository.findById.mockResolvedValue(null);

            const distribuition = await distribuitionService.getDistribuitionById('unknown');

            expect(mockDistribuitionRepository.findById).toHaveBeenCalledWith('unknown');
            expect(distribuition).toBeNull();
        });
    });

    describe('createDistribuition', () => {
        it('should create and return the created distribuition DTO', async () => {
            const mockDistribuition = new DistribuitionDTO('1', 'Distribuition 1', '001', new Date(), 12, false, '', 12, 4, 7, 8, 8, 'SMS', 'a', new Date(), new Date());

            mockDistribuitionRepository.create.mockResolvedValue(mockDistribuition);

            const createdDistribuition = await distribuitionService.createDistribuition(mockDistribuition)

            expect(mockDistribuitionRepository.create).toHaveBeenCalledWith(expect.any(DistribuitionModel));
            expect(createdDistribuition).toEqual(mockDistribuition);
        });
    });

    describe('updateDistribuition', () => {
        it('should update and return the updated distribuition DTO', async () => {
            const mockDistribuition = new DistribuitionModel('1', 'Distribuition 1', '001', new Date(), 12, false, '', 12, 4, 7, 8, 8, 'SMS', '', new Date(), new Date());

            mockDistribuitionRepository.update.mockResolvedValue(mockDistribuition);

            const updatedDistribuition = await distribuitionService.updateDistribuition('1', mockDistribuition)
            
            expect(mockDistribuitionRepository.update).toHaveBeenCalledWith('1', mockDistribuition);
            expect(updatedDistribuition).toEqual(mockDistribuition);
        });

        it('should return null when not found', async () => {
            mockDistribuitionRepository.update.mockResolvedValue(null);

            const updatedDistribuition = await distribuitionService.updateDistribuition('unknown', new DistribuitionModel('1', 'Distribuition 1', '001', new Date(), 12, false, '', 12, 4, 7, 8, 8, 'SMS', '', new Date(), new Date()))

            expect(mockDistribuitionRepository.update).toHaveBeenCalledWith('unknown', expect.any(DistribuitionModel));
            expect(updatedDistribuition).toBeNull();
        });
    });

    describe('deleteDistribuition', () => {
        it('should delete the distribuition', async () => {
            await distribuitionService.deleteDistribuition('1');

            expect(mockDistribuitionRepository.delete).toHaveBeenCalledWith('1');
        });
    });

})
