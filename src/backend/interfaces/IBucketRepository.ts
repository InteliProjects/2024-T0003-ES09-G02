export default interface IBucketRepository{
    uploadFile(id: string, file: Express.Multer.File) : Promise<string | null>;
}