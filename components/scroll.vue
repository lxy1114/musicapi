<template>
	<view class="container">
		<!-- <view class="num" @touchmove="mouseMove" @touchend="mouseEnd" @touchstart="mouseStart" :style="'top:-'+top+'upx'"> -->
		<scroll-view class="scroll" :style="'height:'+height+'upx'" :scroll-y="true" :scroll-into-view="'scroll'+numIndex" :scroll-with-animation="animation" :data-index="numIndex" @scroll="setScroll">
			<view class="num" :id="'scroll'+item" v-for="(item,index) in numList" :key="index"></view>
			<view class="num" :style="numIndex+7 == index ? 'height: 80upx;line-height: 80upx;font-size: 36upx;font-weight: bold;opacity: 1;' : ''" :id="'scroll'+index" v-for="(item,index) in list" :key="index" @touchstart="touchstart" @touchend="touchend" @click="setLyric(index)">{{item.text}}</view>
			<!-- <view class="current" :style="'top: '+scrollTop+'upx'"></view> -->
			<view style="height: 500px;"></view>
		</scroll-view>
		<!-- </view> -->
	</view>
</template>

<script>
export default {
	props: {
		list: Array,
		current: Number
	},
	watch: {
		current() {
			for(var i in this.list){
				if(this.current >= parseFloat(this.list[i].time) && !this.touch){
					this.numIndex = i-7
				}
			}
		},
	},
	data() {
		return {
			top: 40,
			numIndex: -7,
			scrollTop: 0,
			currentIndex: 0,
			numList: [-7,-6,-5,-4,-3,-2,-1,],
			animation: true,
			touch: false,
			height: 0
		}
	},
	methods: {
		setScroll(e) {
			// console.log(e)
			var top = e.detail.scrollTop
			this.numIndex = Math.round(top/30)-7
			// clearInterval()
		},
		touchstart() {
			this.animation = false
		},
		touchend() {
			this.animation = true
			this.touch = true
			var that = this
			setTimeout(() => {
				this.touch = false
			},2000)
		},
		setLyric(index) {
			if(index == this.numIndex+7){
				this.$emit('setLyric',index)
			}
		},
	},
	created() {
		var system = uni.getSystemInfoSync()
		this.scrollTop = 420+system.windowTop*2		
		this.height = (system.windowHeight-system.windowTop)*2
		console.log(uni.getSystemInfoSync())
		// var timer = setInterval(() => {
		// 	this.numIndex ++
		// },2000)
	}
}
</script>

<style lang="less" scoped>
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
	font-size: 28upx;
	color: #ffffff;
	opacity: 0.8;
}
</style>
