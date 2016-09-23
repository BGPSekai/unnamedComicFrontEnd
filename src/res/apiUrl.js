let base = process.env.API_URL;
const apiUrl = {
  auth: `${base}/auth`,
  register: `${base}/auth/register`,
  user: {
    info: `${base}/user`,
    uploadUserAvatar: `${base}/user/avatar`,
    avatar: `${base.replace('/api','')}/public/users/{userId}.{avatarType}`,
  },

  comic: {
    list: `${base}/comic/page/{page}`,
    cover: `${base}/comic/{id}/cover`,
    info: `${base}/comic/{id}`,
    view: `${base}/comic/chapter/{page}?token={token}`
  },

  type: `${base}/type`,

  tag: `${base}/tag/{tagName}/comic/{comicId}`,

  publish: {
    comic: `${base}/publish`,
    chapter: `${base}/publish/{id}`,
    batchChapterPage: `${base}/publish/chapter/{id}`
  },

  search: {
    searchByName: `${base}/search/name/{name}/{page}`,
    searchByTag: `${base}/search/tag/{name}/{page}`,
    searchByType: `${base}/search/type/{name}/{page}`,
    searchByPublisher: `${base}/search/publisher/{name}/{page}`
  },

  front: {
    type: '/types/{typeName}',
    viewComic: '/comic/{comicId}/chapter/{chapterId}',
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
      url = url.replace(`{${i}}`, replaceData[i]);
    }
    return url;
  }
};

export default apiUrl;
