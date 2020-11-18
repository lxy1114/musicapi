<template>
	<view class="container">
		<view class="con">
			<song-list 
				v-for="(item,index) in list" 
				:key="index" 
				:list="list" 
				:picUrl="item.album.picUrl" 
				:title="item.name" 
				:name="item.artists" 
				:index="index" 
				@getDetail="getDetail(item)">
			</song-list>
		</view>
		<view class="mask" v-if="popupShow" @click="popupShow = false"></view>
		<song-popup :data="popupData" v-if="popupShow" @getHide="getHide"></song-popup>
	</view>
</template>

<script>
import api from '@/api'
import songList from '@/components/list/songList.vue'
import songPopup from '@/components/popup/song.vue'
export default {
	data() {
		return {
			id: '',
			list: [],
			popupShow: false,
			popupData: {}
		}
	},
	components: {
		songList,
		songPopup
	},
	methods: {
		getData() {
			api.alikeSong({
				id: this.id
			}).then(res => {
				this.list = res.songs
			})
		},
		getDetail(item) {
			this.popupData = item
			this.popupShow = true
		},
		getHide() {
			this.popupShow = false
		},
	},
	onLoad(e) {
		this.id = e.id || ''
		this.getData()
	}
}
</script>

<style lang="scss" scoped>
.con{
	padding: 30rpx;
}
</style>
