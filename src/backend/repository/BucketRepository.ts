import { Client } from "minio"
import dotenv from 'dotenv';
import { prisma } from "../app";
import IBucketRepository from "../interfaces/IBucketRepository";

dotenv.config();

export default class BucketRepository implements IBucketRepository {

    async uploadFile(id: string, file: Express.Multer.File): Promise<string | null> {
        const minioClient = new Client({
            endPoint: 'localhost',
            port: 9000,
            useSSL: false,
            accessKey: process.env.MINIO_ACCESS_KEY ?? '',
            secretKey: process.env.MINIO_SECRET_KEY ?? ''
        });

        return new Promise((resolve, reject) => {
            minioClient.fPutObject('files', id+'.csv', file.path, async (err: Error, etag: string) => {
                if (err) {
                    resolve(null);
                } else {
                await prisma.distribution.update({
                    where: {
                        id: id
                    },
                    data: {
                        csv_file: id+'.csv'
                    }
                });
                    resolve('Arquivo enviado');
                }
            });
        });
    }

}