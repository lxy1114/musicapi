<template>
	<view class="box">
		<view class="blank"></view>
		<view class="play" @click="goPlay">
			<image class="play-cover" :src="songData.picUrl || songData.album &&  songData.album.picUrl || songData.al && songData.al.picUrl || songData.song && songData.song.al.picUrl || banner"></image>
			<view class="info">
				<view class="info-title">{{songData.album && songData.album.name || songData.name || songData.song && songData.song.name}}</view>				
				<view class="info-lyric">{{currentLyric}}</view>
			</view>
			<view class="progress">
				<circle-progress :percent="percent"></circle-progress>
			</view>
			<image class="listicon" src="../static/images/list.svg" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
import circleProgress from '@/components/circle.vue'
export default {
	props: {
		
	},
	components: {
		circleProgress
	},
	data() {
		return {
			songData: {},
			banner: '../../static/images/banner.png',
			currentLyric: '',
			current: '',
			songList: '',
			numList: [],
			percent: 0
		}
	},
	watch: {
		songData() {
			this.numList = []
			var duration = this.songData.duration || this.songData.song.duration
			this.duration = parseInt(duration/1000)
			for(var i=0; i<this.duration; i++){
				this.numList.push(i)
			}
		},
		current() {
			this.percent = this.current/this.duration*100
		},
	},
	methods: {
		goPlay() {
			uni.navigateTo({
				url: '/pages/play/play?path=play'
			})
		},
	},
	created() {
		this.currentLyric = uni.getStorageSync('currentLyric')
		console.log(uni.getStorageSync('songData'))
		var timer = setInterval(() => {
			this.songData = uni.getStorageSync('songData')
			this.currentLyric = uni.getStorageSync('currentLyric')
			this.current = uni.getStorageSync('current')
			this.songList = uni.getStorageSync('songList')
			// console.log(uni.getStorageSync('currentLyric'),'获取当前歌词')
			// console.log(uni.getStorageSync('songData'))
			// console.log(uni.getStorageSync('currentLyric'),111)
			// console.log('获取')
		},1000)
	}
}
</script>

<style lang="scss" scoped>
.box{
	width: 100%;
	position: fixed;
	bottom: 0rpx;
}
.blank{
	height: 80rpx;
}
.play{
	display: flex;
	align-items: center;
	width: 100%;
	height: 80rpx;
	box-sizing: border-box;
	padding: 0rpx 30rpx;
	overflow: hidden;
	border-top: 2rpx solid #EEEEEE;
	position: relative;
	&-cover{
		width: 60rpx;
		height: 60rpx;
		border-radius: 100%;
	}
}
.info{
	margin-left: 20rpx;
	&-title{
		font-size: 28rpx;
		color: #333333;
	}
	&-lyric{
		font-size: 24rpx;
		color: #666666;
		margin-top: 4rpx;
	}
}
.progress{
	width: 50rpx;
	height: 50rpx;
	position: absolute;
	right: 100rpx;
}
.listicon{
	width: 50rpx;
	height: 50rpx;
	position: absolute;
	right: 30rpx;
}
</style>
