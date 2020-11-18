<template>
	<view class="container">
		<view class="top">
			<view class="top-nav" :class="{'top-nav1': navIndex == index}" v-for="(item,index) in tags" :key="index" @click="navTab(item,index)">
				{{item.name}}
			</view>
			<!-- <navigator class="top-more" url="/pages/sheetCat/sheetCat">
				<image class="top-more-icon" src="/static/images/more.svg" mode="widthFix"></image>
			</navigator> -->
		</view>
		<view class="con">
			<pic-cart :list="list"></pic-cart>
		</view>
	</view>
</template>

<script>
import api from '@/api'
import picCart from '@/components/cart/picCart.vue'
export default {
	data() {
		return {
			catList: [],
			sub: [],
			tags: [{name: '推荐'}],
			navIndex: 0,
			list: []
		}
	},
	components: {
		picCart
	},
	methods: {
		getHotCat() {
			api.hotcat().then(res => {
				this.tags = this.tags.concat(res.tags)
				this.tags.push({name: '更多'})
			})
		},
		getRecommend() {
			api.recommendSheet().then(res => {
				this.list = res.result 
			})
		},
		getSelectSheet(name) {
			api.selectSheet({
				cat: name
			}).then(res => {
				this.list = res.playlists
			})
		},
		navTab(item,index) {
			if(item.name == '更多'){
				return uni.navigateTo({
					url: '/pages/sheetCat/sheetCat'
				})
			}
			this.navIndex = index			
			this.list = []
			if(index == 0){
				this.getRecommend()
			}else{
				this.getSelectSheet(item.name)
			}		
		},
	},
	onLoad() {
		this.getHotCat()
		this.getRecommend()
	}
}
</script>

<style lang="scss" scoped>
.top{
	line-height: 70rpx;
	border-bottom: 2rpx solid #EEEEEE;
	white-space: nowrap;
	overflow-x: scroll;
	&-nav{
		display: inline-block;
		padding: 0rpx 30rpx;
		font-size: 28rpx;
		color: #333333;
		text-align: center;
		position: relative;
	}
	&-more{
		width: 60rpx;
		height: 66rpx;
		background: #FFFFFF;
		position: fixed;
		top: 95rpx;
		right: 0rpx;
		text-align: center;
		&-icon{
			width: 30rpx;
			height: 30rpx;
		}
	}
	&-nav.top-nav1{
		color: $uni-bg-color-system;
	}
	&-nav.top-nav1::after{
		content: '';
		display: block;
		width: 50rpx;
		height: 4rpx;
		background: $uni-bg-color-system;
		position: absolute;
		bottom: 0rpx;
		left: 50%;
		margin-left: -25rpx;
	}
}
.con{
	padding: 30rpx;
}
</style>
