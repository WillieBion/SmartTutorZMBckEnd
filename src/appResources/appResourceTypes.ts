export interface ResponseHandler<T = unknown> {
    statusCode: number;
    message: T;
    jwtToken?: string;
}

