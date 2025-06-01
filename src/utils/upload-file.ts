import { diskStorage } from  'multer';
import Hash from './hash';
import * as moment from 'moment';

const UploadFile = (folderName: string) => {
	return {
		storage: diskStorage({
          destination: `./public/storage/${ folderName }/`, 
          filename: (req, file, cb) => {
          	  let format = '';
          	  switch(file.mimetype) {
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
	          return cb(null, `${ Hash.makeSync(file.originalname + moment().format('YYYYMMDDHHmmss'))
	          	.replace(/\//g,'')
				.replace(/\./g,'')
				.replace(/,/g,'') }.${ format }`);
	      }
        })
	}
}

export {
	UploadFile
}