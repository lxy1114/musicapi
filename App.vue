<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	*{
		margin: 0upx;
		padding: 0upx;
		outline: none;
	}
	uni-button:after{
		border-style: none;
	}
	.placeholder{
		font-size: 28upx;
		color: #999999;
	}
	::-webkit-scrollbar {
	  width: 0;
	  height: 0;
	  color: transparent;
	}
</style>
