import axios from 'axios'

const token = localStorage.usertoken

export default axios.create({
  baseURL: 'https://gateway19.herokuapp.com',
  headers: {
    'Content-type': 'application/json',
    'Authorization': 'Bearer ' + token
  }
})
