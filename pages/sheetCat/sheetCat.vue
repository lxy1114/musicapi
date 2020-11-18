<template>
	<view class="container">
		<view class="title">{{title}}</view>
		<view class="list" v-for="(item,index) in catList" :key="index">
			<view class="list-title">{{item}}</view>
			<view class="list-con">
				<navigator 
					class="label" 
					v-for="(items,index1) in sub" 
					:key="index1" 
					v-if="items.category == index" 
					:url="'/pages/sheet/sheet?name='+items.name">
					{{items.name}}
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
import api from '@/api'
export default {
	data() {
		return {
			title: '',
			catList: [],
			sub: []
		}
	},
	methods: {
		getData() {
			api.catList().then(res => {
				this.title = res.all.name
				this.catList = res.categories
				this.sub = res.sub
			})
		},
	},
	onLoad() {
		this.getData()
	}
}
</script>

<style lang="scss" scoped>
.container{
	padding: 30rpx;
	color: #333333;
}
.title{
	font-size: 32rpx;
	margin-bottom: 30rpx;
	font-weight: bold;
}
.list{
	display: flex;
	border-bottom: 2rpx solid #EEEEEE;
	padding: 30rpx 0rpx;
	&-title{
		display: inline-block;
		font-size: 28rpx;
		line-height: 50rpx;
	}
	&-con{
		display: inline-block;
		width: 570rpx;
		margin-left: 30rpx;
		.label{
			display: inline-block;
			width: 150rpx;
			height: 50rpx;
			line-height: 50rpx;
			border: 2rpx solid #EEEEEE;
			border-radius: 60rpx;
			margin-bottom: 20rpx;
			margin-right: 36rpx;
			font-size: 24rpx;
			text-align: center;
		}
	}
}
.list:nth-last-child(1){
	border-style: none;
}
</style>
