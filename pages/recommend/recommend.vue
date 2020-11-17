<template>
	<view class="container">
		<view class="top" :style="'top:'+statusBarHeight+'upx'"></view>
		<view class="con">
			<view class="nav" :class="{'nav1': fixed}" :style="fixed ? 'top:'+statusBarHeight+'upx' : 'top: 0upx'">
				<view class="nav-play">
					<image class="nav-play-icon" src="/static/images/play.svg" mode="widthFix"></image>
					<view @click="playAll">全部播放</view>
				</view>
				<view class="date">{{date}}</view>
			</view>
			<view class="contain">
				<song-list 
					:list="songList" 
					:picUrl="item.album.picUrl" 
					:title="item.name" 
					:name="item.album.artists" 
					:index="index" 
					v-for="(item,index) in songList" 
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
import picCart from '@/components/cart/picCart.vue'
import songList from '@/components/list/songList.vue'
import songPopup from '@/components/popup/song.vue'
export default {
	data() {
		return {
			fixed: false,
			date: '',
			navIndex: 1,
			recommendList: [],
			songList: [],
			statusBarHeight: 0,
			popupData: {},
			popupShow: false
		}
	},
	components: {
		picCart,
		songList,
		songPopup
	},
	methods: {
		getReSongs() {
			api.reSongs().then(res => {
				this.songList = res.recommend
				uni.setStorageSync('reSongList',JSON.stringify(this.songList))
			})
		},
		playAll() {
			uni.setStorageSync('reSongList',JSON.stringify(this.songList))
			uni.navigateTo({
				url: '/pages/play/play?all=true'
			})
		},
		getDetail(item) {
			this.popupData = item
			this.popupShow = true
		},
	},
	onPageScroll(e) {
		this.fixed = e.scrollTop >= 85
	},
	onLoad() {
		this.statusBarHeight = uni.getSystemInfoSync().windowTop*2
		var year = new Date().getFullYear()
		var month = new Date().getMonth()+1
		var day = new Date().getDate()
		this.date = year+'年'+month+'月'+day+'日'
		if(this.date == uni.getStorageSync('date') && uni.getStorageSync('reSongList')){
			this.songList = JSON.parse(uni.getStorageSync('reSongList'))
		}else{
			this.getReSongs()
		}
		uni.setStorageSync('date',this.date)
	}
}
</script>

<style lang="scss" scoped>
.top{
	width: 100%;
	height: 275upx;
	background: url(../../static/images/banner.png) 100% 100% no-repeat;
	background-size: cover;
	position: fixed;
	top: 0upx;
}
.con{
	width: 100%;
	position: relative;
	background: #FFFFFF;
	border-radius: 16upx 16upx 0upx 0upx;
	// height: 1200px;	
	margin-top: 200upx;
	box-sizing: border-box;
}
.nav{
	display: flex;
	align-items: center;
	background: #FFFFFF;
	box-sizing: border-box;
	padding: 30upx;
	border-radius: 16upx 16upx 0upx 0upx;
	font-size: 28upx;
	color: #333333;
	font-weight: bold;
	position: relative;
	&-play{
		display: flex;
		align-items: center;
		&-icon{
			width: 32upx;
			height: 32upx;
			margin-right: 10upx;
		}
	}
	.date{
		font-weight: 400;
		position: absolute;
		right: 30upx;
	}
}
.nav1{
	width: 100%;
	position: fixed;
	top: 0upx;
	z-index: 999;
}
.label{
	border: 2upx solid #FFFFFF;
	border-radius: 30upx;
	padding: 10upx 20upx;
}
.nav-text{
	border-color: #333333;
	color: #333333;
}
.label:nth-last-child(1){
	margin-left: 20upx;
}
.contain{
	background: #FFFFFF;
	height: 1200px;
	padding: 0upx 30upx 30upx;
}
</style>
