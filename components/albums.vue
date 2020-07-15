<template>
	<view class="albums">
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
		
	},
	created() {
		
	}
}
</script>

<style lang="scss" scoped>
.albums{
	display: inline-block;
	width: 210upx;
	height: 210upx;
	border-radius: 4upx;
	position: relative;
	margin: 0upx 30upx 30upx 0upx;
	&-banner{
		width: 100%;
		height: 100%;
		border-radius: 4upx;
	}
	&-label{
		width: 100%;
		height: 40upx;
		line-height: 40upx;
		background: rgba(0,0,0,0.5);
		position: absolute;
		bottom: 0upx;
		left: 0upx;
		text-align: center;
		&-text{
			font-size: 24upx;
			color: #FFFFFF;
			opacity: 1;
			max-width: 80%;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			margin: 0upx auto;
		}
	}
}
.albums:nth-child(3n){
	margin-right: 0upx;
}
</style>
