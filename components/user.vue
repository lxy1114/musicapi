<template>
	<view class="user" @click="goUser">
		<image class="user-avatar" :src="avatar" mode="aspectFill"></image>
		<view class="user-name">{{name}}</view>
		<image class="user-gender" :src="gender == 1 ? '/static/images/boy.svg' : '/static/images/girl.svg'" mode="widthFix"></image>
		<view class="user-but" :class="{'user-but1': followed}" @click.stop="getFollow">{{followed ? '取消关注' : '关注'}}</view>
	</view>
</template>

<script>
export default {
	props: {
		avatar: '',
		name: '',
		gender: Number,
		followed: Boolean
	},
	data() {
		return {
			
		}
	},
	methods: {
		getFollow() {
			this.$emit('getFollow')
		},
		goUser() {
			this.$emit('goUser')
		},
	},
	onLoad() {
		
	}
}
</script>

<style lang="scss" scoped>
.user{
	display: flex;
	align-items: center;
	position: relative;
	margin-bottom: 30rpx;
	font-size: 28rpx;
	color: #333333;
	&-avatar{
		width: 70rpx;
		height: 70rpx;
		border-radius: 100%;
		margin-right: 20rpx;
	}
	&-gender{
		width: 20rpx;
		height: 40rpx;
		position: relative;
		margin: -20rpx 0rpx 0rpx 10rpx;
	}
	&-but{
		width: 150rpx;
		height: 40rpx;
		line-height: 40rpx;
		border-radius: 50rpx;
		color: #d4237a;
		text-align: center;
		border: 2rpx solid #d4237a;
		position: absolute;
		right: 0rpx;
	}
	&-but.user-but1{
		color: #666666;
		border-color: #666666;
	}
}
</style>
