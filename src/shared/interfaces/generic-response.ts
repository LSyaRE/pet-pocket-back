export interface GenericResponse<T> {
    data?: T;
    message: string;
    statusCode: number;
    timestamp: string;
}