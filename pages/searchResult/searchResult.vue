<template>
	<view class="container">
		<line-nav :list="navList" @navTab="navTab"></line-nav>
		<view class="con">
			<song-list :list="list" :picUrl="item.album.artist.img1v1Url" :title="item.name" :name="item.artists" :index="index" v-for="(item,index) in list" :key="index" v-if="type == 1"></song-list>			
			<albums-box v-for="(item,index) in list" :key="index" :picUrl="item.picUrl" :name="item.name" v-if="type == 10"></albums-box>
			<singer-box v-for="(item,index) in list" :key="index" :avatar="item.picUrl" :name="item.name" v-if="type == 100"></singer-box>
			<pic-cart :list="list" v-if="type == 1000"></pic-cart>
			<user-box v-for="(item,index) in list" :key="index" :avatar="item.avatarUrl" :name="item.nickname" :gender="item.gender" :followed="item.followed" :id="item.userId" v-if="type == 1002"></user-box>
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
						{text: '电台',id: 1009},{text: '视频',id: 1014},{text: '综合',id: 1018}]
		}
	},
	components: {
		lineNav,
		songList,
		albumsBox,
		singerBox,
		picCart,
		userBox
	},
	methods: {
		getData() {
			api.search({
				keywords: this.keywords,
				offset: this.offset*30,
				type: this.type
			}).then(res => {
				var resultList = this.type == 1 ? res.result.songs : this.type == 10 ? res.result.albums : 
									  this.type == 100 ? res.result.artists : this.type == 100 ? res.result.playlists :
									  res.result.userprofiles
				this.list = this.list.concat(resultList)
			})
		},
		navTab(data) {
			this.type = data.item.id
			this.offset = 1
			this.list = []
			this.getData()
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
	padding: 0upx 30upx;
	margin-top: 20upx;
}
</style>
