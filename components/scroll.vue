<template>
	<view class="container">
		<!-- <view class="num" @touchmove="mouseMove" @touchend="mouseEnd" @touchstart="mouseStart" :style="'top:-'+top+'rpx'"> -->
		<scroll-view class="scroll" :style="'height:'+height+'rpx'" :scroll-y="true" :scroll-into-view="'scroll'+numIndex" :scroll-with-animation="animation" :data-index="numIndex" @scroll="setScroll">
			<view class="num" :id="'scroll'+item" v-for="(item,index1) in numList" :key="item"></view>
			<view class="num" :style="numIndex+7 == index ? 'height: 80rpx;line-height: 80rpx;font-size: 36rpx;font-weight: bold;opacity: 1;' : ''" :id="'scroll'+index" v-for="(item,index) in list" :key="index" @touchstart="touchstart" @touchend="touchend" @click="setLyric(index)">{{item.text}}</view>
			<!-- <view class="current" :style="'top: '+scrollTop+'rpx'"></view> -->
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
			uni.setStorageSync('current',this.current)
			for(var i=this.list.length-1; i>0; i--){
				if(this.current >= parseFloat(this.list[i].time) && !this.touch){
					this.numIndex = i-7
					if(this.list[i].text != ''){
						this.lyric = this.list[i].text
						// this.$emit('getCurrentLyric',this.lyric)
						break;
					}					
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
			numList: [-7,-6,-5,-4,-3,-2,-1],
			animation: true,
			touch: false,
			height: 0,
			lyric: ''
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
			},3000)
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
	}
}
</script>

<style lang="less" scoped>
.scroll{
	height: 1000rpx;
	.current{
		width: 100%;
		height: 80rpx;
		border-top: 2rpx solid rgba(255,255,255,0.8);
		border-bottom: 2rpx solid rgba(255,255,255,0.8);
		position: fixed;
		top: 480rpx;
	}
}
.num{
	text-align: center;
	height: 60rpx;
	line-height: 60rpx;
	font-size: 28rpx;
	color: #ffffff;
	opacity: 0.8;
}
</style>
