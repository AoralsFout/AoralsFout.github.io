function createBullet() {
    var dHero = document.getElementById("hero");
    var d = document.createElement("div");
    d.className = "bullet";
    d.style.left = dHero.offsetLeft + 'px';
    d.style.top = dHero.offsetTop + 'px';
    dBullet.appendChild(d);
}
//弹幕运动
var dBullet = document.getElementById("bullet");

function bulletMove() {
    var bs = dBullet.children;
    for (var i = 0; i < bs.length; i++) {
        var top = bs[i].offsetTop;
        if (top <= -14) {
            dBullet.removeChild(bs[i]);
            i--;
            continue;
        }
        bs[i].style.top = top - 9 + 'px';
    }
}