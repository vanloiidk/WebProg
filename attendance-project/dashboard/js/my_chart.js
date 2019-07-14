let morningData = [63, 69, 65, 73, 71, 65, 73];
let afternoonData = [60, 57, 51, 62, 45, 59, 36];

window.onload = function () {

	getTotalStudent();
	getChartData();

};
function getDataPoints(data) {
	let dataPoints = [];
	let today = new Date();
	let weekday = today.getDay();

	for(let i = 1; i <= weekday; i++) {
		let day = new Date();
		day.setDate(day.getDate() - i);
		let obj = {
			x: new Date(day.getFullYear(), day.getMonth(), day.getDate()),
			y: data[i]
		};
		dataPoints.unshift(obj);
	}

	for(let i = weekday; i <= 6; i++) {
		let day = new Date();


		day.setDate(day.getDate() + i - weekday);

		let obj = {
			x: new Date(day.getFullYear(), day.getMonth(), day.getDate()),
		};
		dataPoints.push(obj);
	}

	return dataPoints;
}

function initChart() {

	var options = {
		animationEnabled: true,
		theme: "light2",
		title:{
			text: "Attendance for last week"
		},
		axisX:{
			valueFormatString: "DDD"
		},
		axisY: {
			title: "Total Attendance",
			minimum: 5
		},
		toolTip:{
			shared:true
		},
		legend:{
			cursor:"pointer",
			verticalAlign: "bottom",
			horizontalAlign: "left",
			dockInsidePlotArea: true,
			itemclick: toogleDataSeries
		},
		data: [{
			type: "line",
			showInLegend: true,
			name: "Morning",
			markerType: "square",
			xValueFormatString: "DD MMM, YYYY",
			color: "#F08080",
			dataPoints: getDataPoints(morningData)
		},
			{
				type: "line",
				showInLegend: true,
				name: "Afternoon",
				lineDashType: "dash",
				dataPoints: getDataPoints(afternoonData)
			}]
	};
	$("#chartContainer").CanvasJSChart(options);

	function toogleDataSeries(e){
		if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		} else{
			e.dataSeries.visible = true;
		}
		e.chart.render();
	}
}




function setTotalStudent(count){
	let totalEl = document.getElementById("totalStudent");
	totalEl.innerText = count;
}





function getDate() {
	let date = new Date();
	let today = date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear()
	document.getElementsByTagName("h2")[0].innerText = today;

}
function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	console.log(ca);
	for(var i = 0; i <ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}
function getChartData() {
	let date = new Date();
	let today = date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear()
	let weekday = date.getDay();
	let arr = today.split("-");
	let date_arr = [];
	for(let i = weekday; i >= 1; i--) {
		arr[2] = arr[2]-i;
		let str = arr[0]+"-"+arr[1]+"-"+arr[2];
		date_arr.push(str);
	}
	getDateData(date_arr);


}

function getDateData(date_arr) {
	let obj = {
		"date_arr":date_arr,
		"class_id":getCookie("class_id")
	}
	let jsondata= JSON.stringify(obj);
	let request = new XMLHttpRequest()
	request.onreadystatechange = function () {
		if (this.readyState==4&&this.status==200){
			let objs = JSON.parse(this.responseText);
				for (let i = 0 ; i< date_arr.length;i++){
					morningData[i]=objs[date_arr[i]][0].number;
					afternoonData[i]=objs[date_arr[i]][0].number;

				}
				initChart();

			/*
            * obj like
            * {
            * "morning": 60,
            * "afternoon":60,
            * "evening": 70
            * }
            *
            * */
		}
	}

	request.open('POST',`../../php/attendance/chartReport.php`);
	request.send(jsondata);
}

function getTotalStudent(){
	let class_id = getCookie("class_id");
	let request = new XMLHttpRequest();
	request.onreadystatechange = function(){
		if(this.readyState==4&&this.status==200){
			let obj = JSON.parse(this.responseText);
			setTotalStudent(obj.total);
		}
	}

	request.open('GET',`../../php/students/student_countWithClass.php?class_id=${class_id}`,true);
	request.send();
}