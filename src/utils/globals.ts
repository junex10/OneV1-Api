import * as moment from 'moment';

class Globals {
    formatMiles = (n: any, decimals: boolean = true, currency: string = '$') => {
		n = Math.round(n * 100) / 100;
		var c: any = isNaN(c = Math.abs(c)) ? 2 : c,
			d: any = d == undefined ? "," : d,
			t: any = t == undefined ? "." : t,
			s: any = n < 0 ? "-" : "",
			i: any = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
			j: any = (j = i.length) > 3 ? j % 3 : 0;

		return currency + ' ' + s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
	}
	filterByUrl = (url: string) => {
		const SYMBOLS = /(\$)|(\.)|(\?)|(\#)|(\%)|(\&)|(\/)|(\*)|(\{)|(\})|(\\)|(\:)|(\<)|(\>)|(\+)/g;
		return url.replace(SYMBOLS, '');
	}
	calculateAge = (birthdate: Date | string) => Math.floor((moment().unix() - moment(birthdate).unix()) / 31556926)

	randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;
}
export default new Globals()