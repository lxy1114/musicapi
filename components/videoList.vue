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
	.title.title1{
		font-size: 28upx;
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
.label{
	margin-top: 20upx;
	&-text{
		display: inline-block;
		padding: 2upx 10upx;
		border-radius: 8upx;
		background: #A5D6D4;
		font-size: 24upx;
		color: #ffffff;
		margin-right: 20upx;
	}
}
</style>
