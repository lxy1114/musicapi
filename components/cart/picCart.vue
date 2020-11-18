<template>
	<view class="box">
		<view class="recomlist" v-for="(item,index) in list" :key="index" @click="goList(item)">
			<image class="recomlist-img" :src="item.picUrl || item.coverImgUrl"></image>
			<view class="recomlist-text">{{item.name}}</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		list: Array
	},
	methods: {
		goList(item) {
			uni.setStorageSync('sheetDetail',item)
			uni.navigateTo({
				url: '/pages/songList/songList?id='+item.id
			})
		},
	},
	created() {
		
	}
}
</script>

<style lang="scss" scoped>
.box{
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	flex-wrap: wrap;
}
.recomlist{
	width: 30%;
	height: 330rpx;
	font-size: 28rpx;
	color: #333333;
	&-img{
		width: 100%;
		height: 207rpx;
		margin-bottom: 10rpx;
	}
	&-text{
		overflow : hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
}
</style>
