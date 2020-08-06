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
	padding: 30upx;
	&-input{
		width: 85%;
		height: 70upx;
		border: 2upx solid #666666;
		border-radius: 60upx;
		box-sizing: border-box;
		padding: 20upx;
	}
	&-but{
		font-size: 34upx;
		color: #333333;
	}
}
.con{
	padding: 30upx;
}
.hotList{
	display: inline-flex;
	align-items: center;
	width: 50%;
	margin-bottom: 30upx;
	&-icon{
		width: 30upx;
		height: 30upx;
	}
}
.info{
	width: 290upx;
	font-size: 28upx;
	color: #333333;
	margin-left: 20upx;
	&-text{
		font-size: 24upx;
		color: #666666;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
}
</style>
