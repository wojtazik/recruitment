const PARAM_DATE = 'date'
const PARAM_TITLE = 'title'
const PARAM_ID = 'id'

export type orderBy = 'date' | 'id' | 'title'
export type order = 'asc' | 'desc'

export interface IRequestParams {
  page: any,
  order: order,
  orderBy: orderBy
}

export { PARAM_DATE, PARAM_ID, PARAM_TITLE }
