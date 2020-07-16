<template>
	<view class="singer">
		<image class="singer-avatar" :src="avatar || '/static/images/avatar.svg'" mode="aspectFill"></image>
		<view class="info">
			<view class="singer-name">{{name}}</view>
			<view class="text" v-if="albums">{{'专辑：'+albums}}</view>
			<view class="text" v-if="mv">{{'MV：'+mv}}</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		avatar: '',
		name: '',
		albums: Number,
		mv: Number
	},
	data() {
		return {
			
		}
	},
	methods: {
		
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
}
</style>
