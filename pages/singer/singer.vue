<template>
	<view class="container">
		<view class="nav">
			<view class="nav-title">类型</view>
			<view class="nav-text" :class="{'nav-text1': type == item.id}" v-for="(item,index) in typeList" :key="index" @click="navTab(item,'type')">{{item.text}}</view>
		</view>
		<view class="nav">
			<view class="nav-title">地区</view>
			<view class="nav-text" :class="{'nav-text1': area == item.id}" v-for="(item,index) in areaList" :key="index" @click="navTab(item,'area')">{{item.text}}</view>
		</view>
	</view>
</template>

<script>
import api from '@/api'
export default {
	data() {
		return {
			offset:2,
			list:[],
			typeList: [{text: '全部',id: '-1'},{text: '男歌手',id: '1'},{text: '女歌手',id: '2'},{text: '乐队',id: '3'}],
			areaList: [{text: '全部',id: '-1'},{text: '华语',id: '7'},{text: '欧美',id: '96'},{text: '日本',id: '8'},
						{text: '韩国',id: '16'},{text: '其他',id: '0'}],
			type: -1,
			area: -1
		}
	},
	components: {
		api
	},
	methods: {
		navTab(item,type) {
			this.type = type == 'type' ? item.id : this.type
			this.area = type == 'area' ? item.id : this.area
			this.offset = 1
			this.list = []
			this.getData()
		},
		getData() {
			api.singerCat({
				type: this.type,
				area: this.area,
				offset: this.offset*30
			}).then(res => {
				this.list = this.list.concat(res.artists)
			})
		},
	},
	onReachBottom() {
		this.offset ++
		this.getData()
	},
	onLoad() {
		this.getData()
	}
}
</script>

<style lang="scss" scoped>
.nav{
	padding: 0upx 30upx;
	&-title{
		display: inline-block;
		font-size: 32upx;
		color: #333333;
		margin: 0upx 30upx 10upx 0upx;
	}
	&-text{
		display: inline-block;
		font-size: 28upx;
		color: #666666;
		margin-right: 30upx;
	}
	&-text.nav-text1{
		color: $uni-text-color-system;
	}
}
</style>
