<template>
	<view class="box">
		<view class="nav" :class="{'nav1': navIndex == index}" v-for="(item,index) in list" :key="index" v-if="!search" @click="navTab(item)">{{item.title}}</view>
		<input class="search" v-if="search" @confirm="getSearch" v-model="keywords"/>
		<!-- <view class="iconfont icon-sousuo" @click="getInput"></view> -->
		<image class="search-icon" src="../static/images/search.svg" mode="widthFix" @click="getInput"></image>
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
		getInput() {
			if(!this.search){
				this.search = true
			}else{
				this.getSearch()
			}
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
	height: 80upx;
	line-height: 80upx;
	background: $uni-bg-color-hover;
	position: relative;
}
.nav{
	width: 20%;
	line-height: 80upx;
	text-align: center;
	font-size: 28upx;
	color: #333333;
}
.nav.nav1{
	background: $uni-text-color-system;
	opacity: 0.8;
	color: #FFFFFF;
}
.search{
	width: 80%;
	height: 60%;
	border: 2upx solid #999999;
	border-radius: 60upx;
	margin-left: 30upx;
	box-sizing: border-box;
	padding: 0upx 30upx;
}
.search-icon{
	width: 40upx;
	height: 40upx;
	position: absolute;
	right: 30upx;
}
</style>
