<template>
	<view class="container">
		<view class="top">
			<!-- <image class="bg" :src="user.profile.backgroundUrl" mode="aspectFill"></image> -->
			<view class="user">
				<image class="user-avatar" :src="user.profile &&  user.profile.avatarUrl"></image>
				<view class="user-name">{{user.profile && user.profile.nickname}}</view>
				<view class="user-follow" @click="like">{{user.profile && user.profile.followed ? '取消关注' : '关注'}}</view>
			</view>
			<view class="introduc">
				简介: {{user.profile.signature}}
			</view>
		</view>
		<view class="con">
			<view class="linetitle">{{user.profile.gender == 1 ? '他' : '她'}}的歌单</view>
			<user-sheet :list="sheetList"></user-sheet>
		</view>
	</view>
</template>

<script>
import api from '@/api'
import userSheet from '@/components/userSheet.vue'
export default {
	data() {
		return {
			userId: '',
			user: {},
			sheetList: []
		}
	},
	components: {
		userSheet
	},
	methods: {
		getUser() {
			api.userDetail({
				uid: this.userId
			}).then(res => {
				this.user = res
			})
		},
		getSheet() {
			api.userSheet({
				uid: this.userId
			}).then(res => {
				this.sheetList = res.playlist
			})
		},
		like() {
			api.userLike({
				id: this.userId,
				t: this.user.profile.followed ? 0 : 1
			}).then(res => {
				var msg = !this.user.profile.followed ? '关注成功' : '取消关注成功'
				uni.showToast({
					title: msg,
					icon: 'none'
				})
				this.user.profile.followed = !this.user.profile.followed
			})
		},
	},
	onLoad(e) {
		this.userId = e.userId
		this.getUser()
		this.getSheet()
	}
}
</script>

<style lang="scss" scoped>
.top{
	width: 100%;
	position: relative;
	background: $color-bg;
	border-radius: 0rpx 0rpx 28rpx 28rpx;
	// background: linear-gradient(left, #B7D9DB, #8CB6B4);
	.bg{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0rpx;
		left: 0rpx;
	}
	.introduc{
		padding: 0rpx 30rpx 30rpx;
		font-size: 28rpx;
		color: #4F6D67;
	}
}
.user{
	display: flex;
	align-items: center;
	height: 180rpx;
	padding: 0rpx 30rpx;
	position: relative;
	&-avatar{
		width: 80rpx;
		height: 80rpx;
		border-radius: 100%;
	}
	&-name{
		font-size: 28rpx;
		color: #4F6D67;
		margin-left: 20rpx;
	}
	&-follow{
		width: 150rpx;
		height: 50rpx;
		line-height: 50rpx;
		border: 2rpx solid #A9D6D4;
		border-radius: 10rpx;
		font-size: 28rpx;
		color: #45605A;
		text-align: center;
		position: absolute;
		right: 30rpx;
	}
}
.con{
	padding: 40rpx 30rpx 30rpx;
}
</style>
