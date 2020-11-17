<template>
	<view class="container">
		<line-nav :list="navList" @navTab="navTab"></line-nav>
		<view class="con">
			<song-list 
				v-for="(item,index) in list" 
				:key="index" 
				:list="list" 
				:picUrl="item.song.al.picUrl" 
				:title="item.song.name" 
				:name="item.song.ar" 
				:index="index" 
				v-if="navIndex == 0" 
				@getDetail="getDetail(item)">
			</song-list>
		</view>
		<!-- <play-line></play-line> -->
		<song-popup :data="popupData" v-if="popupShow" @getHide="popupShow = false"></song-popup>
	</view>
</template>

<script>
import api from '@/api'
import lineNav from '@/components/lineNav.vue'
import songList from '@/components/list/songList.vue'
import playLine from '@/components/play.vue'
import songPopup from '@/components/popup/song.vue'
export default {
	data() {
		return {
			list: [],
			navList: [{text: '单曲'},{text: 'MV'},{text: '视频'}],
			navIndex: 0,
			popupData: {},
			popupShow: false
		}
	},
	components: {
		lineNav,
		songList,
		playLine,
		songPopup
	},
	methods: {
		navTab(data) {
			this.navIndex = data.index
		},
		getDetail(item) {
			this.popupData = item
			this.popupShow = true
		},
	},
	onLoad() {
		this.list = uni.getStorageSync('recordList')
	}
}
</script>

<style lang="scss" scoped>
.con{
	padding: 30upx;
}
</style>
