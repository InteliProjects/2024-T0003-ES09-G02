import IListRepository from "../interfaces/IListRepository";
import { prisma } from "../app";
import { parse } from 'csv-parse';
import fs from 'fs';

function stringToBoolean(str: string): boolean {
  switch(str.toLowerCase().trim()){
    case "true": case "yes": case "1": return true;
    case "false": case "no": case "0": case null: return false;
    default: return Boolean(str);
  }
}

export default class ListRepository implements IListRepository {
    async createList(file: Express.Multer.File, id: string): Promise<void> {
        const data: any = []
        fs.createReadStream(file.path)
        .pipe(
          parse({
            delimiter: ',',
            columns: true,
            ltrim: true,
          }),
        )
        .on('data', function (row) {
          console.log(row.isValid)
          row.age = parseInt(row.age, 10)
          row.isValid = stringToBoolean(row.isValid)
          data.push(row)
        })
        .on('end', async () => {
          try {
            await prisma.distributionList.createMany({
                data: data
            })
          } catch (error) {
            console.error('Error executing InsertBulkService:', error)
          }
        })
    }
}
