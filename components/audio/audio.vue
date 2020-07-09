<template>
	<view class="box">
		
	</view>
</template>

<script>
export default {
	props: {
		id: ''
	},
	data() {
		return {
			
		}
	},
	methods: {
		
	},
	created() {
		var audio = uni.createInnerAudioContext()
		audio.src = 'https://music.163.com/song/media/outer/url?id='+this.id+'.mp3'
		audio.autoplay = true
	}
}
</script>

<style lang="scss" scoped>

</style>
