<template>
	<view class="container">
		<view class="top" :style="'top:'+statusBarHeight+'rpx'">
			<image class="top-banner" :src="sheetDetail.coverImgUrl || sheetDetail.picUrl"></image>
			<view class="top-info">
				<view class="top-info-name">{{sheetDetail.name}}</view>
				<view class="user" @click="goUser" v-if="type != 'albums'">
					<image class="user-avatar" :src="user.profile && user.profile.avatarUrl"></image>
					<view class="user-name">{{user.profile && user.profile.nickname}}</view>
					<view class="iconfont icon-gengduo3" :style="'font-size:'+40+'rpx'"></view>
				</view>
			</view>
		</view>
		<view class="con">
			<view class="con-top" :class="{'con-top1': fixed}" :style="'top:'+statusBarHeight+'rpx'">
				<view class="play" @click="goPlay">
					<!-- <view class="iconfont icon-bofang"></view> -->
					<image class="play-icon" src="/static/images/play.svg" mode="widthFix"></image>
					<view class="play-title">播放全部</view>
				</view>
				<view class="con-right">
					<view class="like">
						<!-- <view class="iconfont icon-xihuan"></view> -->
						<image class="play-icon" src="/static/images/unlike-1.svg" mode="widthFix"></image>
						<view class="like-num">{{sheetDetail.subscribedCount}}</view>
					</view>
					<view class="like">
						<!-- <view class="iconfont icon-pinglun"></view> -->
						<image class="play-icon" src="/static/images/commet.svg" mode="widthFix"></image>
						<view class="like-num">{{sheetDetail.trackCount}}</view>
					</view>
				</view>
			</view>
			<view class="con-list">
				<song-list 
					:list="list" 
					:picUrl="item.al.picUrl" 
					:title="item.name" 
					:name="item.ar" 
					:index="index" 
					v-for="(item,index) in list" 
					:key="index" 
					@getDetail="getDetail(item)">
				</song-list>
			</view>
		</view>	
		<song-popup :data="popupData" v-if="popupShow" @getHide="popupShow = false"></song-popup>
	</view>
</template>

<script>
import api from '@/api'
import songList from '@/components/list/songList.vue'
import songPopup from '@/components/popup/song.vue'
export default {
	data() {
		return {
			list: [],
			id: '',
			sheetDetail: {},
			user: {},
			statusBarHeight: 0,
			fixed: false,
			type: '',
			popupData: {},
			popupShow: false
		}
	},
	components: {
		songList,
		songPopup
	},
	methods: {
		getSheetDetail(id) {
			api.sheetDetail({
				id: this.id
			}).then(res => {
				this.sheetDetail = res.playlist
				for(var i in res.privileges){
					if(res.privileges[i].subp == 0){
						res.playlist.tracks.splice(i,1)
					}
				}
				this.list = res.playlist.tracks
				this.getUser()
			})
		},
		getDetail(item) {
			this.popupData = item
			this.popupShow = true
		},
		getAlbumsDetail() {
			api.albumDetail({
				id: this.id
			}).then(res => {
				this.sheetDetail = res.album
				this.list = res.songs
			})
		},
		getAlbumsNum() {
			api.albumNum({
				id: this.id
			}).then(res => {
				this.sheetDetail.trackCount = res.commentCount
				this.sheetDetail.subscribedCount = res.subCount
			})
		},
		goUser() {
			uni.navigateTo({
				url: '/pages/user/user?userId='+this.sheetDetail.userId
			})
		},
		getUser() {
			api.userDetail({
				uid: this.sheetDetail.userId
			}).then(res => {
				this.user = res
			})
		},
		goPlay() {
			uni.setStorageSync('songList',JSON.stringify(this.list))
			uni.navigateTo({
				url: '/pages/play/play?all=true'
			})
		},
	},
	onPageScroll(e) {
		this.fixed = e.scrollTop >= 140
	},
	onLoad(e) {
		this.statusBarHeight = uni.getSystemInfoSync().windowTop*2
		this.id = e.id || uni.getStorageSync('sheetDetail').id || 5007016293
		this.type = e.type ? e.type : ''
		if(this.type == 'albums'){
			this.getAlbumsDetail()
			this.getAlbumsNum()
		}else{
			this.getSheetDetail()
		}		
		// this.sheetDetail = uni.getStorageSync('sheetDetail')
		console.log(this.sheetDetail)
		// this.getUser()
	}
}
</script>

<style lang="scss" scoped>
.top{
	display: flex;
	justify-content: space-between;
	width: 100%;
	height: 320rpx;
	position: fixed;
	top: 0rpx;
	left: 0rpx;
	box-sizing: border-box;
	padding: 40rpx 30rpx;
	background: $color-bg;
	color: #FFFFFF;
	&-banner{
		width: 200rpx;
		height: 200rpx;
		border-radius: 8rpx;
	}
	&-info{
		width: 460rpx;
		&-name{
			font-size: 32rpx;
		}
	}
}
.user{
	display: flex;
	align-items: center;
	margin-top: 30rpx;
	&-avatar{
		width: 50rpx;
		height: 50rpx;
		border-radius: 100%;
		margin-right: 20rpx;
	}
	&-name{
		font-size: 28rpx;
	}
}
.con{
	margin-top: 280rpx;
	position: relative;
	background: #FFFFFF;
	border-radius: 16rpx 16rpx 0rpx 0rpx;
	&-top{
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		box-sizing: border-box;
		padding: 0rpx 30rpx;
		line-height: 80rpx;
		font-size: 28rpx;
		color: #333333;
		background: #FFFFFF;
		z-index: 999;
		border-radius: 16rpx 16rpx 0rpx 0rpx;
	}
	&-top.con-top1{
		position: fixed;
		top: 0rpx;
	}
	&-right{
		display: flex;
	}
	&-list{
		padding: 0rpx 30rpx;
	}
}
.play,.like{
	display: flex;
	align-items: center;
}
.play-icon{
	width: 36rpx;
	height: 36rpx;
	margin-right: 10rpx;
}
.like{
	margin-left: 30rpx;
}
.iconfont{
	margin-right: 10rpx;
}
</style>
