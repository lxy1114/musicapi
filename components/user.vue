<template>
	<view class="user">
		<image class="user-avatar" :src="avatar" mode="aspectFill"></image>
		<view class="user-name">{{name}}</view>
		<image class="user-gender" :src="gender == 1 ? '/static/images/boy.svg' : '/static/images/girl.svg'" mode="widthFix"></image>
		<view class="user-but" :class="{'user-but1': followed}" @click="getFollow">{{followed ? '取消关注' : '关注'}}</view>
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
	margin-bottom: 30upx;
	font-size: 28upx;
	color: #333333;
	&-avatar{
		width: 70upx;
		height: 70upx;
		border-radius: 100%;
		margin-right: 20upx;
	}
	&-gender{
		width: 20upx;
		height: 40upx;
		position: relative;
		margin: -20upx 0upx 0upx 10upx;
	}
	&-but{
		width: 150upx;
		height: 40upx;
		line-height: 40upx;
		border-radius: 50upx;
		color: #d4237a;
		text-align: center;
		border: 2upx solid #d4237a;
		position: absolute;
		right: 0upx;
	}
	&-but.user-but1{
		color: #666666;
		border-color: #666666;
	}
}
</style>
