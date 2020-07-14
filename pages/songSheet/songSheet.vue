<template>
	<view class="container">
		<view class="top">
			<view class="top-nav" v-for="(item,index) in tags" :key="index">{{item.name}}</view>
			<view class="top-more">
				<view class="iconfont icon-gengduo1"></view>
			</view>
		</view>
	</view>
</template>

<script>
import api from '@/api'
export default {
	data() {
		return {
			catList: [],
			sub: [],
			tags: [{name: '推荐'}]
		}
	},
	methods: {
		getCatlist() {
			api.catList().then(res => {
				this.catList = res.categories
				this.sub = res.sub
			})
		},
		getHotCat() {
			api.hotcat().then(res => {
				this.tags = this.tags.concat(res.tags)
				// this.getSelectSheet(res.tags[0].name)			
			})
		},
		getRecommend() {
			api.recommendSheet().then(res => {
				console.log(res,55555)
			})
		},
		getSelectSheet(name) {
			api.selectSheet({
				cat: name
			}).then(res => {
				console.log(res,99999)
				this.getSheetDetail(res.playlists[0].id)
			})
		},
		getSheetDetail(id) {
			api.sheetDetail({
				id: id
			}).then(res => {
				
			})
		},
	},
	onLoad() {
		this.getCatlist()
		this.getHotCat()
		this.getRecommend()
	}
}
</script>

<style lang="scss" scoped>
.top{
	line-height: 70upx;
	border-bottom: 2upx solid #EEEEEE;
	white-space: nowrap;
	overflow-x: scroll;
	padding-right: 60upx;
	&-nav{
		display: inline-block;
		padding: 0upx 30upx;
		font-size: 28upx;
		color: #333333;
		text-align: center;
	}
	&-more{
		width: 60upx;
		height: 70upx;
		background: #FFFFFF;
		position: fixed;
		top: 90upx;
		right: 0upx;
		text-align: center;
	}
}
</style>
