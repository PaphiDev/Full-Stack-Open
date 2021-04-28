import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'

//gets all the phone numbers
const getAll = () => {
    console.log('Fetching data..')
    const request = axios.get(baseURL)
    return returnRequest(request)
}

const create = (newObject) => {
    const request = axios.post(baseURL, newObject)
    return returnRequest(request)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseURL}/${id}`, newObject)
    return returnRequest(request)
}

const remove = (id) => {
    const request = axios.delete(`${baseURL}/${id}`)
    return returnRequest(request)
}

const returnRequest = (request) => {
    return request.then((response) => response.data)
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default { getAll, create, update, remove }
