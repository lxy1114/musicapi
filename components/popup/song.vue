<template>
	<view>
		<view class="mask" @click="getHide"></view>
		<view class="box">
			<view class="popuptop">
				<image class="popuptop-cover" :src="data.song && data.song.al && data.song.al.picUrl || data.album && data.album.picUrl || data.al && data.al.picUrl"></image>
				<view class="popuptop-name">{{data.name || data.song && data.song.name}}</view>
			</view>
			<view class="popuplist">
				<image class="popuplist-icon" src=""></image>
				<view class="popuplist-text">
					{{'专辑 '}}
					{{data.album && data.album.name}}
					{{data.al && data.al.name}}
				</view>
			</view>
			<view class="popuplist">
				<image class="popuplist-icon" src=""></image>
				<view class="popuplist-text">
					{{'歌手 '}} 
					<view class="singer" v-for="(item,index) in artists" :key="index">
						{{item.name}}
						{{index != artists && artists.length-1 ? '、' : ''}}
					</view>
				</view>
			</view>
			<view class="popuplist" @click="getCollec" v-if="type != 'collec'">
				<image class="popuplist-icon" src=""></image>
				<view class="popuplist-text">收藏该歌曲</view>
			</view>
			<!-- <view class="popuplist" @click="addSheet">
				<image class="popuplist-icon" src=""></image>
				<view class="popuplist-text">添加到歌单</view>
			</view> -->
			<view class="popuplist" v-if="data.mvid" @click="goMv">
				<image class="popuplist-icon" src=""></image>
				<view class="popuplist-text">MV</view>
			</view>
			<view class="popuplist" @click="getAlike">
				<image class="popuplist-icon" src=""></image>
				<view class="popuplist-text">找相似歌曲</view>
			</view>
		</view>
	</view>
</template>

<script>
import api from '@/api'
export default {
	props: {
		data: Object,
		type: String
	},
	data() {
		return {
			artists: []
		}
	},
	methods: {
		getCollec() {
			api.likeSong({
				id: this.data.id,
				like: this.data.status ? false : true
			}).then(res => {
				uni.showToast({
					title: '收藏成功！',
					icon: 'none'
				})
				this.$emit('getCollec')
				this.getHide()
			})
		},
		getAlike() {
			var id = this.data.id || this.data.song.id
			uni.navigateTo({
				url: '/pages/alikeSongs/alikeSongs?id='+id
			})
			this.getHide()
		},
		getHide() {
			this.$emit('getHide')
		},
	},
	created() {
		this.artists = this.data.artists || this.data.ar
		console.log(this.data)
	}
}
</script>

<style lang="scss" scoped>
.box{
	width: 100%;
	border-radius: 32rpx 32rpx 0rpx 0rpx;
	border-top: 2rpx solid #EEEEEE;
	background: #FFFFFF;
	position: fixed;
	bottom: 0rpx;
}
.popuptop{
	display: flex;
	align-items: center;
	width: 690rpx;
	border-bottom: 2rpx solid #EEEEEE;
	margin: 0rpx auto;
	padding: 30rpx 0rpx;
	font-size: 28rpx;
	color: #333333;
	&-cover{
		width: 80rpx;
		height: 80rpx;
		border-radius: 8rpx;
		margin-right: 20rpx;
	}
	&-name{
		width: 550rpx;
	}
}
.popuplist{
	display: flex;
	align-items: center;
	line-height: 100rpx;
	border-bottom: 2rpx solid #EEEEEE;
	width: 690rpx;
	margin: 0rpx auto;
	font-size: 28rpx;
	color: #333333;
	&-icon{
		width: 50rpx;
		height: 50rpx;
		margin-right: 20rpx;
	}
}
.singer{
	display: inline-block;
}
</style>
