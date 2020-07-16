<template>
	<view class="sheet">
		<image class="sheet-banner" :src="banner"></image>
		<view class="sheet-name">{{name}}</view>
		<view class="sheet-but" @click="click">{{ordered ? '取消收藏' : '删除'}}</view>
	</view>
</template>

<script>
export default {
	props: {
		banner: '',
		name: '',
		id: '',
		ordered: Boolean
	},
	data() {
		return {
			
		}
	},
	methods: {
		click() {
			this.$emit('click')
		},
	},
	onLoad() {
		
	}
}
</script>

<style lang="scss" scoped>
.sheet{
	display: flex;
	align-items: center;
	margin-top: 30upx;
	font-size: 28upx;
	color: #333333;
	position: relative;
	&-banner{
		width: 70upx;
		height: 70upx;
		border-radius: 8upx;
		margin-right: 20upx;
	}
	&-name{
		width: 400upx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	&-but{
		width: 150upx;
		height: 40upx;
		line-height: 40upx;
		border: 2upx solid #d4237a;
		border-radius: 8upx;
		font-size: 28upx;
		color: #d4237a;
		text-align: center;
		position: absolute;
		right: 0upx;
	}
}
</style>
