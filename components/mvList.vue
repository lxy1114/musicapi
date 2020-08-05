<template>
	<view class="recomlist" @click="goVideo">
		<view class="cover">
			<image class="cover-img" :src="picUrl" mode="aspectFill"></image>
			<view class="time-bg">
				<image class="play" src="/static/images/play-2.svg" mode="widthFix"></image>
				<view class="duration">{{duration}}</view>
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
		if(String(this.duration).indexOf(':') != -1 ) return
		var minute = parseInt(this.duration/1000/60)
		var second = parseInt(this.duration/1000%60)
		second = this.getTime(second)
		this.duration = minute+':'+second
	}
}
</script>

<style lang="scss" scoped>
.recomlist{
	display: inline-block;
	width: 33%;
	font-size: 28upx;
	color: #333333;
	margin-right: 30upx;
	&-img{
		width: 100%;
		height: 207upx;
		margin-bottom: 10upx;
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
.cover{
	width: 240upx;
	height: 180upx;
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
	height: 40upx;
	position: absolute;
	bottom: 0upx;
	left: 5%;
	.play{
		width: 30upx;
		height: 30upx;
	}
	.duration{
		font-size: 24upx;
		color: #FFFFFF;
	}
}
</style>
