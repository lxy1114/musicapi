<template>
	<view class="recomlist" @click="goSongList">
		<image class="recomlist-img" :src="picUrl" mode="aspectFill"></image>
		<view class="recomlist-text">{{name}}</view>
	</view>
</template>

<script>
export default {
	props: {
		picUrl: '',
		name: ''
	},
	methods: {
		goSongList(item) {
			this.$emit('goSongList')
		},
	},
	created() {
		
	}
}
</script>

<style lang="scss" scoped>
.recomlist{
	display: inline-block;
	width: 30%;
	font-size: 28rpx;
	color: #333333;
	margin-right: 30rpx;
	&-img{
		width: 100%;
		height: 207rpx;
		margin-bottom: 10rpx;
	}
	&-text{
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
}
</style>
