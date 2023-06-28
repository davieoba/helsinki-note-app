import axios from 'axios'
// the base url is pointing to the backend api endpoint
// development => http://localhost:3001/api/notes
// production => https://render-test-notes-backend.onrender.com

/**
 * now since I am building the react app and serving it in my backend application, both development and production will be on the same api port so I can remove the hostname and protocol and make use of a relative path
 */

const baseUrl = '/api/notes'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  create,
  update
}