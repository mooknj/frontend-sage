import axios from "axios"

export default {
  getUser: () => axios.get(`https://jsonplaceholder.typicode.com/users`),
  getUsersPhoto: () => axios.get(`https://picsum.photos/v2/list`),
}
