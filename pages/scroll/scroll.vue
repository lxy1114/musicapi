<template>
	<view class="container">
		<!-- <view class="num" @touchmove="mouseMove" @touchend="mouseEnd" @touchstart="mouseStart" :style="'top:-'+top+'upx'"> -->
		<scroll-view class="scroll" :scroll-y="true" :scroll-into-view="'scroll'+numIndex" :data-index="numIndex" @scroll="setScroll">
			<view class="num" :id="'scroll'+item" v-for="(item,index) in numList" :key="index"></view>
			<view class="num" :style="numIndex+7 == index ? 'height: 80upx;line-height: 80upx;font-size: 44upx;font-weight: bold;' : ''" :id="'scroll'+index" v-for="(item,index) in list" :key="index">{{item}}</view>
			<!-- <view class="current" :style="'top: '+scrollTop+'upx'"></view> -->
			<view style="height: 500px;"></view>
		</scroll-view>
		<!-- </view> -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [],
			top: 40,
			numIndex: -7,
			scrollTop: 0,
			currentIndex: 0,
			numList: [-7,-6,-5,-4,-3,-2,-1,]
		}
	},
	methods: {
		setScroll(e) {
			// console.log(e)
			var top = e.detail.scrollTop
			this.numIndex = Math.round(top/30)-7
			// clearInterval()
		},
	},
	onLoad() {
		for(var i=0; i<30; i++){
			this.list.push(i)
		}
		this.scrollTop = 420+uni.getSystemInfoSync().windowTop*2
		console.log(uni.getSystemInfoSync())
		var timer = setInterval(() => {
			this.numIndex ++
		},2000)
	}
}
</script>

<style lang="less" scoped>
page{
	background: #BBBBBB;
}
.container{
	background: #BBBBBB;
}
.scroll{
	height: 1000upx;
	.current{
		width: 100%;
		height: 80upx;
		border-top: 2upx solid rgba(255,255,255,0.8);
		border-bottom: 2upx solid rgba(255,255,255,0.8);
		position: fixed;
		top: 480upx;
	}
}
.num{
	text-align: center;
	height: 60upx;
	line-height: 60upx;
	font-size: 32upx;
	color: #ffffff;
}
</style>
