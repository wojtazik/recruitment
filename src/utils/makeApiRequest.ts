import axios from 'axios'
import config from '../config/config'

type methods = 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE'

export default (endpointUrl: string, method: methods, withAuth: boolean, authToken?: string, data?: object) => {
  return axios({
    method,
    url: config.apiUrl + endpointUrl,
    headers: withAuth ? { 'x-token': authToken } : {},
    data
  })
    .then((resp) => ({ status: 200, response: resp.data.data, error: null }))
    .catch((err) => ({ status: err.response.data.code, response: err.response.data.data.message }))
}
