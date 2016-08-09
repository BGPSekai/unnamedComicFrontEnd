let base = process.env.API_URL;
const apiUrl = {
  auth: `${base}/auth`,
  service: {
    register: `${base}/service/register`
  }
};

export default apiUrl;
