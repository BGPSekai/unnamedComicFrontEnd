let base = process.env.API_URL;
const apiUrl = {
  auth: `${base}/auth`,
  register: `${base}/auth/register`,
  user: {
    info: `${base}/user`,
    userInfo: `${base}/user/{userId}`,
    uploadUserAvatar: `${base}/user/avatar`,
    avatar: `${base.replace('/api','')}/users/{userId}.{avatarType}`,
    resetPassword: `${base}/auth/reset`,
    getFavoriteComic: `${base}/user/{userId}/favorites`
  },

  comic: {
    list: `${base}/comic/page/{page}`,
    cover: `${base}/comic/{id}/cover`,
    info: `${base}/comic/{id}`,
    view: `${base}/comic/chapter/{chapter}/{page}`,
    favorite: `${base}/favorite/{comicId}`,
    infos: `${base}/comic/info`,
    comment: `${base}/comment`,
    listComicComments: `${base}/comment/comic/{id}/{page}`,
    listChapterComments: `${base}/comment/chapter/{id}/{page}`
  },

  comment: {
    update: `${base}/comment`
  },

  type: `${base}/type`,

  tag: `${base}/tag/{tagName}/{comicId}`,

  publish: {
    comic: `${base}/publish`,
    chapter: `${base}/publish/{id}`,
    batchChapterPage: `${base}/publish/chapter/{id}`
  },

  search: {
    searchByName: `${base}/search/name/{name}/{page}`,
    searchByTag: `${base}/search/tag/{name}/{page}`,
    searchByType: `${base}/search/type/{name}/{page}`, //name is type id
    searchByPublisher: `${base}/search/publisher/{name}/{page}` // name is user id
  },

  front: {
    type: '/types/{typeName}',
    viewComic: '/comic/{comicId}/chapter/{chapterId}',
    search: '/search',
    searchByName: '/search/name/{name}/{page}',
    searchByTag: '/search/tag/{name}/{page}',
    comicInfo: '/comic/{comicId}',
    comicViewer: '/comic/{comicId}/chapter/{chapterId}',
    publishChapterSelecter: '/upload/comic/{comicId}',
    publishChapter: '/upload/comic/{comicId}/chapter',
    chapterEdit: '/upload/comic/{comicId}/chapter/{chapterId}',
    changeUserProfile: '/profile/change',
    getUserInfo: '/user/{userId}'
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
