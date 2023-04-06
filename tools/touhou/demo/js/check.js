function isCrash(a, b) {
    var l1 = a.offsetLeft;
    var t1 = a.offsetTop;
    var r1 = l1 + a.offsetWidth;
    var b1 = t1 + a.offsetHeight;

    var l2 = b.offsetLeft;
    var t2 = b.offsetTop;
    var r2 = l2 + b.offsetWidth;
    var b2 = t2 + b.offsetHeight;
    if (r2 < l1 || b2 < t1 || r1 < l2 || b1 < t2) {
        // 不碰撞
        return false;
    } else {
        // 碰撞
        return true;
    }
}

function check() {
    var es = dDanmaku.children;
    for (var i = 0; i < es.length; i++) {
        var e = es[i];
        if (isCrash(dHero, e)) {
            // gameover
            // alert('ganmeover');
            // clearInterval(timer);
        }
    }
}