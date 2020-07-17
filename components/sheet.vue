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
	font-size: 28upx;
	color: #333333;
	margin-right: 30upx;
	&-img{
		width: 100%;
		height: 207upx;
		margin-bottom: 10upx;
	}
	&-text{
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
}
</style>
