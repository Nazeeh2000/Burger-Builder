import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-react-burger-3e59a.firebaseio.com/'
})

export default instance