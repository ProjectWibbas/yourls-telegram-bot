export namespace yourls {
  export interface Response {
    readonly status: string;
    readonly code: string;
    readonly message: string;
    readonly errorCode: string;
    readonly statusCode: number;
    readonly url: {
      readonly keyword: string;
      readonly url: string;
      readonly title: string;
      readonly date: string;
      readonly ip: string;
    };
    readonly title: string;
    readonly shorturl: string;
  }
}

export namespace telegram {
  export interface UserMessage {
    readonly customKeyword?: string;
    readonly url: string;
  }
}
