var dDanmaku = document.getElementById("danmaku");

function createDanmaku() {
    var d = document.createElement("div");
    d.className = "danmaku";
    d.style.left = '300px';
    d.style.top = '100px';
    dDanmaku.appendChild(d);
}

// 弹幕的创建与运动
var x = 300;
var y = 100;
var r = 0;
var deg = 0; //代表转过的弧度
var dDanmaku = document.getElementById("danmaku"); //通过概率来限制弹幕的创建与游戏难度
//弹幕运动
function danmakuMove() {
    // 1. 弹幕的创建
    createDanmaku();
    // 2. 弹幕的运动
    var es = dDanmaku.children;
    for (var i = 0; i < es.length; i++) {
        var e = es[i];
        if (e.offsetTop > sh - 30 || e.offsetLeft > sw || e.offsetLeft < 0) {
            // 飞出了屏幕，需要删掉
            dDanmaku.removeChild(e);
            i--;
            continue;
        }
        e.style.top = e.offsetTop + 8 + 'px';
    }
}