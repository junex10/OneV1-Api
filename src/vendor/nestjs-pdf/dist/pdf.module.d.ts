import { Provider, DynamicModule } from '@nestjs/common';
import { PDFModuleRegisterOptions, PDFModuleRegisterAsyncOptions } from './pdf.interfaces';
export declare class PDFModule {
    static register(options: PDFModuleRegisterOptions): DynamicModule;
    static registerAsync(options: PDFModuleRegisterAsyncOptions): DynamicModule;
    static createAsyncProviders(options: PDFModuleRegisterAsyncOptions): Provider[];
    static createAsyncOptionsProvider(options: PDFModuleRegisterAsyncOptions): Provider;
}
