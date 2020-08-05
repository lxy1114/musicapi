<template>
	<view class="container">
		<video :src="data.url" v-if="data.url"></video>
		<view class="mv">
			<mv-list v-for="(item,index) in mvList" :key="index" :play="playIndex == index ? true : false" :picUrl="item.picUrl" :name="item.name" :duration="item.duration" @goVideo="goVideo(item,index)"></mv-list>
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
				url: 'http://vodkgeyttp8.vod.126.net/cloudmusic/b1c4/core/59b6/7d6ebb5401c6f77d160275d8e6134254.mp4?wsSecret=35230d0b41804d5ae9eef1f565089714&wsTime=1596101781'
			},
			mvList: [],
			playIndex: 0
		}
	},
	components: {
		mvList
	},
	methods: {
		getUrl(id) {
			api.mvUrl({
				id: id || this.id
			}).then(res => {
				this.data = res.data
			})
		},
		goVideo(item,index) {
			this.getUrl(item.id)
			this.playIndex = index
		},
	},
	onLoad(e) {
		this.id = e.id || '10950149'
		this.getUrl()
		this.mvList = JSON.parse(uni.getStorageSync('mvList'))
		console.log(this.mvList)
		this.playIndex = e.playIndex || 0
	}
}
</script>

<style lang="scss" scoped>
uni-video{
	width: 750upx;
	height: 400upx;
}
.mv{
	padding: 30upx;
	white-space: nowrap;
	overflow-x: scroll;
}
</style>
