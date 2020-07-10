<template>
	<view class="container">
		<image class="banner" :src="data.album.picUrl"></image>
		<view class="title">{{data.name}}</view>
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
		},
	},
	components: {
		audioBox
	},
	methods: {
		playPrev() {
			this.index = this.index != 0 ? this.index-1 : this.songList.length-1
		},
		playNext() {
			this.index = this.index != this.songList.length-1 ? this.index+1 : 0
		},
	},
	onLoad(e) {
		this.songList = JSON.parse(uni.getStorageSync('songList'))
		console.log(this.songList)
		this.index = e.index
		this.data = this.songList[this.index]
	}
}
</script>

<style lang="scss" scoped>
page{
	background: #996699;
}
.banner{
	display: block;
	width: 360upx;
	height: 360upx;
	border-radius: 8upx;
	margin: 30% auto 0upx;
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
