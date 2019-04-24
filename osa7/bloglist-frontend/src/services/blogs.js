import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async updatedObject => {
  const response = await axios.put(`${baseUrl}/${updatedObject.id}`, updatedObject)
  return response.data
}

const comment = async commentObject => {
  const response = await axios.post(`${baseUrl}/${commentObject.blogId}/comments`, commentObject)
  return response.data
}

const remove = async blogObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${blogObject.id}`, config)
  return response.data
}

export default { getAll, create, setToken, update, comment, remove }