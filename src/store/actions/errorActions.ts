import { ErrorInterface } from '../../model/ErrorInterface'
import { RESET_ERROR, ResetErrorInterface, SET_ERROR, SetErrorInterface } from './actionsType'

export const setError = (payload: ErrorInterface): SetErrorInterface => {
  return {
    type: SET_ERROR,
    payload
  }
}

export const resetError = (): ResetErrorInterface => {
  return {
    type: RESET_ERROR
  }
}
