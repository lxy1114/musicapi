<template>
	<view class="container">
		<view class="top"></view>
		<view class="con">
			<view class="nav" :class="{'nav1': fixed}">
				<view class="nav-list">
					<view class="date">{{date}}</view>
				</view>
				<view class="nav-list">
					<view class="label" :class="{'nav-text': navIndex == 0}" @click="navIndex = 0">推荐歌单</view>
					<view class="label" :class="{'nav-text': navIndex == 1}" @click="navIndex = 1">推荐单曲</view>
				</view>
			</view>
			<view class="contain">
				<pic-cart :list="recommendList" v-if="navIndex == 0"></pic-cart>
				<song-list :list="songList" v-else></song-list>
			</view>
		</view>
	</view>
</template>

<script>
import api from '@/api'
import picCart from '@/components/cart/picCart.vue'
import songList from '@/components/list/songList.vue'
export default {
	data() {
		return {
			fixed: false,
			date: '',
			navIndex: 1,
			recommendList: [],
			songList: []
		}
	},
	components: {
		picCart,
		songList
	},
	watch: {
		navIndex() {
			// if(this.navIndex == 0 && this.recommendList = ''){
			// 	this.getReResource()
			// }else if(this.navIndex == 1 && this.songList = ''){
			// 	this.getReSongs()
			// }
			// if(this.navIndex == 0)
		},
	},
	methods: {
		getReResource() {
			api.reResource().then(res => {
				this.recommendList = res.recommend
			})
		},
		getReSongs() {
			api.reSongs().then(res => {
				this.songList = res.recommend
			})
		},
	},
	onPageScroll(e) {
		this.fixed = e.scrollTop >= 85
	},
	onLoad() {
		var year = new Date().getFullYear()
		var month = new Date().getMonth()+1
		var day = new Date().getDay()
		this.date = year+'年'+month+'月'+day+'日'
		this.getReSongs()
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
	// background: #FFFFFF;
	// border-radius: 16upx 16upx 0upx 0upx;
	// height: 1200px;	
	margin-top: 160upx;
}
.nav{
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	box-sizing: border-box;
	font-size: 24upx;
	padding: 20upx;
	color: #FFFFFF;
	// margin: 0upx 0upx 50upx;
	position: relative;
	z-index: 999;
	&-list{
		display: flex;
		align-items: center;
	}
}
.nav.nav1{
	position: fixed;
	top: 0upx;
	background: $uni-color-success;
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
	border-radius: 16upx 16upx 0upx 0upx;
	height: 1200px;
	padding: 30upx;
}
</style>
