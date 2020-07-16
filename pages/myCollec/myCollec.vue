<template>
	<view class="container">
		<line-nav :list="navList" @navTab="navTab"></line-nav>
		<view class="con">			
			<albums-box v-for="(item,index) in albumsList" :key="index" :picUrl="item.picUrl" :name="item.name" v-if="navIndex == 2"></albums-box>
			<singer-box v-for="(item,index) in singerList" :key="index" :avatar="item.picUrl" :name="item.name" :albums="item.albumSize" :mv="item.mvSize" v-if="navIndex == 0"></singer-box>
			<video-list :list="list" v-for="(item,index) in mvList" :key="index" :cover="item.coverUrl" :duration="item.durationms" :title="item.title" :text="item.briefDesc" :name="item.creator[0].userName" :id="item.vid" :index="index" v-if="navIndex == 1"></video-list>
		</view>
	</view>
</template>

<script>
import api from '@/api'
import lineNav from '@/components/lineNav.vue'
import songList from '@/components/list/songList.vue'
import albumsBox from '@/components/albums.vue'
import singerBox from '@/components/singer.vue'
import picCart from '@/components/cart/picCart.vue'
import userBox from '@/components/user.vue'
import videoList from '@/components/videoList.vue'
export default {
	data() {
		return {
			offset: 1,
			list: [],
			type: 1,
			statusBarHeight: 0,
			navList: [{text: '歌手'},{text: 'MV'},{text: '专辑'}],
			singerList: [],
			navIndex: 0,
			mvList: [],
			albumsList: []
		}
	},
	components: {
		lineNav,
		songList,
		albumsBox,
		singerBox,
		picCart,
		userBox,
		videoList
	},
	methods: {
		navTab(data) {
			this.navIndex = data.index
			this.type = data.item.id
		},
		getSinger() {
			api.collecSingerList().then(res => {
				this.singerList = res.data
			})
		},
		getMv() {
			api.collecMvList().then(res => {
				this.mvList = res.data
				for(var i in this.mvList){
					this.mvList[i].durationms = typeof this.mvList[i].durationms == 'number' ? parseInt(this.mvList[i].durationms/1000/60)+':'+parseInt(this.mvList[i].durationms/1000%60) : this.mvList[i].durationms
				}	
			})
		},
		getAlbums() {
			api.collecAlbumsList({
				offset: this.offset*25-25
			}).then(res => {
				this.albumsList = res.data
			})
		},
		collecMv() {
			api.collecAlbums({
				id: 89220058,
				t: 1
			})
		},
	},
	onReachBottom() {
		if(this.navIndex != 2) return
		this.offset ++
		this.getAlbums()
	},
	onLoad(e) {
		this.statusBarHeight = uni.getSystemInfoSync().windowTop*2
		this.getSinger()
		this.getMv()
		this.getAlbums()
	}
}
</script>

<style lang="scss" scoped>
.con{
	padding: 0upx 30upx;
	margin-top: 20upx;
}
</style>
