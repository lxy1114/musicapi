<template>
	<view class="singer" @click="goSinger">
		<image class="singer-avatar" :src="avatar || '/static/images/avatar.svg'" mode="aspectFill"></image>
		<view class="info">
			<view class="singer-name">{{name}}</view>
			<view class="text" v-if="albums">{{'专辑：'+albums}}</view>
			<view class="text" v-if="mv">{{'MV：'+mv}}</view>
			<view class="text" v-if="music">{{'歌曲：'+music}}</view>
		</view>
		<view class="singer-but" :class="{'singer-but1': followed}" @click.stop="getFollow">{{followed ? '取消关注' : '关注'}}</view>
	</view>
</template>

<script>
export default {
	props: {
		avatar: '',
		name: '',
		albums: Number,
		mv: Number,
		music: Number,
		followed: Boolean
	},
	data() {
		return {
			
		}
	},
	methods: {
		goSinger() {
			this.$emit('goSinger')
		},
		getFollow() {
			this.$emit('getFollow')
		},
	},
	onLoad() {
		
	}
}
</script>

<style lang="scss" scoped>
.singer{
	display: flex;
	align-items: center;
	margin-bottom: 30rpx;
	font-size: 28rpx;
	color: #333333;
	position: relative;
	&-avatar{
		width: 70rpx;
		height: 70rpx;
		border-radius: 100%;
		margin-right: 20rpx;
	}
	.text{
		display: inline-block;
		margin-right: 20rpx;
		font-size: 24rpx;
		color: #999999;
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
	&-but.singer-but1{
		color: #999999;
		border-color: #999999;
	}
}
</style>
