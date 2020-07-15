import http from '@/utils';

export default {
	// 用户详情
	userDetail(data) {
		return http.post('/user/detail', data)
	},

}
