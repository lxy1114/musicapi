<template>
	<view 
		class="slider" 
		@click="onChange"
		@touchmove="touchmove">
		<view class="line" :style="{
			width: (value/max*100)+'%',
			background: backColor,
		}"></view>
		<view class="circle" 
			:style="{
				left: (value/max*100)+'%',
				width: (size*2)+'rpx',
				height: (size*2)+'rpx',
				marginTop: -size+'rpx',
				marginLeft: -size+'rpx'
			}">
		</view>
	</view>
</template>

<script>
export default {
	props: {
		duration: Number,
		current: Number,
		max: String,
		left: String,
		backColor: {
			type: String,
			default: '#f0ad4e'
		},
		size: {
			type: String,
			default: '10'
		}
	},
	data() {
		return {
			min: 0,
			value: 0
		}
	},
	watch: {
		current() {
			this.value = this.current*this.max/this.duration
		},
	},
	methods: {
		onChange(e) {
			var x = e.detail.x
			var max = this.max+this.left
			if(x >= this.left && x <= max){
				this.value = x-this.left
				var current = this.value*this.duration/this.max
				this.$emit('changing',current)
			}					
		},
		touchmove(e) {
			var x = e.mp.touches[0].clientX
			var max = this.max+this.left
			if(x >= this.left && x <= max){
				this.value = x-this.left
				var current = this.value*this.duration/this.max
				this.$emit('changing',current)
			}
		},
	},
	created() {
		
	}
}
</script>

<style lang="scss" scoped>
.slider{
	width: 100%;
	height: 4rpx;
	background: #FFFFFF;
	border-radius: 30rpx;
	position: relative;
}
.line{
	width: 50%;
	height: 100%;
	position: absolute;
	top: 0rpx;
	left: 0rpx;
}
.circle{
	width: 20rpx;
	height: 20rpx;
	background: #FFFFFF;
	border-radius: 100%;
	position: absolute;
	top: 50%;
	margin-top: -10rpx;
	left: 50%;
	margin-left: -10rpx;
}
</style>
