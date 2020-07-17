<template>
	<view class="box">
		<view class="songlist" @click="goPlay(index)">
			<image class="songlist-img" :src="picUrl" mode="aspectFill"></image>
			<view class="info">
				<view class="info-title">{{title}}</view>
				<view class="info-text">
					<view class="info-text-name" v-for="(item,index) in name" :key="index">{{item.name}}{{index != name.length-1 ? '、' : ''}}</view>
				</view>
			</view>
			<view class="right">
				<!-- <view class="iconfont icon-gengduo"></view> -->
				<image class="right-icon" src="/static/images/more-1.svg" mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		list: Array,
		picUrl: '',
		title: '',
		name: Array,
		index: Number
	},
	methods: {
		goPlay(index) {
			uni.setStorageSync('songList',JSON.stringify(this.list))
			uni.navigateTo({
				url: '/pages/play/play?index='+this.index
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
	width: 500upx;
	font-size: 28upx;
	color: #333333;
	margin-left: 20upx;
	&-text{
		display: inline-block;
		width: 100%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: 24upx;
		color: #999999;
		&-name{
			display: inline-block;
		}
	}
}
.right{
	position: absolute;
	right: 0upx;
	&-icon{
		width: 40upx;
		height: 4upx;
	}
}
</style>
