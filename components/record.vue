<template>
	<view class="record" @click="goPlay">
		<image class="cover" :src="cover" mode="aspectFill"></image>
		<view class="name">{{name}}</view>
	</view>
</template>

<script>
export default {
	props: {
		cover: '',
		name: '',
		id: ''
	},
	data() {
		return {
			
		}
	},
	methods: {
		goPlay() {
			this.$emit('goPlay')
		},
	},
	created() {
		
	}
}
</script>

<style lang="scss" scoped>
.record{
	display: inline-flex;
	align-items: center;
	width: 320rpx;
	box-sizing: border-box;
	padding: 15rpx 20rpx;
	background: #F8F8F8;
	border-radius: 8rpx;
	margin: 20rpx 20rpx 0rpx 0rpx;
	font-size: 28rpx;
	color: #666666;
}
.cover{
	width: 70rpx;
	height: 70rpx;
	border: 16rpx;
	margin-right: 20rpx;
}
.name{
	width: 160rpx;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>
