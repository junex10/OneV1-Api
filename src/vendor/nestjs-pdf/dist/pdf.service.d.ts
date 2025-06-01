/// <reference types="node" />
import { Readable } from 'stream';
import { Observable, SchedulerLike } from 'rxjs';
import { FileInfo } from 'html-pdf';
import { PDFOptions, PDFModuleOptions, PDF as PDFInterface } from './pdf.interfaces';
export declare class PDFService implements PDFInterface {
    private readonly moduleOptions;
    constructor(moduleOptions: PDFModuleOptions);
    toFile(template: string, filename?: string, options?: PDFOptions, scheduler?: SchedulerLike): Observable<FileInfo>;
    toStream(template: string, options?: PDFOptions, scheduler?: SchedulerLike): Observable<Readable>;
    toBuffer(template: string, options?: PDFOptions, scheduler?: SchedulerLike): Observable<Buffer>;
    private create;
    private makeHtmlRender;
    private getTemplatePath;
    private generateHtmlFromTemplate;
    private prepareHtmlTemplate;
}
