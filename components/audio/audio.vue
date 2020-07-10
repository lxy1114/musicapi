<template>
	<view class="box">
		<view class="total">
			<view class="progress" :style="'width:'+(current/duration*100)+'%'"></view>
		</view>
		<view class="num">{{currentTime+'/'+durationTime}}</view>
		<view class="but">
			<view class="but-text" @click="playPrev">上一个</view>
			<view class="but-text" @click="play">{{pause ? '开始' : '暂停'}}</view>
			<view class="but-text" @click="playNext">下一个</view>
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
			durationTime: 0
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
			this.getAudio()
		},
		// audio() {
		// 	console.log(audio)
		// },
	},
	methods: {
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
				id: this.id
			}).then(res => {
				audio.src = res.data[0].url
				console.log(audio)
				audio.autoplay = true
				audio.onCanplay((res) => {
					console.log(res)
				})
			})
		},
		play() {
			this.pause = !this.pause
		},
		playPrev() {
			this.$emit('playPrev')
		},
		playNext() {
			this.$emit('playNext')
		},
	},
	created() {		
		this.getAudio()
		// this.getUrl()
	}
}
</script>

<style lang="scss" scoped>
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
	width: 690upx;
	font-size: 28upx;
	color: #FFFFFF;
	margin: 30upx auto;
}
</style>
