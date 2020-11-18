<template>
	<view class="albums" @click="goAlbums">
		<image class="albums-banner" :src="picUrl" mode="aspectFill"></image>
		<view class="albums-label">
			<view class="albums-label-text">{{name}}</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		picUrl: '',
		name: ''
	},
	data() {
		return {
			
		}
	},
	methods: {
		goAlbums() {
			this.$emit('goAlbums')
		},
	},
	created() {
		
	}
}
</script>

<style lang="scss" scoped>
.albums{
	display: inline-block;
	width: 210rpx;
	height: 210rpx;
	border-radius: 4rpx;
	position: relative;
	margin: 0rpx 30rpx 30rpx 0rpx;
	&-banner{
		width: 100%;
		height: 100%;
		border-radius: 4rpx;
	}
	&-label{
		width: 100%;
		height: 40rpx;
		line-height: 40rpx;
		background: rgba(0,0,0,0.5);
		position: absolute;
		bottom: 0rpx;
		left: 0rpx;
		text-align: center;
		&-text{
			font-size: 24rpx;
			color: #FFFFFF;
			opacity: 1;
			max-width: 80%;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			margin: 0rpx auto;
		}
	}
}
.albums:nth-child(3n){
	margin-right: 0rpx;
}
</style>
