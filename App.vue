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
	.mask{
		width: 100%;
		height: 100%;
		background: #000000;
		opacity: 0.5;
		position: fixed;
		left: 0upx;
		top: 0upx;
	}
	.placeholder{
		font-size: 24upx;
	}
	.linetitle{
		font-size: 32upx;
		line-height: 32upx;
		color: #333333;
		font-weight: bold;
		margin-left: 20upx;
		position: relative;
		margin-bottom: 40upx;
	}
	.linetitle::before{
		content: '';
		display: block;
		width: 6upx;
		height: 100%;
		border-radius: 10upx;
		background: #617C77;
		position: absolute;
		top: 0upx;
		left: -20upx;
	}
</style>
