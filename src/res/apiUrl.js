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
  
  type: `${base}/type`,

  publish: {
    comic: `${base}/publish`,
    chapter: `${base}/publish/{id}`
  },

  search: {
    searchByName: `${base}/search/name/{name}/{page}`,
    searchByTag:  `${base}/search/tag/{name}/{page}`,
    searchByType:  `${base}/search/type/{name}/{page}`,
    searchByPublisher: `${base}/search/publisher/{name}/{page}`
  },

  front: {
    viewComic: '/comic/{comicId}/view',
    search: '/search',
    searchByName: '/search/name/{comicName}',
    comicInfo: '/comic/{comicId}',
    comicViewer: '/comic/{comicId}/chapter/{chapterId}',
    publishChapterSelecter: '/upload/comic/{comicId}',
    publishChapter: '/upload/comic/{comicId}/chapter'
  },
  /**
   * 取得替代後 Url
   * @param (String) url
   * @param (Object) replaceData
   */
  getReplaceUrl: (url = '', replaceData = {}) => {
    for (let i in replaceData) {
      url = url.replace( `{${i}}`, replaceData[i]);
    }
    return url;
  }
};

export default apiUrl;
