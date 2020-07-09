import http from '@/utils';

export default {
	// 音乐url
	getUrl(data) {
		return http.post('/personalized/newsong', data)
	},
}
