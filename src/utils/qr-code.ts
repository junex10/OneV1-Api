import * as QRCode from 'qrcode';
import { GenerateName } from '.';

class QrCode {
    
    generate = async (data: string, options: {} = {}) => {
            const QrOptions = {
                ...options,
                width: 400,
                height: 400,
                light: '#000'
            };
            const generatedName = GenerateName('jpg');
            const path = `qr-code/${ generatedName }`;
    
            const filename = `./public/storage/qr-code/${ generatedName }`;
    
            await QRCode.toFile(
                filename,
                data,
                QrOptions
            );
            
            return {
                path,
                filename: generatedName
            };
    }

    generateBase64 = async (data: string) => await QRCode.toDataURL(data);
}
export default new QrCode()