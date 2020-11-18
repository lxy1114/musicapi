<template>
	<view class="container">
		<view class="top" :style="'background-image: url('+loginInfo.profile.backgroundUrl+')'">
			<view class="top-info">
				<image class="avatar" 
					:src="loginInfo.profile.avatarUrl || '/static/images/avatar.svg'" 
					@click="login">
				</image>
				<view class="nickname">{{loginInfo.profile.nickname || '未登录'}}</view>
				<image class="gender" 
					:src="loginInfo.profile.gender == 1 ? '/static/images/boy.svg' : '/static/images/girl.svg'" 
					mode="widthFix">
				</image>
			</view>
			<view class="topbut" v-if="loginInfo.profile">
				<navigator class="topbut-list" v-for="(item,index) in topNav" :key="index" :url="'/pages/'+item.url+'/'+item.url">
					<image class="topbut-list-icon" :src="item.icon" mode="widthFix"></image>
					<view class="topbut-list-text">{{item.text}}</view>
				</navigator>
			</view>
		</view>
		<view class="con">
			<view class="block">
				<view class="title">
					<view class="title-text" :class="{'title-text1': sheetNav == 0}" @click="sheetNav = 0">我的歌单</view>
					<view class="title-text" :class="{'title-text1': sheetNav == 1}" @click="sheetNav = 1">收藏歌单</view>
				</view>
				<my-sheet 
					v-for="(item,index) in sheetList" 
					:key="index" 
					:banner="item.coverImgUrl" 
					:name="item.name" 
					:ordered="item.ordered" 
					v-if="sheetNav == 0 && !item.ordered || sheetNav == 1 && item.ordered" 
					@click="getDelete(item)" 
					@goList="goList(item)">
				</my-sheet>
				<view class="add" @click="add = true" v-if="sheetNav == 0">
					<image class="add-icon" src="/static/images/add.svg" mode="widthFix"></image>
					<view class="add-text">新建歌单</view>
				</view>
			</view>
			<view class="block">
				<view class="title">
					<view class="title-text title-text1">最近播放</view>
					<navigator class="title-more" url="/pages/recordList/recordList">更多</navigator>
				</view>
				<view class="myrecord">
					<my-record 
						v-for="(item,index) in recordList" 
						:key="index" 
						:cover="item.song.al.picUrl" 
						:name="item.song.name" 
						@goPlay="goPlay(item,index)" 
						v-if="index < 6">
					</my-record>
				</view>
			</view>
		</view>
		<view class="mask" v-if="add"></view>
		<view class="addbox" v-if="add">
			<input class="addbox-input" placeholder="请输入歌单名称" placeholder-class="placeholder" v-model="name"/>
			<view class="private" @click="private = !private">
				<view class="addbox-check" v-if="!private"></view>
				<image class="addbox-check addbox-check1" src="/static/images/check.svg" v-else></image>
				<view class="addbox-text">设为私有</view>
			</view>
			<view class="addbox-but">
				<view @click="add = false">取消</view>
				<view @click="addSheet">确定</view>
			</view>
		</view>
	</view>
</template>

<script>
import api from '@/api'
import mySheet from '@/components/mySheet.vue'
import myRecord from '@/components/record.vue'
export default {
	data() {
		return {
			loginInfo: {
				profile: {backgroundUrl: '/static/images/banner.png'}
			},
			sheetList: [],
			djList: [],
			followList: [],
			fanList: [],
			recordList: [],
			sheetNav: 0,
			add: false,
			private: false,
			name: '',
			topNav: [{icon: '/static/images/collec.svg',text: '我的收藏',url: 'myCollec'},
						{icon: '/static/images/follow.svg',text: '我的关注',url: 'myFollow'}]
		}
	},
	components: {
		mySheet,
		myRecord
	},
	methods: {
		getData() {
			api.userDetail({
				uid: this.loginInfo.profile.userId
			}).then(res => {
				this.loginInfo = res
				uni.setStorageSync('loginInfo',res)
			})
		},
		getCount() {
			api.userCount().then(res => {
				
			})
		},
		getSheet() {
			api.userSheet({
				uid: this.loginInfo.profile.userId
			}).then(res => {
				this.sheetList = res.playlist
				this.sheetList.splice(0,1)
			})
		},
		getDj() {
			api.userDj({
				uid: this.loginInfo.profile.userId
			}).then(res => {
				this.djList = res.programs
			})
		},
		getFollow() {
			api.userFollow({
				uid: this.loginInfo.profile.userId
			}).then(res => {
				this.followList = res.follow
			})
		},
		getFans() {
			api.userFans({
				uid: this.loginInfo.profile.userId
			}).then(res => {
				this.fanList = res.followeds
			})
		},
		getRecord() {
			api.userRecord({
				uid: this.loginInfo.profile.userId,
				type: 0
			}).then(res => {
				this.recordList = res.allData
				uni.setStorageSync('recordList',this.recordList)
			})
		},
		login() {
			if(this.loginInfo.profile.avatarUrl){
				
			}else{
				uni.navigateTo({
					url: '/pages/login/login'
				})
			}
		},
		addSheet() {
			api.addSheet({
				name: this.name,
				privacy: this.private ? 10 : ''
			}).then(res => {
				this.add = false
				this.getSheet()
			})
		},
		deleteSheet(id) {
			uni.showModal({
				title: '是否删除该歌单？',
				success: () => {
					api.deleteSheet({
						id: id
					}).then(res => {
						this.getSheet()
					})
				}
			})
		},
		unCollec(id) {
			uni.showModal({
				title: '是否取消收藏该歌单？',
				success: () => {
					api.uncollecSheet({
						id: id,
						t: 2
					}).then(res => {
						this.getSheet()
					})
				}
			})
		},
		getDelete(item) {
			if(item.ordered){
				this.unCollec(item.id)
			}else{
				this.deleteSheet(item.id)
			}
		},
		goPlay(item,index) {
			uni.setStorageSync('songList',JSON.stringify(this.recordList))
			uni.navigateTo({
				url: '/pages/play/play?index='+index
			})
		},
		goList(item) {
			uni.setStorageSync('sheetDetail',item)
			uni.navigateTo({
				url: '/pages/songList/songList?id='+item.id
			})
		},
	},
	onLoad() {
		this.loginInfo = uni.getStorageSync('loginInfo') || this.loginInfo
		if(this.loginInfo.profile){
			this.getData()
			this.getCount()
			this.getSheet()
			this.getDj()
			this.getFollow()
			this.getFans()
			this.getRecord()
		}		
	}
}
</script>

<style lang="scss" scoped>
.top{
	width: 100%;
	box-sizing: border-box;
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
	// background: #4A304A;
	padding: 30rpx 30rpx 50rpx;
	font-size: 32rpx;
	color: #FFFFFF;
}
.top-info{
	display: flex;
	align-items: center;
	.avatar{
		width: 70rpx;
		height: 70rpx;
		border-radius: 100%;
		margin-right: 20rpx;
	}
}
.gender{
	width: 20rpx;
	height: 40rpx;
	position: relative;
	margin: -20rpx 0rpx 0rpx 10rpx;
}
.topbut{
	margin-top: 60rpx;
	&-list{
		display: inline-block;
		width: 25%;
		text-align: center;
		font-size: 24rpx;
		color: #FFFFFF;
		&-icon{
			width: 50rpx;
			height: 50rpx;
			margin-bottom: 10rpx;
		}
	}
}
.con{
	background: #FFFFFF;
	position: relative;
	margin-top: -20rpx;
	border-radius: 16rpx 16rpx 0rpx 0rpx;
	padding: 30rpx;
}
.block{
	margin-bottom: 30rpx;
}
.title{
	display: flex;
	position: relative;
	width: 100%;
	font-size: 32rpx;
	color: #666666;
	&-text{
		margin-right: 30rpx;
	}
	&-text.title-text1{
		color: #333333;
		font-weight: bold;
	}
	&-more{
		// padding: 2rpx 30rpx;
		// border: 2rpx solid #999999;
		// border-radius: 30rpx;
		font-size: 28rpx;
		color: #999999;
		position: absolute;
		right: 0rpx;
	}
}
.add{
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 80rpx;
	box-sizing: border-box;
	border: 2rpx solid #666666;
	border-radius: 16rpx;
	font-size: 34rpx;
	color: #666666;
	margin-top: 30rpx;
	&-icon{
		width: 40rpx;
		height: 40rpx;
		margin-right: 20rpx;
	}
}
.addbox{
	width: 660rpx;
	box-sizing: border-box;
	padding: 40rpx 0rpx;
	background: #FFFFFF;
	border-radius: 8rpx;
	position: fixed;
	top: 40%;
	left: 45rpx;
	text-align: center;
	&-input{
		width: 600rpx;
		height: 60rpx;
		text-align: left;
		border: 2rpx solid #666666;
		border-radius: 8rpx;
		box-sizing: border-box;
		padding: 10rpx 20rpx;
		margin: 0rpx auto;
	}
	.private{
		display: flex;
		align-items: center;
		margin: 15rpx 0rpx 30rpx 30rpx;
	}
	&-check{
		display: inline-block;
		width: 20rpx;
		height: 20rpx;
		border-radius: 100%;
		border: 2rpx solid #666666;
	}
	&-check.addbox-check1{
		width: 24rpx;
		height: 24rpx;
		border-style: none;
	}
	&-text{
		display: inline-block;
		font-size: 28rpx;
		margin-left: 10rpx;
		color: #666666;
	}
	.addbox-but{
		display: flex;
		justify-content: center;
		view{
			padding: 10rpx 60rpx;
			border: 2rpx solid #666666;
			border-radius: 8rpx;
			font-size: 28rpx;
			color: #666666;
		}
		view:nth-last-child(1){
			background: $uni-color-success;
			border-color: $uni-color-success;
			color: #FFFFFF;
			margin-left: 50rpx;
		}
	}
}
.myrecord{
	// white-space: nowrap;
	// overflow-x: scroll;
}
</style>
