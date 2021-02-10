import axios from 'axios';

export default axios.create({
  baseURL: 'https://raft-server.herokuapp.com',
});
