<template>
	<view class="container">
		<line-nav :list="navList" @navTab="navTab"></line-nav>
		<view class="con">
			<song-list v-for="(item,index) in detail.hotSongs" :key="index" :list="detail.hotSongs" :index="index" :picUrl="detail.artist.picUrl" :title="item.name" :name="[{name: detail.artist.name}]" v-if="navIndex == 0" @getDetail="getDetail(item)"></song-list>
			<mv-block v-for="(item,index) in mvList" :key="index" :data="item" :picUrl="item.imgurl" :duration="item.duration" :name="item.name" v-if="navIndex == 1" @goVideo="goVideo(item,index)"></mv-block>
			<albums-box v-for="(item,index) in albumsList" :key="index" :picUrl="item.picUrl" :name="item.name" @goAlbums="goAlbums(item,index)" v-if="navIndex == 2"></albums-box>
		</view>
		<view class="mask" v-if="popupShow" @click="popupShow = false"></view>
		<song-popup :data="popupData" v-if="popupShow" @getHide="getHide"></song-popup >
	</view>
</template>

<script>
import api from '@/api'
import lineNav from '@/components/lineNav.vue'
import songList from '@/components/list/songList.vue'
import mvBlock from '@/components/mvBlock.vue'
import albumsBox from '@/components/albums.vue'
import songPopup from '@/components/popup/song.vue'
export default {
	data() {
		return {
			id: '',
			navList: [{text: '单曲'},{text: 'MV'},{text: '专辑'}],
			navIndex: 0,
			songList: [],
			detail: {},
			mvList: [],
			albumsList: [],
			popupShow: false,
			popupData: {}
		}
	},
	components: {
		lineNav,
		songList,
		mvBlock,
		albumsBox,
		songPopup
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
		goAlbums(item,index) {
			uni.navigateTo({
				url: '/pages/songList/songList?id='+item.id+'&type=albums'
			})
		},
		goVideo(item,index) {
			uni.setStorageSync('mvList',JSON.stringify(this.mvList))
			uni.navigateTo({
				url: '/pages/videoPlay/videoPlay?id='+item.id+'&type=mv&playIndex='+index
			})
		},
		getDetail(item) {
			this.popupData = item
			this.popupShow = true
		},
		getHide() {
			this.popupShow = false
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
