<template>
	<view class="container">
		<view class="nav">
			<view class="nav-title" :class="{'nav-title1': navIndex == 0}" @click="navIndex = 0">手机号登录</view>
			<view class="nav-title" :class="{'nav-title1': navIndex == 1}" @click="navIndex = 1">邮箱登录</view>
		</view>
		<view class="list">
			<!-- <view class="iconfont icon-zhanghaoguanli"></view> -->
			<image class="list-icon" src="/static/images/user.svg" mode="widthFix"></image>
			<input class="list-input" v-model="phone" :placeholder="navIndex == 0 ? '请输入手机号' : '请输入邮箱'" placeholder-class="placeholder"/>
		</view>
		<view class="list">
			<!-- <view class="iconfont icon-mima"></view> -->
			<image class="list-icon" src="/static/images/password.svg" mode="widthFix"></image>
			<input class="list-input" v-model="password" placeholder="请输入密码" placeholder-class="placeholder"/>
		</view>
		<view class="footer">
			<single-button title="登录" @submit="submit"></single-button>
		</view>
	</view>
</template>

<script>
import api from '@/api'
import singleButton from '@/components/singleButton.vue'
export default {
	data() {
		return {
			navIndex: 0,
			phone: '',
			password: ''
		}
	},
	components: {
		singleButton
	},
	methods: {
		submit() {
			if(this.navIndex == 0){
				this.phoneLogin()
			}else{
				this.mailLogin()
			}
		},
		phoneLogin() {
			api.phoneLogin({
				phone: this.phone,
				password: this.password
			}).then(res => {
				uni.setStorageSync('loginInfo',res)
				uni.navigateTo({
					url: '/pages/index/index'
				})
			})
		},
		mailLogin() {
			api.mailLogin({
				email: this.phone,
				password: this.password
			}).then(res => {
				uni.setStorageSync('loginInfo',res)
				uni.navigateTo({
					url: '/pages/index/index'
				})
			})
		},
	},
	onLoad() {
		
	},
}
</script>

<style lang="scss" scoped>
.container{
	margin-top: 50%;
}
.nav{
	width: 60%;
	line-height: 60upx;
	margin: 0upx auto;
	background: #F5F5F5;
	border-radius: 6upx;
	margin-bottom: 100upx;
	&-title{
		display: inline-block;
		width: 50%;
		font-size: 32upx;
		color: #333333;
		text-align: center;
	}
	&-title.nav-title1{
		background: $uni-bg-color-check;
		color: $uni-text-color-check;
	}
}
.list{
	display: flex;
	align-items: center;
	width: 630upx;
	height: 80upx;
	margin: 30upx auto 0upx;
	border-bottom: 2upx solid #EEEEEE;
	.iconfont{
		font-size: 44upx;
	}
	&-input{
		width: 80%;
		padding: 20upx;
	}
	&-icon{
		width: 44upx;
		height: 44upx;
	}
}
.footer{
	width: 690upx;
	margin: 100upx auto;
}
</style>
