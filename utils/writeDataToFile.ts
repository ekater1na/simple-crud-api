import fs from 'fs';

export const writeDataToFile = async (filename, content) => {
  fs.writeFileSync(filename, JSON.stringify(content), 'utf-8')
};
