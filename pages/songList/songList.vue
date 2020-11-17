<template>
	<view class="container">
		<view class="top" :style="'top:'+statusBarHeight+'upx'">
			<image class="top-banner" :src="sheetDetail.coverImgUrl || sheetDetail.picUrl"></image>
			<view class="top-info">
				<view class="top-info-name">{{sheetDetail.name}}</view>
				<view class="user" @click="goUser" v-if="type != 'albums'">
					<image class="user-avatar" :src="user.profile && user.profile.avatarUrl"></image>
					<view class="user-name">{{user.profile && user.profile.nickname}}</view>
					<view class="iconfont icon-gengduo3" :style="'font-size:'+40+'upx'"></view>
				</view>
			</view>
		</view>
		<view class="con">
			<view class="con-top" :class="{'con-top1': fixed}" :style="'top:'+statusBarHeight+'upx'">
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
	height: 320upx;
	position: fixed;
	top: 0upx;
	left: 0upx;
	box-sizing: border-box;
	padding: 40upx 30upx;
	background: $color-bg;
	color: #FFFFFF;
	&-banner{
		width: 200upx;
		height: 200upx;
		border-radius: 8upx;
	}
	&-info{
		width: 460upx;
		&-name{
			font-size: 32upx;
		}
	}
}
.user{
	display: flex;
	align-items: center;
	margin-top: 30upx;
	&-avatar{
		width: 50upx;
		height: 50upx;
		border-radius: 100%;
		margin-right: 20upx;
	}
	&-name{
		font-size: 28upx;
	}
}
.con{
	margin-top: 280upx;
	position: relative;
	background: #FFFFFF;
	border-radius: 16upx 16upx 0upx 0upx;
	&-top{
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		box-sizing: border-box;
		padding: 0upx 30upx;
		line-height: 80upx;
		font-size: 28upx;
		color: #333333;
		background: #FFFFFF;
		z-index: 999;
		border-radius: 16upx 16upx 0upx 0upx;
	}
	&-top.con-top1{
		position: fixed;
		top: 0upx;
	}
	&-right{
		display: flex;
	}
	&-list{
		padding: 0upx 30upx;
	}
}
.play,.like{
	display: flex;
	align-items: center;
}
.play-icon{
	width: 36upx;
	height: 36upx;
	margin-right: 10upx;
}
.like{
	margin-left: 30upx;
}
.iconfont{
	margin-right: 10upx;
}
</style>
