export default interface IListRepository {
    createList(file: Express.Multer.File, id: string): Promise<void>;
}