<template>
	<view class="box">
		<view class="nav" :class="{'nav1': navIndex == index}" v-for="(item,index) in list" :key="index" v-if="!search" @click="navTab(item)">{{item.title}}</view>
		<input class="search" v-if="search" @confirm="getSearch" v-model="keywords"/>
		<!-- <view class="iconfont icon-sousuo" @click="getInput"></view> -->
		<image 
			class="search-icon" 
			src="../static/images/search.svg" 
			mode="widthFix" 
			@click="search = true" 
			v-if="!search">
		</image>
		<view class="cancel" v-if="search" @click="search = false">取消</view>
	</view>
</template>

<script>
import api from '@/api'
export default {
	props: {
		navIndex: ''
	},
	data() {
		return {
			list: [{title: '我的',url: 'my'},{title: '发现',url: 'index'},{title: '村落',url: ''},
					{title: '视频',url: ''}],
			search: false,
			keywords: ''
		}
	},
	methods: {
		navTab(item) {
			uni.navigateTo({
				url: '/pages/'+item.url+'/'+item.url
			})
		},
		getSearch() {
			api.search({
				keywords: this.keywords
			}).then(res => {
				this.search = false
				uni.navigateTo({
					url: '/pages/searchResult/searchResult?keywords='+this.keywords
				})
			})
		},
	},
	onLoad() {
		
	}
}
</script>

<style lang="scss" scoped>
.box{
	display: flex;
	align-items: center;
	height: 80rpx;
	line-height: 80rpx;
	background: $uni-bg-color-hover;
	position: relative;
}
.nav{
	width: 20%;
	line-height: 80rpx;
	text-align: center;
	font-size: 28rpx;
	color: #333333;
}
.nav.nav1{
	background: $uni-text-color-system;
	opacity: 0.8;
	color: #FFFFFF;
}
.search{
	width: 83%;
	height: 85%;
	border: 2rpx solid #9ECBC9;
	border-radius: 60rpx;
	margin-left: 30rpx;
	box-sizing: border-box;
	padding: 0rpx 30rpx;
}
.search-icon{
	width: 40rpx;
	height: 40rpx;
	position: absolute;
	right: 30rpx;
}
.cancel{
	font-size: 28rpx;
	margin-left: 30rpx;
}
</style>
