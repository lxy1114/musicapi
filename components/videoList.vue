<template>
	<view class="videolist" @click="goPlay">
		<view class="cover">
			<image class="cover-img" :src="cover" mode="aspectFill"></image>
			<view class="time-bg">
				<image class="play" src="/static/images/play-2.svg" mode="widthFix"></image>
				<view class="duration">{{duration}}</view>
			</view>
		</view>
		<view class="info">
			<view class="title" :class="{'title1': type == 'video'}">{{title}}</view>
			<view class="text" v-if="text">{{text}}</view>
			<view class="name">{{name}}</view>
			<view class="label" v-if="label">
				<view class="label-text" v-for="(item,index) in label" :key="index">{{item.userName}}</view>
			</view>
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
		name: '',
		label: Array,
		type: String
	},
	data() {
		return {
			
		}
	},
	methods: {
		goPlay() {
			this.$emit('goPlay')
		},
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
	margin-bottom: 30rpx;
}
.cover{
	width: 240rpx;
	height: 180rpx;
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
.info{
	width: 400rpx;
	color: #333333;
	.title{
		font-size: 36rpx;
		margin-bottom: 10rpx;
	}
	.title.title1{
		font-size: 28rpx;
	}
	.text{
		font-size: 28rpx;
		color: #999999;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.name{
		font-size: 28rpx;
		color: #666666;
		margin-top: 10rpx;
	}
}
.label{
	margin-top: 20rpx;
	&-text{
		display: inline-block;
		padding: 2rpx 10rpx;
		border-radius: 8rpx;
		background: #A5D6D4;
		font-size: 24rpx;
		color: #ffffff;
		margin-right: 20rpx;
	}
}
</style>
