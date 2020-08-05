<template>
	<view class="content">
		<top-nav navIndex="1"></top-nav>
		<view class="swiper">
			<swiper indicator-dots="true" autoplay>
				<swiper-item v-for="(item,index) in bannerList" :key="index" @click="goPlay(bannerList,index)">
					<image :src="item.pic" mode="widthFix"></image>
				</swiper-item>
		   </swiper>
		</view>
		<view class="nav">
			<view class="nav-list" v-for="(item,index) in navList" :key="index" @click="goList(item)">
				<image class="nav-list-icon" :src="'/static/images/'+item.icon+'.svg'" mode="widthFix"></image>
				<view class="bav-list-text">{{item.text}}</view>
			</view>
		</view>
		<view class="title">
			<view class="title-text">推荐新歌</view>
			<view class="title-but" @click="playAll(newSongList)">播放全部</view>
		</view>
		<view class="newSong">
			<new-song v-for="(item,index) in newSongList" :key="index" :cover="item.picUrl" :title="item.name" :name="item.song.artists" @goPlay="goPlay(newSongList,index)"></new-song>
		</view>
		<view class="title">推荐歌单</view>
		<view class="recomm">
			<sheet-box v-for="(item,index) in recommendList" :key="index" :picUrl="item.picUrl" :name="item.name" @goSongList="goSongList(item)"></sheet-box>
		</view>
		<view class="title">推荐MV</view>
		<view class="recomm">
			<mv-list v-for="(item,index) in mvList" :key="index" :picUrl="item.picUrl" :name="item.name" :duration="item.duration" @goVideo="goVideo(item,index)"></mv-list>
		</view>
	</view>
</template>

<script>
import api from '@/api'
import topNav from '@/components/topnav.vue'
import myRecord from '@/components/record.vue'
import sheetBox from '@/components/sheet.vue'
import mvList from '@/components/mvList.vue'
import newSong from '@/components/newSong.vue'
export default {
	data() {
		return {
			newSongList: [],
			bannerList: [],
			navList: [{icon: 'recommend',text: '每日推荐',url: 'recommend'},{icon: 'sheet',text: '歌单',url: 'songSheet'},
						{icon: 'singer',text: '歌手',url: 'singer'},{icon: 'mv',text: 'MV'},
						{icon: 'radio',text: '电台'}],
			recommendList: [],
			mvList: []
		}
	},
	components: {
		topNav,
		myRecord,
		sheetBox,
		mvList,
		newSong
	},
	methods: {
		getNewSong() {
			api.getNewSong().then(res => {
				this.newSongList = res.result
			})
		},
		getBanner() {
			api.getBanner({
				type: 1
			}).then(res => {
				this.bannerList = res.banners
			})
		},
		goPlay(list,index) {
			uni.setStorageSync('songList',JSON.stringify(list))
			uni.navigateTo({
				url: '/pages/play/play?index='+index
			})
		},
		playAll(list) {
			uni.setStorageSync('songList',JSON.stringify(list))
			uni.navigateTo({
				url: '/pages/play/play?all=true'
			})
		},
		goList(item) {
			if(item.url){
				var url = '/pages/'+item.url+'/'+item.url
				console.log(url)
				uni.navigateTo({
					url: url
				})
			}
		},
		goSongList(item) {
			uni.setStorageSync('sheetDetail',item)
			uni.navigateTo({
				url: '/pages/songList/songList?id='+item.id
			})
		},
		goVideo(item) {
			uni.setStorageSync('mvList',JSON.stringify(this.mvList))
			uni.navigateTo({
				url: '/pages/videoPlay/videoPlay?id='+item.id+'&index='+index
			})
		},
		getReResource() {
			api.reResource().then(res => {
				this.recommendList = res.recommend
			})
		},
		getRecommMv() {
			api.recommendMV().then(res => {
				this.mvList = res.result
			})
		},
	},
	onLoad() {
		this.getNewSong()
		this.getBanner()
		this.getReResource()
		this.getRecommMv()
	},
}
</script>

<style lang="scss" scoped>
@import '@/uni.scss';
.swiper image{
	width: 100%;
}
.nav{
	margin-top: 30upx;
	&-list{
		display: inline-block;
		width: 20%;
		font-size: 24upx;
		color: #666666;
		text-align: center;
		&-icon{
			width: 40upx;
			height: 40upx;
		}
	}
}
.title{
	display: flex;
	align-items: center;
	font-size: 32upx;
	color: #333333;
	font-weight: bold;
	margin: 30upx 0upx 0upx 30upx;
	&-but{
		padding: 5upx 20upx;
		border: 2upx solid #666666;
		border-radius: 30upx;
		font-size: 24upx;
		color: #666666;
		font-weight: 400;
		position: absolute;
		right: 30upx;
	}
}
.recomm,{
	padding: 30upx 0upx 0upx 30upx;
	white-space: nowrap;
	overflow-x: scroll;
}
.newSong{
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	padding: 30upx 30upx 0upx;
}
</style>
