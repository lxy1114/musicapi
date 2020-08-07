<template>
	<view class="container">
		<line-nav :list="navList" @navTab="navTab"></line-nav>
		<view class="menu" v-if="navIndex == 0 || navIndex == 1">
			<view class="menu-title">地区</view>
			<view class="menu-text" :class="{'menu-text1': area == item }" v-for="(item,index) in areaList" :key="index" @click="getMenu(item,'area')">{{item}}</view>
		</view>
		<view class="menu" v-if="navIndex == 0">
			<view class="menu-title">类型</view>
			<view class="menu-text" :class="{'menu-text1': type == item }" v-for="(item,index) in typeList" :key="index" @click="getMenu(item,'area')">{{item}}</view>
		</view>
		<view class="menu" v-if="navIndex == 0">
			<view class="menu-title">排序</view>
			<view class="menu-text" :class="{'menu-text1': order == item }" v-for="(item,index) in orderList" :key="index" @click="getMenu(item,'area')">{{item}}</view>
		</view>
		<view class="con">
			<mv-block v-for="(item,index) in allList" :key="index" :picUrl="item.cover" :name="item.name" :duration="item.duration" @goVideo="goVideo(item,index)" v-if="navIndex == 0"></mv-block>
			<mv-block v-for="(item,index) in newList" :key="index" :picUrl="item.cover" :name="item.name" :duration="item.duration" @goVideo="goVideo(item,index)" v-if="navIndex == 1"></mv-block>
			<mv-block v-for="(item,index) in recomList" :key="index" :picUrl="item.picUrl" :name="item.name" :duration="item.duration" @goVideo="goVideo(item,index)" v-if="navIndex == 2"></mv-block>
			<mv-block v-for="(item,index) in offList" :key="index" :picUrl="item.cover" :name="item.name" :duration="item.duration" @goVideo="goVideo(item,index)" v-if="navIndex == 3"></mv-block>
		</view>
	</view>
</template>

<script>
import api from '@/api'
import lineNav from '@/components/lineNav.vue'
import mvBlock from '@/components/mvBlock.vue'

export default {
	data() {
		return {
			navList: [{text: '全部'},{text: '最新'},{text: '推荐'},{text: '官方'}],
			areaList: ['全部','内地','港台','欧美','日本','韩国'],
			area: '全部',
			typeList: ['全部','官方版','原生','现场版','网易出品'],
			type: '全部',
			orderList: ['上升最快','最热','最新'],
			order: '上升最快',
			offset: 1,
			navIndex: 0,
			allList: [],
			newList: [],
			recomList: [],
			offList: []
		}
	},
	components: {
		lineNav,
		mvBlock
	},
	methods: {
		navTab(data) {
			this.navIndex = data.index
			if(this.navIndex == 1 || this.navIndex == 2) return
			this.offset = 1
			if(this.navIndex == 0){
				this.allList = []
				this.getAll()
			}else{
				this.offList = []
				this.getWy()
			}
		},
		getAll() {
			api.allMV({
				area: this.area,
				type: this.type,
				order: this.order,
				limit: 30,
				offset: this.offset*30-30
			}).then(res => {
				this.allList = this.allList.concat(res.data)
			})
		},
		getNew() {
			api.newMV({
				area: this.area
			}).then(res => {
				this.newList = res.data
			})
		},
		getRecommed() {
			api.recommendMV().then(res => {
				this.recomList = res.result
			})
		},
		getWy() {
			api.officialMV({
				limit: 30,
				offset: this.offset*30-30
			}).then(res => {
				this.offList = this.offList.concat(res.data)
			})
		},
		getMenu(item,type){
			this.area = type == 'area' ? item : this.area
			this.type = type == 'type' ? item : this.type
			this.order = type == 'order' ? item : this.order
			if(this.navIndex == 0){
				this.getAll()
			}else{
				this.getNew()
			}
		},
		goVideo(item,index) {
			var list = this.index == 0 ? this.allList : this.navIndex == 1 ? this.newList : this.navIndex == 2 ? this.recomList : this.offList
			uni.setStorageSync('mvList',JSON.stringify(list))
			uni.navigateTo({
				url: '/pages/videoPlay/videoPlay?id='+item.id+'&type=mv'
			})
		},
	},
	onReachBottom() {
		if(this.navIndex == 1 || this.navIndex == 2) return
		this.offset ++
		if(this.navIndex == 0){
			this.getAll()
		}else{
			this.getWy()
		}	
	},
	onLoad() {
		this.getAll()
		this.getNew()
		this.getRecommed()
		this.getWy()
	}
}
</script>

<style lang="scss" scoped>
.menu{
	display: flex;
	align-items: center;
	padding: 15upx 30upx;
	font-size: 28upx;
	color: #333333;
	&-title{
		font-weight: bold;
		margin-right: 30upx;
	}
	&-text{
		padding: 2upx 15upx;
		text-align: center;
	}
	&-text.menu-text1{
		background: $color-bg;
		color: #ffffff;
		border-radius: 30upx;
	}
}
.con{
	padding: 30upx;
}
</style>
