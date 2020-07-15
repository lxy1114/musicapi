<template>
	<view class="content">
		<top-nav navIndex="1"></top-nav>
		<!-- <view class="swiper">
			<swiper indicator-dots="true" autoplay>
				<swiper-item v-for="(item,index) in bannerList" :key="index">
					<image :src="item.pic" mode="widthFix"></image>
				</swiper-item>
		   </swiper>
		</view> -->
		<view class="nav">
			<view class="nav-list" v-for="(item,index) in navList" :key="index" @click="goList(item)">
				<!-- <view class="iconfont" :class="item.icon"></view> -->
				<image class="nav-list-icon" :src="'/static/images/'+item.icon+'.svg'" mode="widthFix"></image>
				<view class="bav-list-text">{{item.text}}</view>
			</view>
		</view>
		<!-- <view v-for="(item,index) in newSongList" :key="index">
			<image style="width: 50px;height: 50px;" :src="item.picUrl"></image>
			<view>{{item.name}}</view>
		</view>
		<image v-for="(item,index) in bannerList" :key="index" :src="item.pic" mode="widthFix"></image> -->
	</view>
</template>

<script>
import api from '@/api'

import topNav from '@/components/topnav.vue'
export default {
	data() {
		return {
			newSongList: [],
			bannerList: [],
			navList: [{icon: 'recommend',text: '每日推荐',url: 'recommend'},{icon: 'sheet',text: '歌单',url: 'songSheet'},
						{icon: 'singer',text: '歌手',url: 'singer'},{icon: 'mv',text: 'MV'},
						{icon: 'radio',text: '电台'}]
		}
	},
	components: {
		topNav
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
		goList(item) {
			if(item.url){
				var url = '/pages/'+item.url+'/'+item.url
				console.log(url)
				uni.navigateTo({
					url: url
				})
			}
		},
	},
	onLoad() {
		this.getNewSong()
		this.getBanner()
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
</style>
