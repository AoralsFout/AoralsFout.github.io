var smallBox = document.getElementById("smallBox");
// 初始化变量
var speed = 5;
var numberOfDanmaku = 0;
// 控制(上,左,下,右,弹幕)
var dir = [false, false, false, false, false];
// 设置定时器控制元素全方位移动
setInterval(function() {
    // 向左
    if (dir[3]) {
        if (smallBox.offsetLeft <= 0) {
            smallBox.offsetLeft = 0;
        } else {
            smallBox.style.left = smallBox.offsetLeft - speed + 'px';
            console.log('向左移动' + speed + 'px')
        }
    } else
    // 向右
    if (dir[1]) {
        if (smallBox.offsetLeft >= 586) {
            smallBox.offsetLeft = 586;
        } else {
            smallBox.style.left = smallBox.offsetLeft + speed + 'px';
            console.log('向右移动' + speed + 'px')
        }
    }
    // 向上
    if (dir[0]) {
        if (smallBox.offsetTop <= 0) {
            smallBox.offsetTop = 5
        } else {
            smallBox.style.top = smallBox.offsetTop - speed + 'px';
            console.log('向上移动' + speed + 'px')
        }
    }
    // 向下
    if (dir[2]) {
        if (smallBox.offsetTop >= 586) {
            smallBox.offsetTop = 586;
        } else {
            smallBox.style.top = smallBox.offsetTop + speed + 'px';
            console.log('向下移动' + speed + 'px')
        }
    }
}, 10)
setInterval(function() {
    //弹幕
    if (dir[4]) {
        style = document.createElement('style');
        style.setAttribute('type', 'text/css');
        style.innerHTML = `
        @keyframes danmaku${numberOfDanmaku} {
            0% {top:${smallBox.offsetTop}px}
            100% {top:${smallBox.offsetTop-600}px;}
        }
        `
        document.head.appendChild(style);
        var danmaku = document.createElement("div");
        danmaku.setAttribute('class', 'danmaku')
        danmaku.setAttribute('style', `
        left:${smallBox.offsetLeft}px;
        top:${smallBox.offsetTop}px;
        animation:danmaku${numberOfDanmaku} 2s;
        animation-timing-function:linear;
        animation-fill-mode:forwards;
        `)
        document.getElementById("bigBox").appendChild(danmaku);
        numberOfDanmaku = numberOfDanmaku + 1;
    }
}, 200);
// 键盘按下移动和生成弹幕
document.onkeydown = function(event) {
        var e = event || window.event;
        switch (e.keyCode) {
            case 37:
                dir[3] = true;
                break;
            case 38:
                dir[0] = true;
                break;
            case 39:
                dir[1] = true;
                break;
            case 40:
                dir[2] = true;
                break;
            case 90:
                dir[4] = true;
                break;
        }
        // 按住shift键缓慢移动，松开恢复
        if (event.shiftKey) {
            speed = 2;
        } else {
            speed = 5;
        }
    }
    // 松开键盘停止移动和生成弹幕
document.onkeyup = function(event) {
    var e = event || window.event;
    switch (e.keyCode) {
        case 37:
            dir[3] = false;
            break;
        case 38:
            dir[0] = false;
            break;
        case 39:
            dir[1] = false;
            break;
        case 40:
            dir[2] = false;
            break;
        case 90:
            dir[4] = false;
    }
}