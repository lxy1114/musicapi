export default {
	setNumber(number) {
		if(number == 0){
			return '00:00'
		}
		var minute = number.split(':')[0]
		var second = number.split(':')[1]
		minute = this.setDigit(minute)
		second = this.setDigit(second)
		var result = minute+':'+second
		return result
	},
	setDigit(value) {
		value = typeof value == 'string' ? value : String(value)
		if(value.length == 1){
			value = '0'+value
		}
		return value
	},
}