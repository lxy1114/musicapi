<template>
	<view class="con">
		<swiper class="container">
			<swiper-item class="playswiper">
				<image class="banner" 
					:src="data.picUrl || data.album &&  data.album.picUrl || data.al && data.al.picUrl || data.song && data.song.al.picUrl">
				</image>
				<view class="title">
					{{data.album && data.album.name || data.name || data.song && data.song.name}}
				</view>
				<view class="btn">
					<view 
						class="btn-text" 
						@click="goComment">
						评论
					</view>
				</view>
				<view class="playbox">
					<audio-box 
						:data="data" 
						:lyricTime="lyricTime" 
						@playPrev="playPrev" 
						@playNext="playNext" 
						@getCurrent="getCurrent" 
						@onPlay="onPlay">
					</audio-box>
				</view>
			</swiper-item>
			<swiper-item>	
				<scroll-lyric 
					:list="lyricList" 
					:current="current" 
					@setLyric="setLyric" 
					@getCurrentLyric="getCurrentLyric">
				</scroll-lyric>
			</swiper-item>
	   </swiper>	
	</view>
</template>

<script>
import api from '@/api'
import audioBox from '@/components/audio/audio.vue'
import scrollLyric from '@/components/scroll.vue'
export default {
	data() {
		return {
			id: '',
			data: {},
			index: 0,
			lyric: '',
			lyricList: [],
			current: '',
			currentLyric: '',
			playtime: 0,
			top: 0,
			translateY: 0,
			height: 0,
			lyricTime: 0
		}
	},
	watch: {
		index() {
			this.data = this.songList[this.index]
			this.getLyric()
		},
		top() {
			console.log(this.top)
		},
		data() {
			uni.setStorageSync('songData',this.data)
		},
	},
	components: {
		audioBox,
		scrollLyric
	},
	methods: {
		golyric(index) {
			this.top = index*30
			uni.pageScrollTo({
				scrollTop: index*30
			})
		},
		goComment() {
			var id = this.data.id || this.data.song.id
			uni.setStorageSync('commentSinger',this.data)
			uni.navigateTo({
				url: '/pages/comment/comment?id='+id
			})
		},
		setLyric(index) {
			for(var i in this.lyricList){
				this.lyricTime = index == i ? this.lyricList[i].time : this.lyricTime
			}
		},
		getCurrentLyric(lyric) {
			this.currentLyric = lyric
		},
		playPrev(playMode) {
			if(this.index == 0){
				return uni.showToast({
					title: '已播放至第一首',
					icon: 'none'
				})
			}
			this.index = typeof this.index == 'string' ? parseInt(this.index) : this.index
			if(playMode == 1 || playMode == 2){
				this.index = this.index != 0 ? this.index-1 : this.songList.length-1
			}else if(playMode == 0){
				this.index = this.index != 0 ? this.index-1 : 0
			}else{
				this.index = this.getRandom(0,this.songList.length-1)
			}	
		},
		playNext(playMode) {
			if(this.index == this.songList.length-1){
				return uni.showToast({
					title: '已播放至最后一首',
					icon: 'none'
				})
			}
			this.index = typeof this.index == 'string' ? parseInt(this.index) : this.index
			if(playMode == 1 || playMode == 2){
				this.index = this.index != this.songList.length-1 ? this.index+1 : 0
			}else if(playMode == 0){
				this.index = this.index != this.songList.length-1 ? this.index+1 : this.songList.length-1
			}else{
				this.index = this.getRandom(0,this.songList.length-1)
			}	
		},
		getRandom(start, end, fixed=0) {
			let differ = end - start
			let random = Math.random()
			return parseInt((start + differ * random).toFixed(fixed))
		},
		getLyric() {
			this.lyric = ''
			this.lyricList = []
			api.getlyric({
				id: this.data.id || this.data.song.id
			}).then(res => {
				this.lyric = res.lrc.lyric
				this.lyric = this.lyric.split('[')
				this.lyric.splice(0,1)
				for(var i in this.lyric){
					var time = this.lyric[i].split(']')[0]
					time = parseFloat(time.split(':')[0]*60)+parseFloat(time.split(':')[1])
					time = this.toFixed(time,2)
					var text = this.lyric[i].split(']')[1].replace(/\n/g,'')
					var obj = {
						time,
						text 
					}
					this.lyricList.push(obj)				
				}
				console.log(this.lyricList,99999)
			})
		},
		toFixed(number,fractionDigits ){
			//number  保留小数数
			//fractionDigits 保留小数位数
			var times = Math.pow(10, fractionDigits);
			var roundNum = Math.round(number * times) / times;
			return roundNum.toFixed(fractionDigits);
		},
		getCurrent(current) {
			this.current = current
		},
		onPlay() {
			var timer = setInterval(() => {
			   this.playtime  ++ 
			},10);
			// clearInterval(timer)
		},
	},
	onLoad(e) {
		var system = uni.getSystemInfoSync()
		this.height = (system.windowHeight-system.windowTop)*2
		console.log(system)
		this.songList = uni.getStorageSync('songList') ? JSON.parse(uni.getStorageSync('songList')) : JSON.parse(uni.getStorageSync('reSongList'))
		if(e.path == 'play') return
		if(!e.all){
			this.index = e.index
		}else{
			var playMode = uni.getStorageSync('playMode')
			this.index = playMode != 3 ? 0 : this.getRandom(0,this.songList.length-1)
		}
		this.data = this.songList[this.index]
		uni.setStorageSync('songData',this.data)
		this.getLyric()
	}
}
</script>

<style lang="scss" scoped>
// page{
// 	background: $uni-bg-color-system;
// }
.container{
	width: 100%;
	height: 100%;
	position: fixed;
	background: $color-play-bg;
}
.playswiper{
	padding-top: 200rpx;
}
.banner{
	display: block;
	width: 360rpx;
	height: 360rpx;
	border-radius: 8rpx;
	margin: 0rpx auto 0rpx;
}
.title{
	font-size: 32rpx;
	color: #333333;
	margin: 30rpx auto 0rpx;
	text-align: center;
	color: #FFFFFF;
}
.btn{
	display: flex;
	align-items: center;
	justify-content: flex-end;
	width: 690rpx;
	margin: 32% auto 0rpx;
	font-size: 28rpx;
	color: #FFFFFF;
}
.playbox{
	width: 690rpx;
	margin: 30rpx auto 0rpx;
}
.lyric{
	color: #FFFFFF;
	font-size: 26rpx;
	text-align: center;
	line-height: 42rpx;
}
</style>
