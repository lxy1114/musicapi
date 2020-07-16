<template>
	<view class="box">
		<view class="total">
			<view class="progress" :style="'width:'+(current/duration*100)+'%'"></view>
		</view>
		<view class="num">{{currentTime+'/'+durationTime}}</view>
		<view class="but">
			<!-- <view class="iconfont" :class="typeList[type]" @click="getMode"></view>
			<view class="iconfont icon-prev" @click="playPrev"></view>
			<view class="iconfont" :class="pause ? 'icon-play' : 'icon-pause'" @click="play"></view>
			<view class="iconfont icon-next" @click="playNext"></view>
			<view class="iconfont icon-xihuan"></view> -->
			<image class="but-icon" :src="'/static/images/'+typeList[type]+'.svg'" @click="getMode" mode="widthFix"></image>
			<image class="but-icon" src="/static/images/prev.svg" @click="playPrev" mode="widthFix"></image>
			<image class="but-icon" :src="pause ? '/static/images/play-1.svg' : '/static/images/pause.svg'" @click="play" mode="widthFix"></image>
			<image class="but-icon" src="/static/images/next.svg" @click="playNext" mode="widthFix"></image>
			<image class="but-icon" src="/static/images/unlike.svg" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
import api from '@/api'
var audio = uni.createInnerAudioContext()
export default {
	props: {
		id: '',
		data: {}
	},
	data() {
		return {
			duration: 0,
			current: 0,
			pause: false,
			currentTime: 0,
			durationTime: 0,
			typeList: ['order','loop','single','random'],
			type: 0
		}
	},
	watch: {
		pause() {
			if(this.pause){
				audio.pause()
			}else{
				audio.play()
			}
		},
		data() {
			this.getUrl()
		},
		// audio() {
		// 	console.log(audio)
		// },
	},
	methods: {
		getMode() {
			this.type = this.type < this.typeList.length-1 ? this.type+1 : 0
			uni.setStorageSync('playMode',this.type)
		},
		getAudio() {
			audio.src = 'https://music.163.com/song/media/outer/url?id='+this.data.id+'.mp3'
			audio.autoplay = true
			audio.onCanplay((res) => {
				this.duration = audio.duration
				this.durationTime = parseInt(audio.duration/60)+':'+parseInt(audio.duration%60)
			})
			audio.onTimeUpdate(() => {
				this.current = audio.currentTime
				this.currentTime = parseInt(audio.currentTime/60)+':'+parseInt(audio.currentTime%60)
			})
			audio.onEnded(() => {
				this.$emit('playNext')
			})
		},
		getUrl() {
			api.getUrl({
				id: this.data.id || this.data.song.id
			}).then(res => {
				if(!res.data[0].url){
					uni.showToast({
						title: '暂时无法播放',
						icon: 'none'
					})
					return this.$emit('playNext')
				}
				audio.src = res.data[0].url
				audio.autoplay = true
				audio.onCanplay((res) => {
					this.duration = audio.duration
					this.durationTime = parseInt(audio.duration/60)+':'+parseInt(audio.duration%60)
				})
				audio.onTimeUpdate(() => {
					this.current = audio.currentTime
					this.currentTime = parseInt(audio.currentTime/60)+':'+parseInt(audio.currentTime%60)
				})
				audio.onEnded(() => {
					this.$emit('playNext')
				})
			})
		},
		play() {
			this.pause = !this.pause
		},
		playPrev() {
			var playMode = uni.getStorageSync('playMode')
			this.$emit('playPrev',playMode)
		},
		playNext() {
			var playMode = uni.getStorageSync('playMode')
			this.$emit('playNext',playMode)
		},
	},
	created() {		
		this.type = uni.getStorageSync('playMode')
		this.getUrl()
		// this.getUrl()
	}
}
</script>

<style lang="scss" scoped>
@import '@/uni.scss';
.total{
	width: 690upx;
	height: 4upx;
	background: #EEEEEE;
	margin: 100upx auto 10upx;
	position: relative;
	.progress{
		height: 100%;
		background: $uni-color-warning;
		position: absolute;
		top: 0upx;
		left: 0upx;
	}
}
.num{
	font-size: 24upx;
	color: #FFFFFF;
	margin-left: 30upx;
}
.but{
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 630upx;
	font-size: 28upx;
	color: #FFFFFF;
	margin: 30upx auto;
	&-icon{
		width: 50upx;
		height: 50upx;
	}
}
.iconfont{
	font-size: 34upx;
}
</style>
