let base = process.env.API_URL;
const apiUrl = {
  auth: `${base}/auth`,
  register: `${base}/auth/register`,
  user: {
    info: `${base}/user`
  },
  comic: {
    list: `${base}/comic/page/{page}`,
    cover: `${base}/comic/{id}/cover`
  },
  publish: {
    comic: `${base}/publish`,
    chapter: `${base}/publish/{id}`
  }
};

export default apiUrl;
