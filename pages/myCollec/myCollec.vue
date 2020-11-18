<template>
	<view class="container">
		<line-nav :list="navList" @navTab="navTab"></line-nav>
		<view class="con">	
			<song-list 
				:list="songsList" 
				v-for="(item,index) in songsList" 
				:key="index" 
				:picUrl="item.al.picUrl" 
				:title="item.name" 
				:name="item.ar" 
				:index="index" 
				v-if="navIndex == 0" 
				@getDetail="getDetail(item)">
			</song-list>
			<albums-box 
				v-for="(item,index) in albumsList" 
				:key="index" 
				:picUrl="item.picUrl" 
				:name="item.name" 
				v-if="navIndex == 3" 
				@goAlbums="goAlbums(item,index)">
			</albums-box>
			<singer-box 
				v-for="(item,index) in singerList" 
				:key="index" 
				:avatar="item.picUrl" 
				:name="item.name" 
				:albums="item.albumSize" 
				:mv="item.mvSize" 
				:followed="true" 
				v-if="navIndex == 1" 
				@getFollow="getFollow(item,index)" 
				@goSinger="goSinger(item)">
			</singer-box>
			<video-list 
				:list="list" 
				v-for="(item,index) in mvList" 
				:key="index" 
				:cover="item.coverUrl" 
				:duration="item.durationms" 
				:title="item.title" 
				:text="item.briefDesc" 
				:name="item.creator[0].userName" 
				:id="item.vid" 
				:index="index" 
				v-if="navIndex == 2" 
				@goPlay="goPlay(item,index)">
			</video-list>
		</view>
		<view class="mask" v-if="popupShow" @click="popupShow = false"></view>
		<song-popup :data="popupData" v-if="popupShow" type="collec" @getHide="getHide"></song-popup>
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
import songPopup from '@/components/popup/song.vue'
export default {
	data() {
		return {
			offset: 1,
			list: [],
			type: 1,
			statusBarHeight: 0,
			navList: [{text: '音乐'},{text: '歌手'},{text: 'MV'},{text: '专辑'}],
			singerList: [],
			navIndex: 0,
			mvList: [],
			albumsList: [],
			loginInfo: {},
			songsList: [],
			popupShow:false
		}
	},
	components: {
		lineNav,
		songList,
		albumsBox,
		singerBox,
		picCart,
		userBox,
		videoList,
		songPopup
	},
	methods: {
		navTab(data) {
			this.navIndex = data.index
			this.type = data.item.id
		},
		getSongs() {
			api.collecSong({
				uid: this.loginInfo.profile.userId
			}).then(res => {
				var ids = ''
				for(var i in res.ids){
					ids += res.ids[i]+','
				}
				ids = ids.substr(0, ids.length - 1)
				api.songDetail({
					ids: ids
				}).then(res => {
					this.songsList = res.songs
				})
			})
		},
		getSinger() {
			api.collecSingerList().then(res => {
				this.singerList = res.data
			})
		},
		getDetail(item) {
			this.popupData = item
			this.popupShow = true
		},
		getHide() {
			this.popupShow = false
		},
		getFollow(item,index) {
			api.collecSinger({
				id: item.id,
				t: 0
			}).then(res => {
				uni.showToast({
					title: '取消关注成功！',
					icon: 'none'
				})
				this.singerList.splice(index,1)
			})
		},
		goSinger(item) {
			uni.navigateTo({
				url: '/pages/singerDetail/singerDetail?id='+item.id
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
		goPlay(item,index) {
			uni.setStorageSync('mvList',JSON.stringify(this.mvList))
			uni.navigateTo({
				url: '/pages/videoPlay/videoPlay?id='+item.vid+'&type=mv&playIndex='+index
			})
		},
		getAlbums() {
			api.collecAlbumsList({
				offset: this.offset*25-25
			}).then(res => {
				this.albumsList = res.data
			})
		},
		goAlbums(item,index) {
			uni.setStorageSync('mvList',JSON.stringify(this.albumsList))
			uni.navigateTo({
				url: '/pages/videoPlay/videoPlay?id='+item.id+'&type=album&playIndex='+index
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
		this.loginInfo = uni.getStorageSync('loginInfo') || this.loginInfo
		this.getSongs()
		this.getSinger()
		this.getMv()
		this.getAlbums()
	}
}
</script>

<style lang="scss" scoped>
.con{
	padding: 0rpx 30rpx;
	margin-top: 20rpx;
}
</style>
