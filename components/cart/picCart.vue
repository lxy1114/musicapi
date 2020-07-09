<template>
	<view class="box">
		<view class="recomlist" v-for="(item,index) in list" :key="index">
			<image class="recomlist-img" :src="item.picUrl"></image>
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
	height: 330upx;
	font-size: 28upx;
	color: #333333;
	&-img{
		width: 100%;
		height: 207upx;
		margin-bottom: 10upx;
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
