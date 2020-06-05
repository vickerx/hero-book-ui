let baseUrl = '';

if (process.env.NODE_ENV === 'development') {
  baseUrl = '';
}

const BASE_URL = baseUrl;

export default BASE_URL;
