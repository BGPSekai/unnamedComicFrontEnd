let base = process.env.API_URL;
const apiUrl = {
  auth: `${base}/auth`,
  publish: {
    comic: `${base}/publish`,
    chapter: `${base}/publish/{id}`
  },
  service: {
    register: `${base}/service/register`
  }
};

export default apiUrl;
