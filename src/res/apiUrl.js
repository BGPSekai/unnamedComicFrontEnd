let base = process.env.API_URL;
const apiUrl = {
  auth: `${base}/auth`,
  register: `${base}/auth/register`,
  user: {
    info: `${base}/user`
  },

  comic: {
    list: `${base}/comic/page/{page}`,
    cover: `${base}/comic/{id}/cover`,
    info: `${base}/comic/{id}`
  },

  publish: {
    comic: `${base}/publish`,
    chapter: `${base}/publish/{id}`
  },

  front: {
    publishChapterSelecter: '/upload/comic/{comicId}',
    publishChapter: '/upload/comic/{comicId}/chapter'
  },
  /**
   * 取得替代後 Url
   * @param (String) url
   * @param (Object) replaceData
   */
  getReplaceUrl: (url = '', replaceData = {}) => {
    for(let i in replaceData) {
      url = url.replace( `{${i}}`, replaceData[i]);
    }
    return url;
  }
};

export default apiUrl;
