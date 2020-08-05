<template>
	<view>
		<canvas style="width: 300px; height: 200px;" canvas-id="myCanvas" id="myCanvas"></canvas>
	</view>
</template>

<script>
export default {
	props: {
		percent: Number
	},
	data() {
		return {
			
		}
	},
	watch: {
		percent() {
			this.setCanvas()
		},
	},
	methods: {
		setCanvas() {
			var circle = this.percent/50-0.5
			const ctx = uni.createCanvasContext('myCanvas')
			
			ctx.arc(13, 13, 13, 0, 2 * Math.PI)
			ctx.setFillStyle('#EEEEEE')
			ctx.fill()
			
			ctx.beginPath()
			ctx.arc(13, 13, 12, 0, 2 * Math.PI)
			ctx.setFillStyle('#FFFFFF')
			ctx.fill()
			
			ctx.beginPath()
			ctx.arc(13, 13, 13, -0.5 * Math.PI, circle * Math.PI)
			ctx.setStrokeStyle('red')
			ctx.stroke()
			
			// ctx.beginPath()
			// ctx.arc(25, 25, 49, -0.5 * Math.PI, circle * Math.PI)
			// ctx.setStrokeStyle('red')
			// ctx.stroke()
			
			// Draw arc
			// ctx.beginPath()
			// ctx.arc(10, 10, 40, 0, 1.5 * Math.PI)
			// ctx.setStrokeStyle('#FFFFFF')
			// ctx.stroke()
			
			ctx.draw()
		},
	},
	mounted() {
		this.setCanvas()
	}
}
</script>

<style lang="scss" scoped>

</style>
