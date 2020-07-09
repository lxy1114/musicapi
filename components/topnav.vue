<template>
	<view class="box">
		<view class="nav" :class="{'nav1': navIndex == index}" v-for="(item,index) in list" :key="index">{{item}}</view>
	</view>
</template>

<script>
export default {
	props: {
		navIndex: Number
	},
	data() {
		return {
			list: ['我的','发现','村落','视频']
		}
	},
	methods: {
		
	},
	onLoad() {
		
	}
}
</script>

<style lang="scss" scoped>
.box{
	display: flex;
	align-items: center;
	line-height: 80upx;
	background: $uni-bg-color-hover;
}
.nav{
	width: 20%;
	text-align: center;
	font-size: 28upx;
	color: #333333;
}
.nav.nav1{
	background: $uni-bg-color-check;
	color: $uni-text-color-check;
}
</style>
