<template>
	<view class="container">
		<pic-cart :list="list"></pic-cart>
	</view>
</template>

<script>
import api from '@/api'
import picCart from '@/components/cart/picCart.vue'
export default {
	data() {
		return {
			name: '',
			list: []
		}
	},
	components: {
		picCart
	},
	methods: {
		getSelectSheet() {
			api.selectSheet({
				cat: this.name
			}).then(res => {
				this.list = res.playlists
			})
		},
	},
	onLoad(e) {
		console.log(e)
		this.name = e.name ? e.name : ''
		this.getSelectSheet()
	}
}
</script>

<style lang="scss" scoped>
.container{
	padding: 30upx;
}
</style>
