<template>
	<view class="container">
		<video :src="data.url" v-if="data.url"></video>
	</view>
</template>

<script>
import api from '@/api'
export default {
	data() {
		return {
			id: '',
			data: {
				url: 'http://vodkgeyttp8.vod.126.net/cloudmusic/b1c4/core/59b6/7d6ebb5401c6f77d160275d8e6134254.mp4?wsSecret=35230d0b41804d5ae9eef1f565089714&wsTime=1596101781'
			},
			mvList: []
		}
	},
	methods: {
		getUrl() {
			api.mvUrl({
				id: this.id
			}).then(res => {
				this.data = res.data
			})
		},
	},
	onLoad(e) {
		this.id = e.id || '10950149'
		this.getUrl()
		this.mvList = JSON.parse(uni.getStorageSync('mvList'))
		console.log(this.mvList)
	}
}
</script>

<style lang="scss" scoped>
uni-video{
	width: 750upx;
	height: 400upx;
}
</style>
