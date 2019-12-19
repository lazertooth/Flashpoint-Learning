import axios from 'axios';

export default axios.create({
    baseURL: `http://flashpoint.us-west-1.elasticbeanstalk.com/`
});