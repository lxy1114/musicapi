<template>
	<view class="box">
		<view class="songlist" v-for="(item,index) in list" :key="index" @click="goPlay(item)">
			<image class="songlist-img" :src="item.album.picUrl" mode="aspectFill"></image>
			<view class="info">
				<view class="info-title">{{item.album.name}}</view>
				<view class="info-text">{{item.album.artists[0].name}}</view>
			</view>
			<view class="right">
				<view class="iconfont icon-gengduo"></view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		list: Array
	},
	methods: {
		goPlay(item) {
			uni.navigateTo({
				url: '/pages/play/play?id='+item.id
			})
		},
	},
	created() {
		
	}
}
</script>

<style lang="scss" scoped>
.songlist{
	display: flex;
	align-items: center;
	margin-bottom: 30upx;
	position: relative;
	&-img{
		width: 64upx;
		height: 64upx;
		border-radius: 8upx;
	}
}
.info{
	font-size: 28upx;
	color: #333333;
	margin-left: 20upx;
	&-text{
		font-size: 24upx;
		color: #999999;
	}
}
.right{
	position: absolute;
	right: 0upx;
}
</style>
