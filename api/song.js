import http from '@/utils';

export default {
	// 音乐url
	getUrl(data) {
		return http.post('/song/url', data)
	},
	
	// 歌单分类
	catList(data) {
		return http.post('/playlist/catlist', data)
	},
	
	// 热门歌单分类
	hotcat(data) {
		return http.post('/playlist/hot', data)
	},
	
	// 歌单(网友精选碟)
	selectSheet(data) {
		return http.post('/top/playlist', data)
	},
	
	// 精品歌单
	goodSheet(data) {
		return http.post('/top/playlist/highquality', data)
	},
	
	// 相关歌单推荐
	relevantSheet(data) {
		return http.post('/related/playlist', data)
	},
	
	// 歌单详情
	sheetDetail(data) {
		return http.post('/playlist/detail', data)
	},
	
	// 相似歌单
	similarSheet(data) {
		return http.post('/simi/playlist', data)
	},
	
	// 推荐歌单
	recommendSheet(data) {
		return http.post('/personalized', data)
	},
	
	// 歌手分类
	singerCat(data) {
		return http.get('/artist/list', data)
	},
	
	// 搜索
	search(data) {
		return http.get('/search', data)
	},
}
