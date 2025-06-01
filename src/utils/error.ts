import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import * as fs from 'fs';

@Catch(HttpException)
class HttpExceptionFilter implements ExceptionFilter {
    private readonly logger: Logger
    constructor(

    ) {
        this.logger = new Logger
    }
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
        const message = exception instanceof HttpException ? exception?.message : 'Internal server error'
        const error = exception?.getResponse().error ?? 'Unknow error';

        response
            .status(status)
            .json({
                status: status,
                timestamp: new Date().toISOString(),
                api: request.url,
                error: process.env.NODE_ENV === 'development' ? error : message
            });
        this.logger.error(`Request API: ${request.url}\n Error: ${error}`);
        this.errorLog(message, error, request.url);
    }
    private async errorLog(message: string, error: string, request: string) {
        const date = new Date();
        const dateString = this.dateString(date);
        const PATH = './public/storage/logs/ErrorLogs.txt';
        if (fs.existsSync(PATH)) {
            fs.writeFileSync(PATH, `\n[${dateString}] - ${message}\n[${dateString}] - ${error}\n[${dateString}] - ${request}`, {
                encoding: "utf-8",
                flag: 'a+'
            });
        } else {
            fs.createWriteStream(PATH, {
                encoding: 'utf-8',
                flags: 'a+'
            });
            fs.writeFileSync(PATH, `\n[${dateString}] - ${message}\n[${dateString}] - ${error}\n[${dateString}] - ${request}`, {
                encoding: "utf-8",
                flag: 'a+'
            });
        }
    }
    private dateString(date: Date): string {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    }
}
export default new HttpExceptionFilter();