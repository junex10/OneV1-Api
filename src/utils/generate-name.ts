import Hash from './hash';
import * as moment from 'moment';

const generateName = (format) => {
	return `${ Hash.makeSync(Math.floor(Math.random() * 100000) + moment().format('YYYYMMDDHHmmss'))
	          	.replace(/\//g,'')
				.replace(/\./g,'')
				.replace(/,/g,'') }.${ format }`;
}

export default generateName;