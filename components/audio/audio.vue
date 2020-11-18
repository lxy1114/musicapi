<template>
	<view class="box">
		<!-- <view class="total">
			<view class="progress" :style="'width:'+(current/duration*100)+'%'"></view>
		</view> -->
		<slider-box 
			:duration="duration" 
			max="345" 
			left="15" 
			backColor="#f0ad4e" 
			size="10" 
			:current="current" 
			@changing="changeCurrent">
		</slider-box>
		<!-- <slider :max="duration" :value="current" block-size="12" activeColor="#f0ad4e" @changing="changeCurrent"></slider> -->
		<view class="num">{{$utils.setNumber(currentTime)+'/'+$utils.setNumber(durationTime)}}</view>
		<view class="but">
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
import sliderBox from '@/components/slider.vue'
var audio = uni.createInnerAudioContext()
export default {
	props: {
		id: '',
		data: {},
		lyricTime: ''
	},
	components: {
		sliderBox
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
		current() {
			this.getCurrent(this.current)
		},
		lyricTime() {
			audio.currentTime = this.lyricTime
		},
	},
	methods: {
		getCurrent(current) {
			this.$emit('getCurrent',current)
		},
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
		changeCurrent(e) {
			console.log(e)
			audio.currentTime = e
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
				audio.onPlay((res) => {
					this.$emit('onPlay')
				})
				audio.onTimeUpdate(() => {
					this.current = audio.currentTime
					this.currentTime = parseInt(audio.currentTime/60)+':'+parseInt(audio.currentTime%60)
				})
				audio.onEnded(() => {
					this.$emit('playNext')
				})
				audio.onSeeking(() => {
					
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
		this.type = uni.getStorageSync('playMode') || 0
		this.getUrl()
		var playInter = setInterval(() => {
			uni.setStorageSync('songData',this.data)
			uni.setStorageSync('current',this.current)
			// console.log(uni.getStorageSync('currentLyric'),'存储当前歌词')
			// console.log('存储')
		},1000)
		// this.getUrl()
	}
}
</script>

<style lang="scss" scoped>
@import '@/uni.scss';
.total{
	width: 690rpx;
	height: 4rpx;
	background: #EEEEEE;
	margin: 100rpx auto 10rpx;
	position: relative;
	.progress{
		height: 100%;
		background: $uni-color-warning;
		position: absolute;
		top: 0rpx;
		left: 0rpx;
	}
}
.num{
	font-size: 24rpx;
	color: #FFFFFF;
	margin-top: 10rpx;
}
.but{
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 630rpx;
	font-size: 28rpx;
	color: #FFFFFF;
	margin: 30rpx auto;
	&-icon{
		width: 50rpx;
		height: 50rpx;
	}
}
.iconfont{
	font-size: 34rpx;
}
</style>
