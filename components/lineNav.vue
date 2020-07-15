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
	line-height: 80upx;
	border-bottom: 2upx solid #EEEEEE;
	white-space: nowrap;
	overflow-x: scroll;
	&-text{
		display: inline-block;
		font-size: 28upx;
		color: #333333;
		padding: 0upx 30upx;
		position: relative;
	}
	&-text.nav-text1{
		color: $uni-text-color-system;
	}
	&-text.nav-text1::after{
		content: '';
		display: block;
		width: 40upx;
		height: 4upx;
		background: $uni-bg-color-system;
		position: absolute;
		bottom: 0upx;
		left: 50%;
		margin-left: -20upx;
	}
}
</style>
