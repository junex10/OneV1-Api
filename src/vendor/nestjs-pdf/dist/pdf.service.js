"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const rxjs_1 = require("rxjs");
const juice_1 = __importDefault(require("juice"));
const lodash_omit_1 = __importDefault(require("lodash.omit"));
const lodash_merge_1 = __importDefault(require("lodash.merge"));
const consolidate_1 = __importDefault(require("consolidate"));
const operators_1 = require("rxjs/operators");
const common_1 = require("@nestjs/common");
const html_pdf_1 = __importDefault(require("html-pdf"));
const pdf_constants_1 = require("./pdf.constants");
const pdf_default_1 = require("./pdf.default");
let PDFService = class PDFService {
    constructor(moduleOptions) {
        this.moduleOptions = moduleOptions;
    }
    toFile(template, filename, options, scheduler = rxjs_1.asapScheduler) {
        return this.makeHtmlRender(template, options).pipe(operators_1.mergeMap((html) => {
            const create = this.create(html, options);
            return rxjs_1.bindNodeCallback(create.toFile.bind(create), scheduler)(filename);
        }));
    }
    toStream(template, options, scheduler = rxjs_1.asapScheduler) {
        return this.makeHtmlRender(template, options).pipe(operators_1.mergeMap((html) => {
            const create = this.create(html, options);
            return rxjs_1.bindNodeCallback(create.toStream.bind(create), scheduler)();
        }));
    }
    toBuffer(template, options, scheduler = rxjs_1.asapScheduler) {
        return this.makeHtmlRender(template, options).pipe(operators_1.mergeMap((html) => {
            const create = this.create(html, options);
            return rxjs_1.bindNodeCallback(create.toBuffer.bind(create), scheduler)();
        }));
    }
    create(html, options) {
        return html_pdf_1.default.create(html, lodash_merge_1.default(pdf_default_1.defaultCreateOptions, lodash_omit_1.default(options, 'locals')));
    }
    makeHtmlRender(template, options) {
        const path = this.getTemplatePath(template, this.moduleOptions.view);
        return this.generateHtmlFromTemplate(path, this.moduleOptions.view, options === null || options === void 0 ? void 0 : options.locals).pipe(operators_1.mergeMap((html) => rxjs_1.of(this.prepareHtmlTemplate(html))));
    }
    getTemplatePath(template, { root, extension, engine }) {
        return path_1.join(root, template + `.${extension || engine}`);
    }
    generateHtmlFromTemplate(template, { engine, engineOptions }, locals) {
        return rxjs_1.bindNodeCallback(consolidate_1.default[engine], rxjs_1.asapScheduler)(template, Object.assign({}, locals, engineOptions));
    }
    prepareHtmlTemplate(html) {
        return juice_1.default(html, this.moduleOptions.juice);
    }
};
PDFService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(pdf_constants_1.PDF_OPTIONS_TOKEN)),
    __metadata("design:paramtypes", [Object])
], PDFService);
exports.PDFService = PDFService;
