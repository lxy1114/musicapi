<template>
	<view>
		<circle-progress :percent="percent"></circle-progress>
	</view>
</template>

<script>
import circleProgress from '@/components/circle.vue'
export default {
	data() {
		return {
			percent: 25
		}
	},
	components: {
		circleProgress
	},
	methods: {

	},
	onLoad() {
		// var timer = setInterval(() => {
		// 	this.percent += 3
		// 	// console.log(this.percent)
		// },1000)
	}
}
</script>

<style lang="scss" scoped>

</style>
