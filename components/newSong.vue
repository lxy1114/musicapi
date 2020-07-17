<template>
	<view class="song" @click="goPlay">
		<image class="song-banner" :src="cover" mode="aspectFill"></image>
		<view class="info">
			<view class="title">{{title}}</view>
			<view class="name">
				<view class="name-text" v-for="(item,index) in name" :key="index">{{item.name}}{{index != name.length-1 ? '、' : ''}}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		cover: '',
		title: '',
		name: Array
	},
	methods: {
		goPlay() {
			this.$emit('goPlay')
		},
	},
}
</script>

<style lang="scss" scoped>
.song{
	display: inline-flex;
	align-items: center;
	justify-content: space-between;
	width: 48%;
	margin-bottom: 30upx;
	&-banner{
		width: 80upx;
		height: 80upx;
		border-radius: 8upx;
	}
}
.info{
	width: 230upx;
	font-size: 28upx;
	color: #333333;
	.title,.name{
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.name{
		font-size: 24upx;
		color: #999999;
		&-text{
			display: inline-block;
		}
	}
}
</style>
