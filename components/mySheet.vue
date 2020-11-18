<template>
	<view class="sheet" @click="goList">
		<image class="sheet-banner" :src="banner"></image>
		<view class="sheet-name">{{name}}</view>
		<view class="sheet-but" @click.stop="click">{{ordered ? '取消收藏' : '删除'}}</view>
	</view>
</template>

<script>
export default {
	props: {
		banner: '',
		name: '',
		ordered: Boolean
	},
	data() {
		return {
			
		}
	},
	methods: {
		click() {
			this.$emit('click')
		},
		goList() {
			this.$emit('goList')
		},
	},
	onLoad() {
		
	}
}
</script>

<style lang="scss" scoped>
.sheet{
	display: flex;
	align-items: center;
	margin-top: 30rpx;
	font-size: 28rpx;
	color: #333333;
	position: relative;
	&-banner{
		width: 70rpx;
		height: 70rpx;
		border-radius: 8rpx;
		margin-right: 20rpx;
	}
	&-name{
		width: 400rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	&-but{
		width: 150rpx;
		height: 40rpx;
		line-height: 40rpx;
		border: 2rpx solid #d4237a;
		border-radius: 8rpx;
		font-size: 28rpx;
		color: #d4237a;
		text-align: center;
		position: absolute;
		right: 0rpx;
	}
}
</style>
