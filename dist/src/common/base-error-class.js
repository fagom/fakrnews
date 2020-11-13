"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorClass = void 0;
class ErrorIterface {
}
class ErrorClass extends ErrorIterface {
    constructor(type, code, description) {
        super();
        this.code = code;
        this.description = description;
        this.type = type;
    }
    parseMessage() {
        return JSON.stringify({
            type: this.type,
            code: this.code,
            description: this.description,
        });
    }
}
exports.ErrorClass = ErrorClass;
