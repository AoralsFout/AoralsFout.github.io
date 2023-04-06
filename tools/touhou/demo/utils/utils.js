
function randomColor() {
    return '#'+('00000'+ (Math.random()*0x1000000<<0).toString(16)).substr(-6); 
}


function getStarPoints(option = {
    inner:  50,
    outer:  100,
    spikes: 5
  }, ran=true) {
    const {spikes, inner, outer} = option;
    var i, a, x, y
      , points  = []
      , degrees = 360 / spikes

    for (i = 0; i < spikes; i++) {
      a = i * degrees + 90
      x = outer + inner * Math.cos(a * Math.PI / 180) + (ran ? Math.random()*15 : 0)
      y = outer + inner * Math.sin(a * Math.PI / 180) + (ran ? Math.random()*10 : 0)

      points.push([x, y])

      a += degrees / 2
      x = outer + outer * Math.cos(a * Math.PI / 180) + (ran ? Math.random()*10 : 0)
      y = outer + outer * Math.sin(a * Math.PI / 180) + (ran ? Math.random()*15 : 0)

      points.push([x, y])
    }

    return points;
}


function getNognPoints(option = {
    edges:  10,
    radius: 100
  }) {
    const {edges, radius} = option;
    var i, a, x, y
      , points  = []
      , degrees = 360 / edges

    for (i = 0; i < edges; i++) {
      a = i * degrees - 90
      x = radius + radius * Math.cos(a * Math.PI / 180)
      y = radius + radius * Math.sin(a * Math.PI / 180)

      points.push([x, y])
    }

    return points;
}


//animation loop
var _loopCnt = 0, _render = null, _timeCnt=1 , _time = 13; //ms
function aniloop(render, time=1) {
  _loopCnt = 0;
  _time = time || _time;
  _timeCnt = Math.ceil(_time/16);
  _render = render;

  _animloop();
}
function _animloop() {
  if (0===_loopCnt%_timeCnt) { // one 16ms.
    _render && _render();
  }
  _loopCnt++;
  window.requestAnimationFrame(_animloop);
}