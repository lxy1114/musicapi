<template>
	<view class="record" @click="goPlay">
		<image class="cover" :src="cover" mode="aspectFill"></image>
		<view class="name">{{name}}</view>
	</view>
</template>

<script>
export default {
	props: {
		cover: '',
		name: '',
		id: ''
	},
	data() {
		return {
			
		}
	},
	methods: {
		goPlay() {
			this.$emit('goPlay')
		},
	},
	created() {
		
	}
}
</script>

<style lang="scss" scoped>
.record{
	display: inline-flex;
	align-items: center;
	width: 320upx;
	box-sizing: border-box;
	padding: 15upx 20upx;
	background: #F8F8F8;
	border-radius: 8upx;
	margin: 20upx 20upx 0upx 0upx;
	font-size: 28upx;
	color: #666666;
}
.cover{
	width: 70upx;
	height: 70upx;
	border: 16upx;
	margin-right: 20upx;
}
.name{
	width: 160upx;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>
