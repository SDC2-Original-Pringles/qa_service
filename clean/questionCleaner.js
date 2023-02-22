const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const csv = require('csv-parser');
const fs = require('fs');

const {
  QUESTIONS_PATH,
} = process.env;

const readStream = fs.createReadStream(QUESTIONS_PATH);
const writeStream = fs.createWriteStream(path.join(QUESTIONS_PATH, '../clean/photos.csv'));

writeStream.write('id,product_id,body,date_written,asker_name,asker_email,reported,helpful\n');
readStream
  .pipe(csv({ quote: '\'' }))
  .on('data', async (chunk) => {
    const copy = { ...chunk };
    copy.id = copy.id.replaceAll(/\D/g, '');
    copy.product_id = copy.product_id.replaceAll(/\D/g, '');
    copy.date_written = new Date(copy.date_written).toLocaleString();
    writeStream.write(
      `${copy.id},${copy.product_id},${copy.body},${copy.date_written},${copy.asker_name},${copy.asker_email},${copy.reported},${copy.helpful}\n`,
    );
  });
