<template>
	<view class="container">
		<view class="top">
			<input class="top-input" :placeholder="defaultWords" placeholder-class="placeholder" @confirm="getSearch" v-model="keywords"/>
			<view class="top-but" @click="keywords = ''">取消</view>
		</view>
		<view class="con">
			<view class="hotList" v-for="(item,index) in hotList" :key="index" @click="getSearch(item.searchWord)">
				<image class="hotList-icon" :src="item.iconUrl" mode="widthFix"></image>
				<view class="info">
					<view class="info-title">{{item.searchWord}}</view>
					<view class="info-text">{{item.content}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import api from '@/api'
export default {
	data() {
		return {
			hotList: [],
			keywords: '',
			defaultWords: ''
		}
	},
	methods: {
		getDefault() {
			api.searchDefault().then(res => {
				this.defaultWords = res.data.showKeyword
			})
		},
		getHot() {
			api.searchHotDetail().then(res => {
				this.hotList = res.data
			})
		},
		getSearch(keywords) {
			var keywords = keywords || this.defaultWords || this.keywords
			uni.navigateTo({
				url: '/pages/searchResult/searchResult?keywords='+keywords
			})
		},
	},
	onLoad() {
		this.getDefault()
		this.getHot()
	}
}
</script>

<style lang="scss" scoped>
.top{
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 30rpx;
	&-input{
		width: 85%;
		height: 70rpx;
		border: 2rpx solid #666666;
		border-radius: 60rpx;
		box-sizing: border-box;
		padding: 20rpx;
	}
	&-but{
		font-size: 34rpx;
		color: #333333;
	}
}
.con{
	padding: 30rpx;
}
.hotList{
	display: inline-flex;
	align-items: center;
	width: 50%;
	margin-bottom: 30rpx;
	&-icon{
		width: 30rpx;
		height: 30rpx;
	}
}
.info{
	width: 290rpx;
	font-size: 28rpx;
	color: #333333;
	margin-left: 20rpx;
	&-text{
		font-size: 24rpx;
		color: #666666;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
}
</style>
