const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const csv = require('csv-parser');
const fs = require('fs');

const {
  PRODUCTS_PATH,
} = process.env;

const readStream = fs.createReadStream(PRODUCTS_PATH);
const writeStream = fs.createWriteStream(path.join(PRODUCTS_PATH, '../clean/photos.csv'));

writeStream.write('id\n');
readStream
  .pipe(csv({ quote: '\'' }))
  .on('data', async (chunk) => {
    const copy = { ...chunk };
    copy.id = copy.id.replaceAll(/\D/g, '');
    writeStream.write(
      `${copy.id}\n`,
    );
  });
