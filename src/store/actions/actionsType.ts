import { ErrorInterface } from '../../model/ErrorInterface'

export interface SetErrorInterface {
  type: string,
  payload: ErrorInterface
}

export interface ResetErrorInterface {
  type: string
}

export type ErrorActionInterface = SetErrorInterface | ResetErrorInterface

export const SET_ERROR = 'SET_ERROR'
export const RESET_ERROR = 'RESET_ERROR'
