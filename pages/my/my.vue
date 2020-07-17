<template>
	<view class="container">
		<view class="top" :style="'background-image: url('+loginInfo.profile.backgroundUrl+')'">
			<view class="top-info">
				<image class="avatar" :src="loginInfo.profile.avatarUrl || '/static/images/avatar.svg'" @click="login"></image>
				<view class="nickname">{{loginInfo.profile.nickname || '未登录'}}</view>
				<image class="gender" :src="loginInfo.profile.gender == 1 ? '/static/images/boy.svg' : '/static/images/girl.svg'" mode="widthFix"></image>
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
				<my-sheet v-for="(item,index) in sheetList" :key="index" :banner="item.coverImgUrl" :name="item.name" :ordered="item.ordered" v-if="sheetNav == 0 && !item.ordered || sheetNav == 1 && item.ordered" @click="getDelete(item)" @goList="goList(item)"></my-sheet>
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
					<my-record v-for="(item,index) in recordList" :key="index" :cover="item.song.al.picUrl" :name="item.song.name" @goPlay="goPlay(item,index)"></my-record>
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
	padding: 30upx 30upx 50upx;
	font-size: 32upx;
	color: #FFFFFF;
}
.top-info{
	display: flex;
	align-items: center;
	.avatar{
		width: 70upx;
		height: 70upx;
		border-radius: 100%;
		margin-right: 20upx;
	}
}
.gender{
	width: 20upx;
	height: 40upx;
	position: relative;
	margin: -20upx 0upx 0upx 10upx;
}
.topbut{
	margin-top: 60upx;
	&-list{
		display: inline-block;
		width: 25%;
		text-align: center;
		font-size: 24upx;
		color: #FFFFFF;
		&-icon{
			width: 50upx;
			height: 50upx;
			margin-bottom: 10upx;
		}
	}
}
.con{
	background: #FFFFFF;
	position: relative;
	margin-top: -20upx;
	border-radius: 16upx 16upx 0upx 0upx;
	padding: 30upx;
}
.block{
	margin-bottom: 30upx;
}
.title{
	display: flex;
	position: relative;
	width: 100%;
	font-size: 32upx;
	color: #666666;
	&-text{
		margin-right: 30upx;
	}
	&-text.title-text1{
		color: #333333;
		font-weight: bold;
	}
	&-more{
		// padding: 2upx 30upx;
		// border: 2upx solid #999999;
		// border-radius: 30upx;
		font-size: 28upx;
		color: #999999;
		position: absolute;
		right: 0upx;
	}
}
.add{
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 80upx;
	box-sizing: border-box;
	border: 2upx solid #666666;
	border-radius: 16upx;
	font-size: 34upx;
	color: #666666;
	margin-top: 30upx;
	&-icon{
		width: 40upx;
		height: 40upx;
		margin-right: 20upx;
	}
}
.addbox{
	width: 660upx;
	box-sizing: border-box;
	padding: 40upx 0upx;
	background: #FFFFFF;
	border-radius: 8upx;
	position: fixed;
	top: 40%;
	left: 45upx;
	text-align: center;
	&-input{
		width: 600upx;
		height: 60upx;
		text-align: left;
		border: 2upx solid #666666;
		border-radius: 8upx;
		box-sizing: border-box;
		padding: 10upx 20upx;
		margin: 0upx auto;
	}
	.private{
		display: flex;
		align-items: center;
		margin: 15upx 0upx 30upx 30upx;
	}
	&-check{
		display: inline-block;
		width: 20upx;
		height: 20upx;
		border-radius: 100%;
		border: 2upx solid #666666;
	}
	&-check.addbox-check1{
		width: 24upx;
		height: 24upx;
		border-style: none;
	}
	&-text{
		display: inline-block;
		font-size: 28upx;
		margin-left: 10upx;
		color: #666666;
	}
	.addbox-but{
		display: flex;
		justify-content: center;
		view{
			padding: 10upx 60upx;
			border: 2upx solid #666666;
			border-radius: 8upx;
			font-size: 28upx;
			color: #666666;
		}
		view:nth-last-child(1){
			background: $uni-color-success;
			border-color: $uni-color-success;
			color: #FFFFFF;
			margin-left: 50upx;
		}
	}
}
.myrecord{
	white-space: nowrap;
	overflow-x: scroll;
}
</style>
