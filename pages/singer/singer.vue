<template>
	<view class="container">
		<view class="nav">
			<view 
				class="nav-text" 
				:class="{'nav-text1': initial == item}" 
				v-for="(item,index) in navList" 
				:key="index" 
				@click="navTab(item)">
				{{item}}
			</view>
		</view>
		<view class="con">
			<singer-box 
				v-for="(item,index) in list" 
				:key="index" 
				:avatar="item.picUrl" 
				:name="item.name" 
				:albums="item.albumSize" 
				:music="item.musicSize" 
				:followed="item.followed" 
				@goSinger="goSinger(item)" 
				@getFollow="getFollow(item)">
			</singer-box>
		</view>
	</view>
</template>

<script>
import api from '@/api'
import singerBox from '@/components/singer.vue'
export default {
	data() {
		return {
			offset: 1, 
			list:[],
			navList: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U',
						'V','W','X','Y','Z'],
			type: '',
			area: '',
			initial: 'A'
		}
	},
	components: {
		singerBox
	},
	methods: {
		navTab(item) {
			this.initial = item
			this.offset = 1
			this.list = []
			this.getData()
		},
		getData() {
			api.singerCat({
				offset: this.offset*30,
				initial: this.initial
			}).then(res => {
				this.list = this.list.concat(res.artists)
			})
		},
		getFollow(item) {
			api.collecSinger({
				id: item.id,
				t: item.followed ? 0 : 1
			}).then(res => {
				uni.showToast({
					title: item.followed ? '取消关注成功' : '关注成功',
					icon: 'none'
				})
			})
		},
		goSinger(item) {
			uni.setStorageSync('singerDetail',item)
			uni.navigateTo({
				url: '/pages/singerDetail/singerDetail?id='+item.id
			})
		},
	},
	onReachBottom() {
		this.offset ++
		this.getData()
	},
	onLoad() {
		this.getData()
	}
}
</script>

<style lang="scss" scoped>
.nav{
	padding: 0rpx 30rpx;
	&-text{
		display: inline-block;
		width: 60rpx;
		line-height: 30rpx;
		font-size: 28rpx;
		color: #666666;
		font-weight: bold;
		text-align: center;
	}
	&-text.nav-text1{
		background: $uni-bg-color-system;
		color: #FFFFFF;
	}
}
.con{
	padding: 30rpx;
}
</style>
