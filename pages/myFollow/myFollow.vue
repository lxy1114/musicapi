<template>
	<view class="container">
		<line-nav :list="navList"></line-nav>
		<view class="con">
			<user-box v-for="(item,index) in followList" :key="index" :avatar="item.avatarUrl" :name="item.nickname" :gender="item.gender" :followed="item.followed" @getFollow="getFollow(item,index)"></user-box>
		</view>
	</view>
</template>

<script>
import api from '@/api'
import lineNav from '@/components/lineNav.vue'
import userBox from '@/components/user.vue'
export default {
	data() {
		return {
			navList: [{text: '关注'},{text: '粉丝'}],
			loginInfo: {},
			followList: [],
			fansList: []
		}
	},
	components: {
		lineNav,
		userBox
	},
	methods: {
		getFollowList() {
			api.userFollow({
				uid: this.loginInfo.profile.userId
			}).then(res => {
				this.followList = res.follow
			})
		},
		getFollow(item,index) {
			api.userLike({
				id: item.userId,
				t: !item.followed ? 1 : 0
			}).then(res => {
				uni.showToast({
					title: !item.followed ? '关注成功' : '取消关注成功',
					icon: 'none'
				})
				item.followed = !item.followed
			})
		},
		// getFans() {
		// 	api.userFans
		// },
	},
	onLoad() {
		this.loginInfo = uni.getStorageSync('loginInfo') || {}
		this.getFollowList()
	}
}
</script>

<style lang="scss" scoped>
.con{
	padding: 30upx;
}
</style>
