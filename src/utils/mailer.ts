import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as path from 'path';
import * as moment from 'moment';

const MAIL_CONFIG = {
   transport: {
     host: process.env.MAIL_HOST,
     secure: false,
     auth: {
       user: process.env.MAIL_USERNAME,
       pass: process.env.MAIL_PASSWORD,
     },
   },
   defaults: {
     from: '"' + process.env.MAIL_FROM_NAME + '" <' + process.env.MAIL_FROM + '>',
   },
   template: {
     dir: path.join(__dirname,'../resources/templates'),
     adapter: new HandlebarsAdapter({
       BASE_URL: () => process.env.BASE_URL,
       WEB_URL: () => process.env.WEB_URL,
       formatDate: (date) => {
         return moment(date).format('DD/MM/YYYY');
       },
       formatMiles: (n, decimals = true, currency = '€', conversion = 1) => {
          n = Math.round(n * 100) / 100;

          var c = isNaN(c = Math.abs(c)) ? 2 : c,
            d = d == undefined ? "," : d,
            t = t == undefined ? "." : t,
            s = n < 0 ? "-" : "",
            i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
            j = (j = i.length) > 3 ? j % 3 : 0;

          // @ts-ignore
          const amount = ' ' + s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
          return amount + ' ' + currency;
        },
        multiply: (a,b) => {
          return a * b;
        },
        divide: (a,b) => {
          return a / b;
        },
        toFixed: (a) => {
          return a.toFixed(2);
        }
     }),
     options: {
       strict: true,
     }
   }
}

export {
   MAIL_CONFIG
}