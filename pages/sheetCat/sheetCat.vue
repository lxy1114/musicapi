<template>
	<view class="container">
		<view class="title">{{title}}</view>
		<view class="list" v-for="(item,index) in catList" :key="index">
			<view class="list-title">{{item}}</view>
			<view class="list-con">
				<navigator class="label" v-for="(items,index1) in sub" :key="index1" v-if="items.category == index" :url="'/pages/sheet/sheet?name='+items.name">
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
	padding: 30upx;
	color: #333333;
}
.title{
	font-size: 32upx;
	margin-bottom: 30upx;
	font-weight: bold;
}
.list{
	display: flex;
	border-bottom: 2upx solid #EEEEEE;
	padding: 30upx 0upx;
	&-title{
		display: inline-block;
		font-size: 28upx;
		line-height: 50upx;
	}
	&-con{
		display: inline-block;
		width: 570upx;
		margin-left: 30upx;
		.label{
			display: inline-block;
			width: 150upx;
			height: 50upx;
			line-height: 50upx;
			border: 2upx solid #EEEEEE;
			border-radius: 60upx;
			margin-bottom: 20upx;
			margin-right: 20upx;
			font-size: 24upx;
			text-align: center;
		}
	}
}
.list:nth-last-child(1){
	border-style: none;
}
</style>
