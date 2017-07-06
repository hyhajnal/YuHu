var util = {
	nicknameGenerator: function() {
		var data = ["2", "4", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "k", "n", "m" ,"l"];
		var result = "";
		for (var i = 0; i < 8; i++) { //产生20位就使i<20
			r = Math.floor(Math.random() * 16); //16为数组里面数据的数量，目的是以此当下标取数组data里的值！ 
			result += data[r]; //输出20次随机数的同时，让rrr加20次，就是20位的随机字符串了。
		}
		return result;
	},
	getDate :function(){
		var date = new Date();
		var str = date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
		return str;
	},
	roomIdGenerator: function() {
		var data = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
		var result = "";
		for (var i = 0; i < 8; i++) { //产生20位就使i<20
			r = Math.floor(Math.random() * 10); //16为数组里面数据的数量，目的是以此当下标取数组data里的值！ 
			result += data[r]; //输出20次随机数的同时，让rrr加20次，就是20位的随机字符串了。
		}
		return parseInt(result);
	}
};
module.exports = util;