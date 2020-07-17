<template>
	<view class="singer" @click="goDetail">
		<image class="singer-avatar" :src="avatar || '/static/images/avatar.svg'" mode="aspectFill"></image>
		<view class="info">
			<view class="singer-name">{{name}}</view>
			<view class="text" v-if="albums">{{'专辑：'+albums}}</view>
			<view class="text" v-if="mv">{{'MV：'+mv}}</view>
			<view class="text" v-if="music">{{'歌曲：'+music}}</view>
		</view>
		<view class="singer-but" @click.stop="getFollow">{{followed ? '取消关注' : '关注'}}</view>
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
		goDetail() {
			this.$emit('goDetail')
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
	margin-bottom: 30upx;
	font-size: 28upx;
	color: #333333;
	position: relative;
	&-avatar{
		width: 70upx;
		height: 70upx;
		border-radius: 100%;
		margin-right: 20upx;
	}
	.text{
		display: inline-block;
		margin-right: 20upx;
		font-size: 24upx;
		color: #999999;
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
}
</style>
