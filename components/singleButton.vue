<template>
	<button class="button" @click="submit">{{title}}</button>
</template>

<script>
export default {
	props: {
		title: ''
	},
	data() {
		return {
			
		}
	},
	methods: {
		submit() {
			this.$emit('submit')
		},
	},
	created() {
		
	}
}
</script>

<style lang="scss" scoped>
.button{
	background: #91BAB8;
	color: #FFFFFF;
}
</style>
