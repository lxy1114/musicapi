<template>
	<view class="container">
		<video :src="url" v-if="url" autoplay danmu-btn page-gesture enable-play-gesture></video>
		<view class="novideo" v-else>{{data && data.msg || '暂无播放源'}}</view>
		<view class="mv">
			<mv-list 
				v-for="(item,index) in mvList" 
				:key="index" 
				:play="playIndex == index ? true : false" 
				:picUrl="item.picUrl || item.cover || item.coverUrl || item.imgurl" 
				:name="item.name || item.title" 
				:duration="item.duration" 
				@goVideo="goVideo(item,index)">
			</mv-list>
		</view>
	</view>
</template>

<script>
import api from '@/api'
import mvList from '@/components/mvList.vue'
export default {
	data() {
		return {
			id: '',
			data: {
				url: ''
			},
			mvList: [],
			playIndex: 0,
			type: '',
			url: ''
		}
	},
	components: {
		mvList
	},
	methods: {
		getUrl(id) {
			if(this.type == 'mv'){
				api.mvUrl({
					id: id || this.id
				}).then(res => {
					this.data = res.data
					this.url = res.data.url
				})
			}else{
				api.videoUrl({
					id: id || this.id
				}).then(res => {
					console.log(res)
					this.data = res.urls[0]
					this.url = res.urls[0].url
				})
			}
		},
		goVideo(item,index) {
			this.getUrl(item.id)
			this.playIndex = index
		},
	},
	onLoad(e) {
		this.id = e.id || '10950149'
		this.type = e.type || ''
		this.getUrl()
		this.mvList = JSON.parse(uni.getStorageSync('mvList'))
		console.log(this.mvList)
		this.playIndex = e.playIndex || 0
	}
}
</script>

<style lang="scss" scoped>
uni-video,.novideo{
	width: 750rpx;
	height: 400rpx;
}
.novideo{
	background: #000000;
	line-height: 400rpx;
	font-size: 24rpx;
	color: rgba(255,255,255,0.7);
	text-align: center;
}
.mv{
	padding: 30rpx;
	white-space: nowrap;
	overflow-x: scroll;
}
</style>
