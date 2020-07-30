<template>
	<view class="sheet">
		<view class="list" v-for="(item,index) in list" :key="index" @click="goSheet(item)">
			<image class="list-cover" :src="item.coverImgUrl"></image>
			<view class="info">
				<view class="info-title">{{item.name}}</view>
				<view class="info-text">{{item.description}}</view>
				<view class="label">
					<view class="label-text" v-for="(items,index1) in item.tags" :key="index1">{{items}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		list: Array
	},
	data() {
		return {
			
		}
	},
	methods: {
		goSheet(item) {
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
.list{
	display: flex;
	align-items: center;
	position: relative;
	font-size: 32upx;
	color: #333333;
	margin-bottom: 30upx;
	&-cover{
		width: 150upx;
		height: 150upx;
		border-radius: 12upx;
	}
}
.info{
	width: 520upx;
	margin-left: 20upx;
	&-title{
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	&-text{
		font-size: 28upx;
		color: #666666;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-top: 10upx;
	}
}
.label{
	margin-top: 10upx;
	&-text{
		display: inline-block;
		padding: 2upx 10upx;
		border-radius: 8upx;
		background: #A5D6D4;
		font-size: 24upx;
		color: #ffffff;
		margin-right: 20upx;
	}
}
</style>
