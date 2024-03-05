export type status = 'success' | 'fail';
export interface AuthorizedUser {
  status: status;
  data: any;
}
