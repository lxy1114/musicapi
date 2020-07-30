<template>
	<view class="container">
		<line-nav :list="navList" @navTab="navTab"></line-nav>
		<view class="con">
			<song-list v-for="(item,index) in detail.hotSongs" :key="index" :list="detail.hotSongs" :index="index" :picUrl="detail.artist.picUrl" :title="item.name" :name="[{name: detail.artist.name}]" v-if="navIndex == 0"></song-list>
			<mv-list v-for="(item,index) in mvList" :key="index" :data="item" :picUrl="item.imgurl" :duration="item.duration" :name="item.name" v-if="navIndex == 1" @goVideo="goVideo"></mv-list>
			<albums-box v-for="(item,index) in albumsList" :key="index" :picUrl="item.picUrl" :name="item.name" @goDetail="goDetail(item)" v-if="navIndex == 2"></albums-box>
		</view>
	</view>
</template>

<script>
import api from '@/api'
import lineNav from '@/components/lineNav.vue'
import songList from '@/components/list/songList.vue'
import mvList from '@/components/mvList.vue'
import albumsBox from '@/components/albums.vue'
export default {
	data() {
		return {
			id: '',
			navList: [{text: '单曲'},{text: 'MV'},{text: '专辑'}],
			navIndex: 0,
			songList: [],
			detail: {},
			mvList: [],
			albumsList: []
		}
	},
	components: {
		lineNav,
		songList,
		mvList,
		albumsBox
	},
	methods: {
		navTab(data) {
			this.navIndex = data.index
		},
		getDetail() {
			api.singerDesc({
				id: this.id
			}).then(res => {
				
			})
		},
		getSong() {
			api.singerSong({
				id: this.id
			}).then(res => {
				this.detail = res
			})
		},
		getMV() {
			api.singerMV({
				id: this.id
			}).then(res => {
				this.mvList = res.mvs
			})
		},
		getAlbums() {
			api.singerAlbums({
				id: this.id
			}).then(res => {
				this.albumsList = res.hotAlbums
			})
		},
		goDetail(item) {
			
		},
		goVideo(item) {
			uni.setStorageSync('mvList',JSON.stringify(this.mvList))
			uni.navigateTo({
				url: '/pages/videoPlay/videoPlay?id='+item.id
			})
		},
	},
	onLoad(e) {
		this.id = e.id || 12041068
		this.getSong()
		// this.getDetail()
		this.getMV()
		this.getAlbums()
	}
}
</script>

<style lang="scss" scoped>
.con{
	padding: 30upx;
}
</style>
