export interface IIdable {
    id: string | number;
}
export interface baseResponse<T> {
    code: number,
    message: string,
    data: T,
    timestamp: Date | string
}