interface Error {
    type: String;
    code: Number;
    description: String;
}
declare abstract class ErrorIterface<T extends Error> {
    abstract type: T["type"];
    abstract code: T["code"];
    abstract description: T["description"];
}
export declare class ErrorClass extends ErrorIterface<Error> {
    type: Error["type"];
    code: Error["code"];
    description: Error["description"];
    constructor(type: String, code: Number, description: String);
    parseMessage(): string;
}
export {};
