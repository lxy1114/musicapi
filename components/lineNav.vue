<template>
	<view class="nav">
		<view class="nav-text" :class="{'nav-text1': navIndex == index}" v-for="(item,index) in list" :key="index" @click="navTab(item,index)">{{item.text}}</view>
	</view>
</template>

<script>
export default {
	props: {
		list: Array
	},
	data() {
		return {
			navIndex: 0
		}
	},
	methods: {
		navTab(item,index) {
			this.navIndex = index
			this.$emit('navTab',{item,index})
		}
	},
	created() {
		
	}
}
</script>

<style lang="scss" scoped>
.nav{
	line-height: 80rpx;
	border-bottom: 2rpx solid #EEEEEE;
	white-space: nowrap;
	overflow-x: scroll;
	&-text{
		display: inline-block;
		font-size: 28rpx;
		color: #333333;
		padding: 0rpx 30rpx;
		position: relative;
	}
	&-text.nav-text1{
		color: $uni-text-color-system;
	}
	&-text.nav-text1::after{
		content: '';
		display: block;
		width: 40rpx;
		height: 4rpx;
		background: $uni-bg-color-system;
		position: absolute;
		bottom: 0rpx;
		left: 50%;
		margin-left: -20rpx;
	}
}
</style>
