import { parse } from 'csv-parse';
import { promisify } from 'util';
import { readFile, writeFile } from 'fs/promises';
import { stringify } from 'csv-stringify';

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPhone = (phone: string): boolean => {
  if(phone.length < 10 || phone.length > 11) return false;
  const phoneRegex = /^(?:\d{2})(9?\d{9})$/;
  return phoneRegex.test(phone);
};

export async function ValidateCsvFile(file: Express.Multer.File, id: string): Promise<void> {
  const fileContent = await readFile(file.path, 'utf-8');

  const records: any[] = await new Promise((resolve, reject) => {
    parse(fileContent, {
      columns: true,
      skip_empty_lines: true
    }, (err, output) => {
      if (err) {
        reject(err);
      } else {
        resolve(output);
      }
    });
  });


  const validatedRecords = records.map(record => {
    const validEmail = isValidEmail(record.email);
    const validPhone = isValidPhone(record.phoneNumber);
    record.isValid = (record.name && record.age && validEmail && validPhone).toString();
    record.isValid = true;
    record.distribution_id = id;
    console.log(record.isValid);
    return record;
  });

  const output = stringify(validatedRecords, {
    header: true
  });

  await writeFile(file.path, output);
}
