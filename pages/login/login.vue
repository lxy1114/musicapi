<template>
	<view class="container" :style="'height:'+height+'upx'">
		<view class="nav">
			<view class="nav-title" :class="{'nav-title1': navIndex == 0}" @click="navIndex = 0">手机号登录</view>
			<view class="nav-title" :class="{'nav-title1': navIndex == 1}" @click="navIndex = 1">邮箱登录</view>
		</view>
		<view class="list">
			<image class="list-icon" src="/static/images/user.svg" mode="widthFix"></image>
			<input class="list-input" v-model="phone" :placeholder="navIndex == 0 ? '请输入手机号' : '请输入邮箱'" placeholder-class="placeholder"/>
		</view>
		<view class="list">
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
			password: '',
			height: 0
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
		var system = uni.getSystemInfoSync()
		this.height = (system.windowHeight-system.windowTop)*2
	},
}
</script>

<style lang="scss" scoped>
.container{
	padding-top: 50%;
	background: $color-bg;
}
.nav{
	width: 60%;
	line-height: 60upx;
	margin: 0upx auto;
	background: #BAE2E0;
	border-radius: 6upx;
	margin-bottom: 100upx;
	&-title{
		display: inline-block;
		width: 50%;
		height: 100%;
		font-size: 32upx;
		color: #628280;
		text-align: center;
	}
	&-title.nav-title1{
		background: #8DB4B2;
		color: #E0F6F5;
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
		color: #628280;
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
.placeholder{
	color: #E0F6F5;
}
</style>
