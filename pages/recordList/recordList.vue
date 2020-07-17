<template>
	<view class="container">
		<line-nav :list="navList" @navTab="navTab"></line-nav>
		<view class="con">
			<song-list v-for="(item,index) in list" :list="list" :key="index" :picUrl="item.song.al.picUrl" :title="item.song.name" :name="item.song.ar" :index="index" v-if="navIndex == 0"></song-list>
		</view>
	</view>
</template>

<script>
import api from '@/api'
import lineNav from '@/components/lineNav.vue'
import songList from '@/components/list/songList.vue'
export default {
	data() {
		return {
			list: [],
			navList: [{text: '单曲'},{text: 'MV'},{text: '视频'}],
			navIndex: 0
		}
	},
	components: {
		lineNav,
		songList
	},
	methods: {
		navTab(data) {
			this.navIndex = data.index
		},
	},
	onLoad() {
		this.list = uni.getStorageSync('recordList')
		console.log(this.list)
	}
}
</script>

<style lang="scss" scoped>
.con{
	padding: 30upx;
}
</style>
