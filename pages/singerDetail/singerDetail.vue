<template>
	<view class="container">
		<view class="top">
			<image class="avatar" :src="singerDetail.picUrl"></image>
			<view class="info">
				<view class="info-name">{{singerDetail.name}}</view>
				<view class="tags">
					<view class="tags-text" v-for="(item,index) in tags">{{item}}</view>
				</view>
			</view>
		</view>
		<view class="content">
			<view 
				:class="{
					fixed: fixed
				}">
				<line-nav :list="navList" @navTab="navTab"></line-nav>
			</view>
			<view class="con">
				<song-list 
					v-for="(item,index) in detail.hotSongs" 
					:key="index" 
					:list="detail.hotSongs" 
					:index="index" 
					:picUrl="detail.artist.picUrl" 
					:title="item.name" 
					:name="[{name: detail.artist.name}]" 
					v-if="navIndex == 0" 
					@getDetail="getDetail(item)">
				</song-list>
				<mv-block 
					v-for="(item,index) in mvList" 
					:key="index" 
					:data="item" 
					:picUrl="item.imgurl" 
					:duration="item.duration" 
					:name="item.name" 
					v-if="navIndex == 1" 
					@goVideo="goVideo(item,index)">
				</mv-block>
				<albums-box 
					v-for="(item,index) in albumsList" 
					:key="index" 
					:picUrl="item.picUrl" 
					:name="item.name" 
					@goAlbums="goAlbums(item,index)" 
					v-if="navIndex == 2">
				</albums-box>
				<block v-if="navIndex == 3">
					<view class="desc">{{ins.briefDesc}}</view>
					<block v-for="(item,index) in ins.introduction">
						<view class="ins-title">{{item.ti}}</view>
						<view class="ins-text"></br>{{item.txt}}</view>
					</block>
				</block>
			</view>
		</view>
		<song-popup :data="popupData" v-if="popupShow" @getHide="popupShow = false"></song-popup >
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
			navList: [{text: '单曲'},{text: 'MV'},{text: '专辑'},{text: '主页'}],
			navIndex: 0,
			songList: [],
			detail: {},
			mvList: [],
			albumsList: [],
			popupShow: false,
			popupData: {},
			ins: {},
			singerDetail: {},
			tags: [],
			fixed: false
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
		getIns() {
			api.singerDesc({
				id: this.id
			}).then(res => {
				this.ins = res
				this.tags = res.topicData && res.topicData[0] && res.topicData[0].tags || []
				console.log(this.ins)
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
	onPageScroll(e) {
		this.fixed = e.scrollTop > 120
	},
	onLoad(e) {
		this.id = e.id || 12041068
		this.getSong()
		this.getMV()
		this.getAlbums()
		this.getIns()
		this.singerDetail = uni.getStorageSync('singerDetail')
		console.log(this.singerDetail)
	}
}
</script>

<style lang="scss" scoped>
.con{
	padding: 30rpx;
}
.top{
	display: flex;
	align-items: flex-end;
	width: 100%;
	box-sizing: border-box;
	padding: 30rpx 30rpx 80rpx 30rpx;
	background: $color-play-bg;
	.avatar{
		width: 180rpx;
		height: 180rpx;
		border-radius: 10rpx;
	}
	.info{
		margin-left: 20rpx;
		font-size: 28rpx;
		color: #FFFFFF;
	}
}
.tags-text{
	display: inline-block;
	padding: 4rpx 10rpx;
	border-radius: 6rpx;
	background: $uni-text-color-check;
	margin: 15rpx 15rpx 0rpx 0rpx;
	font-size: 20rpx;
}
.content{
	background: #FFFFFF;
	border-radius: 32rpx 32rpx 0rpx 0rpx;
	overflow: hidden;
	position: relative;
	margin-top: -40rpx;
}
.fixed{
	width: 100%;
	background: #FFFFFF;
	position: fixed;
	top: 88rpx;
	left: 0rpx;
	z-index: 99;
}
.desc,.ins-text{
	font-size: 28rpx;
	text-indent: 56rpx;
	line-height: 44rpx;
	color: #333333;
}
.ins-text{
	white-space: pre-line;
	position: relative;
	margin-top: -20rpx;
}
.ins-title{
	font-weight: bold;
	margin-top: 30rpx;
}
</style>
