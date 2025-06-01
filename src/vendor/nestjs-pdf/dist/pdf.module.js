"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PDFModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const pdf_service_1 = require("./pdf.service");
const pdf_constants_1 = require("./pdf.constants");
let PDFModule = PDFModule_1 = class PDFModule {
    static register(options) {
        return {
            global: options.isGlobal,
            module: PDFModule_1,
            providers: [
                {
                    provide: pdf_constants_1.PDF_OPTIONS_TOKEN,
                    useValue: options,
                },
            ],
        };
    }
    static registerAsync(options) {
        return {
            global: options.isGlobal,
            module: PDFModule_1,
            providers: [...this.createAsyncProviders(options)],
            imports: options.imports || [],
        };
    }
    static createAsyncProviders(options) {
        if (options.useFactory || options.useExisting) {
            return [this.createAsyncOptionsProvider(options)];
        }
        const useClass = options.useClass;
        return [
            this.createAsyncOptionsProvider(options),
            {
                provide: useClass,
                useClass,
            },
        ];
    }
    static createAsyncOptionsProvider(options) {
        if (options.useFactory) {
            return {
                provide: pdf_constants_1.PDF_OPTIONS_TOKEN,
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }
        const inject = [
            (options.useClass || options.useExisting),
        ];
        return {
            provide: pdf_constants_1.PDF_OPTIONS_TOKEN,
            useFactory: (factory) => factory.createPdfOptions(),
            inject,
        };
    }
};
PDFModule = PDFModule_1 = __decorate([
    common_1.Module({
        providers: [pdf_service_1.PDFService],
        exports: [pdf_service_1.PDFService],
    })
], PDFModule);
exports.PDFModule = PDFModule;
