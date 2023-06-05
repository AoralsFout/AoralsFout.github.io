var bigMonth = [1, 3, 5, 7, 8, 10, 12]; //大月数组
var smallMonth = [4, 6, 9, 11]; //小月数组

//计算今年已过比例 精度:一小时
function getYearPer() {
    var date = new Date();
    var year = date.getFullYear(); //今年
    var month = date.getMonth() + 1; //本月
    var bigMonths = []; //大月已过数组
    var smallMonths = []; //小月已过数组
    var months = []; //月份数组
    var February; //二月的天数
    var fullYearHours; //全年小时数
    for (var i = 0; i < month; i++) { //生成月份数组
        months[i] = i + 1;
    }
    for (var i = 0; i <= bigMonth.length; i++) { //生成已过大月(31天)数组
        if (bigMonth[i] < month) {
            bigMonths[bigMonths.length] = bigMonth[i];
        }
    }
    for (var i = 0; i < smallMonth.length; i++) { //生成已过小月(30天)数组
        if (smallMonth[i] <= month) {
            smallMonths[smallMonths.length] = smallMonth[i];
        }
    }
    var yearHours = ((bigMonths.length) * 31 * 24) + ((smallMonths.length) * 30 * 24); //计算今年过去多少小时 公式:大月*大月天数*24小时+小月*小月天数*24小时
    if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) { //判断闰年平年,计算二月份的天数和一年的小时数
        February = 29;
        fullYearHours = 366 * 24;
    } else {
        February = 28;
        fullYearHours = 365 * 24;
    }
    if (months.length >= 2) {
        var yearHours = yearHours + (February * 24); //加上二月的小时数
    }
    var yearPer = yearHours / fullYearHours; //计算今年已过比例
    return yearPer;
}

//计算本月已过比例 精度:一分钟
function getMonthPer() {
    var date = new Date();
    var monthPer;
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
        February = 29;
    } else {
        February = 28;
    }
    if (month = 2) { //计算本月已过比例 公式:((当前日-1)*24*60 + 当前小时*60 + 当前分钟)/(当前月天数*24*60)
        monthPer = (((day - 1) * 24 * 60) + (date.getHours() * 60) + date.getMinutes()) / (February * 24 * 60); //判断为2月
    } else if (bigMonth.indexOf(month) == 1) {
        monthPer = (((day - 1) * 24 * 60) + (date.getHours() * 60) + date.getMinutes()) / (31 * 24 * 60); //判断为大月
    } else {
        monthPer = (((day - 1) * 24 * 60) + (date.getHours() * 60) + date.getMinutes()) / (30 * 24 * 60); //判断为小月
    }
    return monthPer;
}

//计算今日已过比例 精度:一秒
//公式: (当前小时*60*60 + 当前分钟*60 + 当前秒)/(24*60*60)
function getDayPer() {
    var date = new Date();
    return ((date.getHours() * 60 * 60) + (date.getMinutes() * 60) + date.getSeconds()) / (24 * 60 * 60);
}

function RunningNum(startNum, endNum, numBox) { //数字递增,支持小数
    var step = (endNum - startNum) / 200; //分出小数
    var count = startNum;
    var timer = setInterval(() => {
        count = count + step;
        if (count >= endNum) {
            clearInterval(timer);
            count = endNum;
        }
        document.getElementById(numBox).innerHTML = count.toFixed(2) + "%" //保留两位小数
    }, 15);
}

RunningNum(0, Math.round(getYearPer() * 100 * 100) / 100, "pYearProgress");
RunningNum(0, Math.round(getMonthPer() * 100 * 100) / 100, "pMonthProgress");
RunningNum(0, Math.round(getDayPer() * 100 * 100) / 100, "pDayProgress");

document.getElementById("yearProgress").setAttribute("style", "--progress: " + getYearPer() * 100 + "%");
document.getElementById("monthProgress").setAttribute("style", "--progress: " + getMonthPer() * 100 + "%");
document.getElementById("dayProgress").setAttribute("style", "--progress: " + getDayPer() * 100 + "%");

function changeYearPer() {
    document.getElementById("yearProgress").setAttribute("style", "--progress: " + getYearPer() * 100 + "%");
    document.getElementById("pYearProgress").innerHTML = Math.round(getYearPer() * 100 * 100) / 100 + "%";
}

function changeMonthPer() {
    document.getElementById("monthProgress").setAttribute("style", "--progress: " + getMonthPer() * 100 + "%");
    document.getElementById("pMonthProgress").innerHTML = Math.round(getMonthPer() * 100 * 100) / 100 + "%";
}

function changeDayPer() {
    document.getElementById("dayProgress").setAttribute("style", "--progress: " + getDayPer() * 100 + "%");
    document.getElementById("pDayProgress").innerHTML = Math.round(getDayPer() * 100 * 100) / 100 + "%";
}

setInterval('changeYearPer()', 21600000); //六小时更改一次本年剩余
setInterval('changeMonthPer()', 600000); //十分钟更改一次本月剩余
setInterval('changeDayPer()', 5000); //五秒更改一次本日剩余