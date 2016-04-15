import fs from 'fs';
import stringify from 'csv-stringify';

const csvExport = (fileName, result) => {
	if (fileName) {
		stringify([result], { delimiter: ';' }, (err, output) => {
			fs.appendFile(`${fileName}`, output, () => {});
		});
	}
};

export default csvExport;
