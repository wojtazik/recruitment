import { ErrorInterface } from '../../model/ErrorInterface'
import { RESET_ERROR, SET_ERROR, SetErrorInterface } from '../actions/actionsType'

const defaultError: ErrorInterface = {
  errorCode: 404,
  errorMessage: 'This page does not exists'
}

export function errorReducer (state: ErrorInterface = defaultError, action: SetErrorInterface): ErrorInterface | null {
  switch (action.type) {
    case SET_ERROR:
      state = action.payload
      return state
    case RESET_ERROR:
      state = null
      return state
    default:
      return state
  }
}
