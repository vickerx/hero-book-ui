let baseUrl = '';

if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:8081';
}

const BASE_URL = baseUrl;

export default BASE_URL;
