<template>
	<view class="container">
		<audio-box :id="id"></audio-box>
	</view>
</template>

<script>
import audioBox from '@/components/audio/audio.vue'
export default {
	data() {
		return {
			id: ''
		}
	},
	components: {
		audioBox
	},
	methods: {
		
	},
	onLoad(e) {
		this.id = e.id
	}
}
</script>

<style lang="scss" scoped>

</style>
