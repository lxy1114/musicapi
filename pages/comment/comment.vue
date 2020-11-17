<template>
	<view>
		<view class="top">
			<image 
				class="banner" 
				:src="data.picUrl || data.album &&  data.album.picUrl || data.al && data.al.picUrl || data.song && data.song.al.picUrl">
			</image>
			<view class="info">
				<view class="title">{{data.album && data.album.name || data.name || data.song && data.song.name}}</view>
				<view class="artists">
					<view 
						class="artists-text" 
						v-for="(item,index) in data.artists || data.song.artists || data.album.artists"
						@click="goSingerDetail(item)">
						{{item.name}}
					</view>
				</view>
			</view>
		</view>
		<view class="con">
			<view class="con-top">
				<view class="con-title">评论区</view>
				<view class="nav">
					<view 
						class="nav-text" 
						:class="{
							current: navIndex == index
						}"
						v-for="(item,index) in navList" :key="index"
						@click="navIndex = index">
						{{item}}
					</view>
				</view>
			</view>
			<block v-if="navIndex == 0">
				<view class="list" v-for="(item,index) in comments" :key="index">
					<view class="list-top">
						<image class="list-top-avatar" :src="item.user.avatarUrl"></image>
						<view class="list-info">
							<view class="list-info-name">{{item.user.nickname}}</view>
							<view class="list-info-date">{{$utils.getTime(item.time)}}</view>
						</view>
					</view>
					<view class="list-con">{{item.content}}</view>
				</view>
			</block>
			<block v-else>
				<view class="list" v-for="(item,index) in hotComments" :key="index">
					<view class="list-top">
						<image class="list-top-avatar" :src="item.user.avatarUrl"></image>
						<view class="list-info">
							<view class="list-info-name">{{item.user.nickname}}</view>
							<view class="list-info-date">{{$utils.getTime(item.time)}}</view>
						</view>
					</view>
					<view class="list-con">{{item.content}}</view>
				</view>
			</block>
		</view>
		<view 
			class="toTop" 
			@click="goTop"
			:style="{
				top: top ? top*2+'rpx' : 'auto',
				left: left ? left*2+'rpx' : 'auto'
			}">
			<image class="toTop-icon" src="../../static/images/top.png"></image>
		</view>
	</view>
</template>

<script>
import api from '@/api'
export default {
	data() {
		return {
			page: 1,
			data: {},
			navIndex: 0,
			navList: ['最新','最热'],
			list: [],
			id: '',
			comments: [],
			hotComments: [],
			left: '',
			top: ''
		}
	},
	methods: {
		getData() {
			api.getComment({
				id: this.id,
				offset: (this.page-1)*20
			}).then(res => {
				this.comments = this.comments.concat(res.comments)
				this.hotComments = res.hotComments || this.hotComments
			})
		},
		onMove(e) {
			this.left = e.touches[0].clientX
			this.top = e.touches[0].clientY
		},
		goTop() {
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 100
			})
		},
		goSingerDetail(item) {
			uni.setStorageSync('singerDetail',item)
			uni.navigateTo({
				url: '/pages/singerDetail/singerDetail?id='+item.id
			})
		},
	},
	onReachBottom() {
		this.page ++
		this.getData()
	},
	onLoad(e) {
		this.id = e.id
		this.getData()
		this.data = uni.getStorageSync('commentSinger')
		console.log(this.data)
	}
}
</script>

<style lang="scss" scoped>
.top{
	display: flex;
	align-items: center;
	padding: 30rpx;
	border-bottom: 10rpx solid #F5F5F5;
	.banner{
		width: 150rpx;
		height: 150rpx;
	}
	.info{
		margin-left: 20rpx;
		font-size: 28rpx;
	}
}
.artists{
	font-size: 24rpx;
	margin-top: 5rpx;
	color: $uni-color-primary;
}
.con{
	padding: 30rpx;
	&-top{
		display: flex;
		justify-content: space-between;
		color: #333333;
	}
}
.nav{
	margin-bottom: 10rpx;
}
.nav-text{
	display: inline-block;
	width: 80rpx;
	font-size: 28rpx;
	color: #999999;
	text-align: center;
	position: relative;
}
.nav-text:nth-child(1)::after{
	content: '';
	display: block;
	width: 2rpx;
	height: 70%;
	background: #888888;
	position: absolute;
	top: 15%;
	right: 0rpx;
}
.nav-text.current{
	color: #333333;
}
.list{
	margin-top: 30rpx;
	&-top{
		display: flex;
		align-items: center;
		&-avatar{
			width: 60rpx;
			height: 60rpx;
			border-radius: 100%;
		}
	}
	&-info{
		margin-left: 20rpx;
		font-size: 28rpx;
		color: #333333;
		&-date{
			font-size: 22rpx;
			color: #999999;
			margin-top: 4rpx;
		}
	}
	&-con{
		display: block;
		width: 580rpx;
		margin: 10rpx 0rpx 0rpx 80rpx;
		font-size: 28rpx;
		color: #333333;
		text-align: justify;
	}
}
.toTop{
	width: 70rpx;
	height: 70rpx;
	box-sizing: border-box;
	padding-top: 8rpx;
	background: $uni-color-error;
	border-radius: 100%;
	box-shadow: 0rpx 6rpx 20rpx rgba(0,0,0,0.4);
	position: fixed;
	right: 50rpx;
	bottom: 50rpx;
	&-icon{
		display: block;
		width: 50rpx;
		height: 50rpx;
		margin: 0rpx auto;
	}
}
</style>
