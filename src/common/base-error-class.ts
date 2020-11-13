interface Error {
  type: String;
  code: Number;
  description: String;
}

abstract class ErrorIterface<T extends Error> {
  abstract type: T["type"];
  abstract code: T["code"];
  abstract description: T["description"];
}

export class ErrorClass extends ErrorIterface<Error> {
  type: Error["type"];
  code: Error["code"];
  description: Error["description"];

  constructor(type: String, code: Number, description: String) {
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
