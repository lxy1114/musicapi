<template>
	<view class="container">
		<image class="banner" :src="data.picUrl || data.album &&  data.album.picUrl || data.al && data.al.picUrl || data.song && data.song.al.picUrl"></image>
		<view class="title">{{data.album && data.album.name || data.name || data.song && data.song.name}}</view>
		<view class="playbox">
			<audio-box :data="data" @playPrev="playPrev" @playNext="playNext"></audio-box>
		</view>
	</view>
</template>

<script>
import audioBox from '@/components/audio/audio.vue'
export default {
	data() {
		return {
			id: '',
			data: {},
			index: 0
		}
	},
	watch: {
		index() {
			this.data = this.songList[this.index]
			console.log(this.data)
		},
	},
	components: {
		audioBox
	},
	methods: {
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
		}
	},
	onLoad(e) {
		this.songList = JSON.parse(uni.getStorageSync('songList'))
		if(!e.all){
			this.index = e.index
		}else{
			var playMode = uni.getStorageSync('playMode')
			this.index = playMode != 3 ? 0 : this.getRandom(0,this.songList.length-1)
		}
		this.data = this.songList[this.index]
	}
}
</script>

<style lang="scss" scoped>
// page{
// 	background: $uni-bg-color-system;
// }
.container{
	min-height: 100vh;
	background: $uni-bg-color-system;
	padding-top: 200upx;
}
.banner{
	display: block;
	width: 360upx;
	height: 360upx;
	border-radius: 8upx;
	margin: 0upx auto 0upx;
}
.title{
	font-size: 32upx;
	color: #333333;
	margin: 30upx auto 0upx;
	text-align: center;
	color: #FFFFFF;
}
.playbox{
	width: 100%;
	margin: 50% auto 0upx;
}
</style>
