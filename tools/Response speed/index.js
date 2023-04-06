var startTime = new Date();
var endTime = new Date();
var startPressed = false;
var bgChangeStarted = false;
var maxWait = 20;
var timerID;
var colors = new Array("rgb(75, 219, 106)");
function tips_error(t) {
    $("#validate-loading").hide(),
    $("#validate-result").empty(),
    $("#validate-result").show(),
    $("#validate-result").html(t)
}
function tips_hide() {
    $("#validate-loading").hide(),
    $("#validate-result").empty(),
    $("#validate-result").hide()
}
function startTest() {
    $('#color-div').css({ "background-color": colors[Math.floor(Math.random() * colors.length)] });
    bgChangeStarted = true;
    startTime = new Date();
}

function stopTest() {
    if (bgChangeStarted) {
        $("#btn-start").attr("disabled", false);
        endTime = new Date();
        var responseTime = (endTime.getTime() - startTime.getTime());
        document.getElementById('time').innerHTML = responseTime + ' ms !';
        $('#color-div').css({ "background-color": "#ffffff00" });
        $('#tool-result').show();
        $('#tool-result').append("你的反应时间是: " + responseTime + " ms" + "<br/>");
        startPressed = false;
        bgChangeStarted = false;
        $("#btn-stop").attr("disabled", true);
    } else {
        if (!startPressed) {
            tips_error("请按'开始测试'键");
            $("#btn-start").attr("disabled", false);
        } else {
            clearTimeout(timerID);
            startPressed = false;
            document.getElementById('time').innerHTML = "太早了！别想预判我！" ;
            tips_error("可别作弊哦，颜色还没有开始变呢,请重新开始！");
            $("#btn-start").attr("disabled", false);
        }
    }
    document.getElementById('startTest').style.setProperty('display','block');
    document.getElementById('time').style.setProperty('display','block');
    document.getElementById('maintips').style.setProperty('display','none');
    document.getElementById('mainbackground').style.setProperty('background-color','rgb(43, 135, 209)');
}

var randMULTIPLIER = 0x015a4e35;
var randINCREMENT = 1;
var today = new Date();
var randSeed = today.getSeconds();

function randNumber() {
    randSeed = (randMULTIPLIER * randSeed + randINCREMENT) % (1 << 31);
    return ((randSeed >> 15) & 0x7fff) / 32767;
}

function start() {
    tips_hide();
    $("#btn-start").attr("disabled", true);
    $("#btn-stop").attr("disabled", false);
    if (startPressed) {
        tips_error("已经开始了，请变色后按停止测试！");
        return;
    } else {
        startPressed = true;
        timerID = setTimeout('startTest()', 6000 * randNumber());
    }
    document.getElementById('mainbackground').style.setProperty('background-color','rgb(206, 38, 54)');
    document.getElementById('maintips').style.setProperty('display','block');
    document.getElementById('startTest').style.setProperty('display','none');
    document.getElementById('time').style.setProperty('display','none');
    document.getElementById('maintips').innerHTML = '请等待背景颜色变为绿色' ;
}