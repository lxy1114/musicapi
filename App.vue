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
		margin: 0rpx;
		padding: 0rpx;
		outline: none;
	}
	uni-button:after{
		border-style: none;
	}
	.placeholder{
		font-size: 28rpx;
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
		left: 0rpx;
		top: 0rpx;
	}
	.placeholder{
		font-size: 24rpx;
	}
	.linetitle{
		font-size: 32rpx;
		line-height: 32rpx;
		color: #333333;
		font-weight: bold;
		margin-left: 20rpx;
		position: relative;
		margin-bottom: 40rpx;
	}
	.linetitle::before{
		content: '';
		display: block;
		width: 6rpx;
		height: 100%;
		border-radius: 10rpx;
		background: #617C77;
		position: absolute;
		top: 0rpx;
		left: -20rpx;
	}
</style>
