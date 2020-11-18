<template>
	<view class="container">
		<line-nav :list="navList" @navTab="navTab"></line-nav>
		<view class="con">
			<user-box 
				v-for="(item,index) in list" 
				:key="index" 
				:avatar="item.avatarUrl" 
				:name="item.nickname" 
				:gender="item.gender" 
				:followed="item.followed" 
				@getFollow="getFollow(item,index)" 
				@goUser="goUser(item)">
			</user-box>
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
			list: [],
			navIndex: 0,
			offset: 1,
			lasttime: -1
		}
	},
	components: {
		lineNav,
		userBox
	},
	methods: {
		navTab(data) {
			this.navIndex = data.index
			this.offset = 1
			this.list = []
			if(this.navIndex == 0){
				this.offset = 1
				this.getFollowList()
			}else{
				this.lasttime = -1
				this.getFans()
			}
		},
		getFollowList() {
			api.userFollow({
				uid: this.loginInfo.profile.userId,
				offset: this.offset*30-30
			}).then(res => {
				this.list = this.list.concat(res.follow)
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
		getFans() {
			api.userFans({
				uid: this.loginInfo.profile.userId,
				lasttime: this.lasttime
			}).then(res => {
				this.list = this.list.concat(res.followeds)
				// this.lasttime = 
			})
		},
		goUser(item) {
			uni.navigateTo({
				url: '/pages/user/user?userId='+item.userId
			})
		},
	},
	onReachBottom() {
		if(this.navIndex == 0){
			this.offset ++ 
			this.getFollowList()
		}else{
			this.getFans()
		}
	},
	onLoad() {
		this.loginInfo = uni.getStorageSync('loginInfo') || {}
		this.getFollowList()
	}
}
</script>

<style lang="scss" scoped>
.con{
	padding: 30rpx;
}
</style>
