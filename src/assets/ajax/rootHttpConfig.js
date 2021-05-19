import { getRequest, postRequest } from './myHttp.js'

// 查询用户信息
export const getUserInfo = (params) => {
  return postRequest('/wsng/login.do', params)
}
//
export const getBriefsInfo = (params) => {
  return postRequest('/wsng/queryBriefs.do', params)
}

//查询文章列表
export const getArticleInfo = (params) => {
  return postRequest('/articles/articles.do', params)
}

//查询归档信息
export const queryArchives = (params) => {
  return postRequest('/articles/getArchives.do', params)
}

//查询日志列表
export const queryLogbooks = (params) => {
  return postRequest('/logbook/queryLogbooks.do', params)
}

//查询文章评论
export const queryComments = (params) => {
  return postRequest('/articles/GetCommentsData.do', params)
}

//提交评论
export const setComments = (params) => {
  return postRequest('/articles/setComments.do', params)
}

//获取歌曲列表
export const getSongList = (params) => {
  return postRequest('/music/getSongList.do', params)
}

//获取歌词
export const getSongLrc = (params) => {
  return postRequest('/music/getSongLrc.do', params)
}

//书本信息
export const getBooksInfo = (params) => {
  return postRequest('/books/getBooksInfo.do', params)
}

//图片上传书本信息添加
export const uploadBooksInfo = (params) => {
  return postRequest('/books/uploadBooksInfo.do', params)
}

//查询clickhouse数据
export const queryClickHouseData = (params) => {
  return postRequest('/clickhouse/queryClickHouseData.do', params)
}
