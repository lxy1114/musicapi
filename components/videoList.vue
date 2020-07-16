<template>
	<view class="videolist">
		<view class="cover">
			<image class="cover-img" :src="cover" mode="aspectFill"></image>
			<view class="time-bg">
				<image class="play" src="/static/images/play-2.svg" mode="widthFix"></image>
				<view class="duration">{{duration}}</view>
			</view>
		</view>
		<view class="info">
			<view class="title">{{title}}</view>
			<view class="text" v-if="text">{{text}}</view>
			<view class="name">{{name}}</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		cover: '',
		duration: Number,
		title: '',
		text: '',
		name: ''
	},
	data() {
		return {
			
		}
	},
	methods: {
		
	},
	created() {
		
	}
}
</script>

<style lang="scss" scoped>
.videolist{
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 30upx;
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
.info{
	width: 400upx;
	color: #333333;
	.title{
		font-size: 36upx;
		margin-bottom: 10upx;
	}
	.text{
		font-size: 28upx;
		color: #999999;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.name{
		font-size: 28upx;
		color: #666666;
		margin-top: 10upx;
	}
}
</style>
