<template>
	<view class="recomlist" @click="goVideo">
		<view class="cover">
			<image class="cover-img" :src="picUrl" mode="aspectFill"></image>
			<view class="time-bg">
				<image class="play" src="/static/images/play-2.svg" mode="widthFix"></image>
				<view class="duration">{{$utils.getDura(duration)}}</view>
			</view>
		</view>
		<view class="recomlist-text" :class="{'recomlist-text1': play}">{{name}}</view>
	</view>
</template>

<script>
export default {
	props: {
		picUrl: '',
		name: '',
		duration: '',
		data: Object,
		play: Boolean
	},
	methods: {
		goVideo() {
			this.$emit('goVideo',this.data)
		},
		getTime(time) {
			time = time < 10 ? '0'+time : time
			return time
		},
	},
	created() {
		// if(String(this.duration).indexOf(':') != -1 ) return
		// var minute = parseInt(this.duration/1000/60)
		// var second = parseInt(this.duration/1000%60)
		// second = this.getTime(second)
		// this.duration = minute+':'+second
	}
}
</script>

<style lang="scss" scoped>
.recomlist{
	display: inline-block;
	width: 31.4%;
	font-size: 28rpx;
	color: #333333;
	margin-right: 20rpx;
	&-img{
		width: 100%;
		height: 207rpx;
		margin-bottom: 10rpx;
	}
	&-text{
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	&-text.recomlist-text1{
		color: $uni-color-warning;
	}
}
.recomlist:nth-child(3n){
	margin-right: 0rpx;
}
.cover{
	width: 208rpx;
	height: 156rpx;
	position: relative;
	&-img{
		width: 100%;
		height: 100%;
	}
}
.time-bg{
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 90%;
	height: 40rpx;
	position: absolute;
	bottom: 0rpx;
	left: 5%;
	.play{
		width: 30rpx;
		height: 30rpx;
	}
	.duration{
		font-size: 24rpx;
		color: #FFFFFF;
	}
}
</style>
