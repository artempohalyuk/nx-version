
// duplicated in both apps
export interface IHttpResponse<T = void> {
    status: string;
    statusMessage: string;
    payload: T;
}