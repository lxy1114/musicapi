<template>
	<view class="box">
		<view class="blank"></view>
		<view class="play">
			<image class="play-cover" :src="data.picUrl || data.album &&  data.album.picUrl || data.al && data.al.picUrl || data.song && data.song.al.picUrl || banner"></image>
			<view class="play-title">{{data.album && data.album.name || data.name || data.song && data.song.name}}</view>
			<view class="progress">
				
			</view>
			<image class="listicon" src="../static/images/list.svg" mode="widthFix"></image>
		</view>
		<audio @getCurrent="getCurrent"></audio>
	</view>
</template>

<script>
import audioBox from '@/components/audio/audio.vue'
export default {
	props: {
		
	},
	components: {
		audioBox
	},
	data() {
		return {
			data: {},
			banner: '../../static/images/banner.png'
		}
	},
	methods: {
		getCurrent(current) {
			console.log(current)
		},
	},
	created() {
		this.data = uni.getStorageSync('songData')
	}
}
</script>

<style lang="scss" scoped>
.box{
	width: 100%;
	position: fixed;
	bottom: 0upx;
}
.blank{
	height: 80upx;
}
.play{
	display: flex;
	align-items: center;
	width: 100%;
	height: 80upx;
	box-sizing: border-box;
	padding: 0upx 30upx;
	overflow: hidden;
	border-top: 2upx solid #EEEEEE;
	position: relative;
	&-cover{
		width: 60upx;
		height: 60upx;
		border-radius: 100%;
	}
	&-title{
		font-size: 28upx;
		color: #333333;
		margin-left: 20upx;
	}
}
.listicon{
	width: 50upx;
	height: 50upx;
	position: absolute;
	right: 30upx;
}
</style>
