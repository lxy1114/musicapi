<template>
	<view class="container">
		<line-nav :list="navList" @navTab="navTab"></line-nav>
		<view class="con">
			<song-list :list="list" :picUrl="item.album.artist.img1v1Url" :title="item.name" :name="item.artists" :index="index" v-for="(item,index) in list" :key="index" v-if="type == 1" @getDetail="getDetail(item)"></song-list>			
			<albums-box v-for="(item,index) in list" :key="index" :picUrl="item.picUrl" :name="item.name" v-if="type == 10" @goAlbums="goAlbums(item,index)"></albums-box>
			<singer-box v-for="(item,index) in list" :key="index" :avatar="item.picUrl" :name="item.name" :followed="item.followed" v-if="type == 100" @goSinger="goSinger(item)" @getFollow="getSingerFollow(item)"></singer-box>
			<pic-cart :list="list" v-if="type == 1000"></pic-cart>
			<user-box v-for="(item,index) in list" :key="index" :avatar="item.avatarUrl" :name="item.nickname" :gender="item.gender" :followed="item.followed" :id="item.userId" v-if="type == 1002" @goUser="goUser(item)" @getFollow="getFollow(item)"></user-box>
			<video-list :list="list" v-for="(item,index) in list" :key="index" :cover="item.cover" :duration="item.duration" :title="item.name" :text="item.briefDesc" :name="item.artistName" :id="item.id" :index="index" v-if="type == 1004" @goPlay="goPlay(item,index)"></video-list>
			<video-list :list="list" v-for="(item,index) in list" :key="index" :cover="item.coverUrl" :duration="item.duration" :title="item.title" :label="item.creator" type="video" :id="item.id" :index="index" v-if="type == 1014" @goPlay="goPlay(item,index)"></video-list>
		</view>
		<view class="mask" @click="popupShow = false" v-if="popupShow"></view>
		<song-popup :data="popupData" v-if="popupShow"></song-popup>
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
			keywords: '',
			offset: 1,
			list: [],
			type: 1,
			statusBarHeight: 0,
			navList: [{text: '单曲',id: 1},{text: '专辑',id: 10},{text: '歌手',id: 100},
						{text: '歌单',id: 1000},{text: '用户',id: 1002},{text: 'MV',id: 1004},
						{text: '视频',id: 1014}],
			popupData: {},
			popupShow: false
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
		getData() {
			api.search({
				keywords: this.keywords,
				offset: this.offset*30,
				type: this.type
			}).then(res => {
				var resultList = this.type == 1 ? res.result.songs : this.type == 10 ? res.result.albums : 
									  this.type == 100 ? res.result.artists : this.type == 1000 ? res.result.playlists :
									  this.type == 1002 ? res.result.userprofiles : 
									  this.type == 1004 ? res.result.mvs : res.result.videos
				this.list = this.list.concat(resultList)
				if(this.type == 1004 || this.type == 1014){
					for(var i in this.list){
						var duration = this.list[i].duration || this.list[i].durationms
						this.list[i].duration = typeof duration == 'number' ? parseInt(duration/1000/60)+':'+parseInt(duration/1000%60) : duration
					}				
				}
			})
		},
		navTab(data) {
			this.type = data.item.id
			this.offset = 1
			this.list = []
			this.getData()
		},
		getDetail(item) {
			this.popupData = item
			this.popupShow = true
		},
		goAlbums(item) {
			uni.navigateTo({
				url: '/pages/songList/songList?id='+item.id+'&type=albums'
			})
		},
		goPlay(item,index) {
			uni.setStorageSync('mvList',JSON.stringify(this.list))
			var id = item.id || item.vid
			var type = item.id ? 'mv' : 'video'
			uni.navigateTo({
				url: '/pages/videoPlay/videoPlay?id='+id+'&index'+index+'&type='+type
			})
		},
		goSinger(item) {
			uni.navigateTo({
				url: '/pages/singerDetail/singerDetail?id='+item.id
			})
		},
		getSingerFollow(item) {
			api.collecSinger({
				id: item.id,
				t: !item.followed ? 1 : 0   //1为关注  其他为取消关注
				}).then(res => {
					var msg = !item.followed ? '关注成功！' : '取消关注成功！'
					uni.showToast({
						title: msg,
						icon: 'none'
					})
					item.followed = !item.followed
				})
		},
		goUser(item) {
			uni.navigateTo({
				url: '/pages/user/user?userId='+item.userId
			})
		},
		getFollow(item) {
			api.userLike({
				id: item.userId,
				t: !item.followed ? 1 : 0   //1为关注  其他为取消关注
			}).then(res => {
				var msg = !item.followed ? '关注成功！' : '取消关注成功！'
				uni.showToast({
					title: msg,
					icon: 'none'
				})
				item.followed = !item.followed
			})
		},
	},
	onReachBottom() {
		this.offset ++
		this.getData()
	},
	onLoad(e) {
		this.statusBarHeight = uni.getSystemInfoSync().windowTop*2
		this.keywords = e.keywords || '7%'
		this.getData()
	}
}
</script>

<style lang="scss" scoped>
.con{
	padding: 0rpx 30rpx;
	margin-top: 20rpx;
}
</style>
