import * as moment from 'moment';
import Hash from './hash';

class Globals {
  formatMiles = (n: any, decimals: boolean = true, currency: string = '$') => {
    n = Math.round(n * 100) / 100;
    var c: any = isNaN((c = Math.abs(c))) ? 2 : c,
      d: any = d == undefined ? ',' : d,
      t: any = t == undefined ? '.' : t,
      s: any = n < 0 ? '-' : '',
      i: any = String(parseInt((n = Math.abs(Number(n) || 0).toFixed(c)))),
      j: any = (j = i.length) > 3 ? j % 3 : 0;

    return (
      currency +
      ' ' +
      s +
      (j ? i.substr(0, j) + t : '') +
      i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) +
      (c
        ? d +
          Math.abs(n - i)
            .toFixed(c)
            .slice(2)
        : '')
    );
  };
  filterByUrl = (url: string) => {
    const SYMBOLS =
      /(\$)|(\.)|(\?)|(\#)|(\%)|(\&)|(\/)|(\*)|(\{)|(\})|(\\)|(\:)|(\<)|(\>)|(\+)/g;
    return url.replace(SYMBOLS, '');
  };
  calculateAge = (birthdate: Date | string) =>
    Math.floor((moment().unix() - moment(birthdate).unix()) / 31556926);

  randomInt = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min)) + min;

  codeGenerater = () => Math.floor(100000 + Math.random() * 900000);

  hashPic = (fileName: string, mimeType: string) => {
    let format = '';
    switch (mimeType) {
      case 'image/jpeg':
        format = 'jpg';
        break;

      case 'image/png':
        format = 'png';
        break;

      case 'image/png':
        format = 'png';
        break;

      case 'video/mp4':
        format = 'mp4';
        break;

      case 'video/x-msvideo':
        format = 'avi';
        break;

      case 'video/x-ms-wmv':
        format = 'wmv';
        break;

      case 'video/quicktime':
        format = 'mov';
        break;

      case 'video/3gpp':
        format = '3gp';
        break;

      case 'video/x-flv':
        format = 'flv';
        break;

      case 'image/gif':
        format = 'gif';
        break;

      case 'application/pdf':
        format = 'pdf';
        break;

      default:
        format = 'jpg';
        break;
    }
    return `${Hash.makeSync(fileName + moment().format('YYYYMMDDHHmmss'))
      .replace(/\//g, '')
      .replace(/\./g, '')
      .replace(/,/g, '')}.${format}`;
  };
}
export default new Globals();
