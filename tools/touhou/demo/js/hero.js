var isLeft = false;
var isTop = false;
var isRight = false;
var isBottom = false;
var speed = 8;
//键盘按下事件
window.onkeydown = function(e) {
        if (e.keyCode === 37) {
            isLeft = true;
        } else if (e.keyCode === 38) {
            isTop = true;
        } else if (e.keyCode === 39) {
            isRight = true;
        } else if (e.keyCode === 40) {
            isBottom = true;
        } else if (e.keyCode === 16) {
            speed = 4;
        }
    }
    //键盘抬起事件
window.onkeyup = function(e) {
    if (e.keyCode === 37) {
        isLeft = false;
    } else if (e.keyCode === 38) {
        isTop = false;
    } else if (e.keyCode === 39) {
        isRight = false;
    } else if (e.keyCode === 40) {
        isBottom = false;
    } else if (e.keyCode === 16) {
        speed = 8
    }
}

var dHero = document.getElementById("hero");

function heroMove() {
    var left = dHero.offsetLeft;
    var top = dHero.offsetTop;
    if (isLeft) {
        left -= speed;
        left = left < 0 ? 0 : left;
    }
    if (isTop) {
        top -= speed;
        top = top < 0 ? 0 : top;
    }
    if (isRight) {
        left += speed;
        left = left > sw - 10 ? sw - 10 : left;
    }
    if (isBottom) {
        top += speed;
        top = top > sh - 10 ? sh - 10 : top;
    }
    dHero.style.left = left + 'px';
    dHero.style.top = top + 'px';
}