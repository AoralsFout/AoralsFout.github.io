window.onload = function() { //加载评论
    var url = "comment/data.json"
    var request = new XMLHttpRequest();
    request.open("get", url);
    request.send(null);
    request.onload = function() {
        if (request.status == 200) {
            var json = JSON.parse(request.responseText);
            var jsoncont = document.getElementById('div');
            json.person.map(person => { //插入评论内容
                var div = document.createElement("div");
                if (person.reply.type == 'reply') {
                    div.innerHTML = `
                    <div>
                        <img src="${person.avatar}" class="avatar"></img>
                        <div class="nameBackground"></div>
                        <p class="name">${person.name}</p>
                        <p>${person.t_comment} </p>
                        <p class="time">${person.time}</p>
                        <button id="replyBtn" class="replyBtn" onclick="showInput()" name="${person.id}">回复</button>
                        <div id="oli${person.id}" name="reply${person.id}"></div>
                        <div class="hr">
                            <div>
                                <div class="replyComment">
                                <img src="${person.reply.avatar}" class="avatar">
                                <div class="nameBackground"></div>
                                <p class="name">${person.reply.name}(${person.reply.QQnumber})</p>
                                <p>${person.reply.t_comment}</p>
                                <p class="time">${person.reply.time}</p>
                            </div>
                        </div class="hr">
                    </div>`;
                } else {
                    div.innerHTML = `
                    <div>
                        <img src="${person.avatar}" class="avatar"></img>
                        <div class="nameBackground"></div>
                        <p class="name">${person.name}</p>
                        <p>${person.t_comment} </p>
                        <p class="time">${person.time}</p>
                        <button id="replyBtn" class="replyBtn" onclick="showInput()" name="${person.id}">回复</button>
                        <div id="oli${person.id}" name="reply${person.id}"></div>
                        <div class="hr"></div>
                    </div>`;
                }
                ol.append(div);
            })
        }
    }
}

var bili = document.getElementsByName('bilibili');
var owo = document.getElementsByName('owo');
var emoji = document.getElementsByName('emoji');

function openEmotion() { //打开表情选择界面
    var a = document.getElementById('Emotion-body');
    a.style.setProperty('display', 'block')
    focusBilibili();
    owo[0].style.setProperty('display', 'none');
    emoji[0].style.setProperty('display', 'none');
    document.getElementById('openEmotion').value = '关闭';
    document.getElementById('openEmotion').setAttribute('onclick', 'closeEmotion()')
    document.getElementById('lang').style.setProperty('top', '-231px')
    document.getElementById('langLength').style.setProperty('top', '-231px')
    document.getElementById('btn').style.setProperty('top', '-231px')
    document.getElementById('hr1').style.setProperty('top', '-231px')
    document.getElementById('openEmotion').style.setProperty('color', 'white')
    document.getElementById('openEmotion').style.setProperty('background-color', 'rgb(153, 153, 255)')
}

function closeEmotion() { //关闭表情选择界面
    var a = document.getElementById('Emotion-body');
    a.style.setProperty('display', 'none')
    owo[0].style.setProperty('display', 'none');
    emoji[0].style.setProperty('display', 'none');
    document.getElementById('openEmotion').value = '表情';
    document.getElementById('openEmotion').setAttribute('onclick', 'openEmotion()')
    document.getElementById('lang').style.setProperty('top', '0')
    document.getElementById('langLength').style.setProperty('top', '0')
    document.getElementById('btn').style.setProperty('top', '0')
    document.getElementById('hr1').style.setProperty('top', '0')
    document.getElementById('openEmotion').style.removeProperty('color', 'black')
    document.getElementById('openEmotion').style.removeProperty('background-color', 'white')
}

function focusBilibili() { //选中哔哩哔哩
    bili[1].setAttribute('class', 'btnFocus');
    bili[0].style.setProperty('display', 'block');
    owo[1].setAttribute('class', 'btnUnfocus');
    owo[0].style.setProperty('display', 'none');
    emoji[1].setAttribute('class', 'btnUnfocus');
    emoji[0].style.setProperty('display', 'none');
}

function focusOwo() { //选中颜文字
    bili[1].setAttribute('class', 'btnUnfocus');
    bili[0].style.setProperty('display', 'none');
    owo[1].setAttribute('class', 'btnFocus');
    owo[0].style.setProperty('display', 'block');
    emoji[1].setAttribute('class', 'btnUnfocus');
    emoji[0].style.setProperty('display', 'none');
}

function focusEmoji() { //选中emoji
    bili[1].setAttribute('class', 'btnUnfocus');
    bili[0].style.setProperty('display', 'none');
    owo[1].setAttribute('class', 'btnUnfocus');
    owo[0].style.setProperty('display', 'none');
    emoji[1].setAttribute('class', 'btnFocus');
    emoji[0].style.setProperty('display', 'block');
}

var headimgUrl = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202003%2F25%2F20200325142318_jWPnn.thumb.400_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1672041905&t=cb60dfe4a38f176160793cac9aea03b7';
var headimg = document.getElementById('headimg');
var userHeadimg = document.getElementById('userHeadimg');
var user = document.getElementById('user');
var lang = document.getElementById('lang');
var btn = document.getElementById('btn');
var commentName;
var QQNumber = '';
var replyQQNumber = '';
var nowLangLength;
var maxLangLength = 300;
var timeout = 4;

function getQQ() { //获取QQ头像和昵称
    QQNumber = document.getElementById('userQQ').value;
    var url = 'https://api.usuuu.com/qq/' + QQNumber;
    var QQrequest = new XMLHttpRequest();
    QQrequest.open("get", url);
    QQrequest.send(null);
    QQrequest.onload = function() {
        if (QQrequest.status >= 200 && QQrequest.status < 300 || QQrequest.status == 0) {
            var QQjson = JSON.parse(QQrequest.responseText);
            headimgUrl = QQjson.data['avatar']; //把默认头像变量改成json里的头像地址
            user.value = QQjson.data['name'];
            headimg.setAttribute('src', headimgUrl);
        } else {
            alert('请求出错!请检查QQ号拼写是否正确')
        }
    }
}

function ReplyGetQQ() { //回复框获取QQ头像和昵称
    replyQQNumber = document.getElementById('replyUserQQ').value;
    var url = 'https://api.usuuu.com/qq/' + replyQQNumber;
    var replyQQrequest = new XMLHttpRequest();
    replyQQrequest.open("get", url);
    replyQQrequest.send(null);
    replyQQrequest.onload = function() {
        if (replyQQrequest.status >= 200 && replyQQrequest.status < 300 || replyQQrequest.status == 0) {
            var replyQQjson = JSON.parse(replyQQrequest.responseText);
            headimgUrl = replyQQjson.data['avatar']; //把默认头像变量改成json里的头像地址
            document.getElementById('replyUser').value = replyQQjson.data['name']; //这里不知道为啥用变量.value就报错,无语
            document.getElementById('userHeadimg').setAttribute('src', headimgUrl);
        } else {
            alert('请求出错!请检查QQ号拼写是否正确')
        }
    }
}

function nowLangLength() { //获取当前输入字符长度
    setInterval("nowLangLength = lang.value.length", 1000);
}
nowLangLength();

function langLength() { //字符长度提示
    if (nowLangLength >= 300) { //判断剩余字数是否小于0 防止返回负值
        document.getElementById('langLength').innerHTML = '<span style="color:#ff0000;">您已输入' + nowLangLength + '个字符,不能再输入更多内容了!</span>';
    } else {
        var maxLength = 300 - nowLangLength;
        document.getElementById('langLength').innerHTML = '您已输入' + nowLangLength + '个字符,还可以输入' + maxLength + '个字符';
    }
}
setInterval("langLength()", 1000);

function check(n) { //自动数字补零
    n = n < 10 ? "0" + n : n; //三元表达式
    return n;
}

function getNowTime() { //获取评论时间
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hours = now.getHours();
    var min = now.getMinutes();
    var sec = now.getSeconds();
    var timeResult = year + "-" + check(month) + "-" + check(day) + " \t " + check(hours) + ":" + check(min) + ":" + check(sec);
    return timeResult;
}

function getName(event) { //获取点击按钮的name
    btnName = window.event.target
    return (btnName.name)
}

function showInput() { //弹出回复输入框
    var buttom = document.getElementsByTagName('button');
    for (let i = 0; i < buttom.length; i++) { //遍历查找innerText为收起的按钮
        var inner_Text = buttom[i].innerText;
        var commentInput = buttom[i].nextElementSibling.childNodes //输入框的相对位置
        if (inner_Text === '收起') {
            for (let j = 0; j < commentInput.length; j++) { //遍历查找标签名为DIV_C的标签
                if (commentInput[j].nodeName === 'DIV_C') {
                    commentInput[j].remove() //删除原有的输入框
                }
            };
        }
        buttom[i].innerText = '回复';
        buttom[i].setAttribute('onclick', 'showInput()');
    }

    //创建新输入框
    var cont = document.createElement('div_c');
    cont.innerHTML = `
    <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202003%2F25%2F20200325142318_jWPnn.thumb.400_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1672041905&t=cb60dfe4a38f176160793cac9aea03b7" class="userAvatar" id="userHeadimg"></img>
    <input type="text" value="昵称" class="userPlaceholder" disabled>
    <input type="text" id="replyUser" placeholder="好记的昵称让人印象深刻哟~" class="userInput">
    <input type="text" value="QQ号" class="userQQPlaceholder" disabled>
    <input type="text" id="replyUserQQ" placeholder="输入QQ号自动获取头像和昵称哦" class="userQQInput">
    <input type="button" value="点击获取" class="getQQBtn" onclick="ReplyGetQQ()">
    <br>
    <textarea type="text" id="replyLang" placeholder="此评论系统处于测试阶段，不能保存您的评论!" class="replyLangInput"></textarea>
    <br>
    <span id="langLength" style="font-size: xx-small;margin-left: 100px;">您已输入0个字符,还可以输入300个字符</span>
    <input type="button" value="关闭" id="exitReplyBtn" class="exitReplyBtn" onclick="exitReply()" name="` + getName() + `">
    <input type="button" value="回复" id="publishReplyBtn" class="publishReplyBtn" onclick="reply()" name="` + getName() + `">`
    document.getElementById('oli' + getName()).appendChild(cont);
    var btnName = document.getElementsByName(getName());
    btnName[0].setAttribute('onclick', 'exitReply()');
    btnName[0].innerHTML = '收起';
}

function publish() { //发送函数
    if (user.value == 0) { //发送条件
        alert('请输入你可爱的昵称~');
    } else if (lang.value == 0) {
        alert('留言内容不能为空哦~');
    } else if (user.value.length >= 16) {
        alert('昵称太长了呢，请换一个吧(16个字符以内的哟~)');
    } else if (lang.value.length >= 300) {
        alert('我只能接受300个字符以内的留言哦');
    } else {
        var button = document.getElementsByTagName('button');
        commentName = button.length;
        var timeResult = getNowTime();
        var cont = document.createElement('div');
        var outputLang = toOutputLang(lang.value);
        if (QQNumber === undefined || QQNumber === '' || Number(QQNumber) == NaN) { //判断用户是否输入QQ号,输出不同的结果
            cont.innerHTML = '<img src=' + headimgUrl + ' class="avatar"><div class="nameBackground"></div><p class="name">' + user.value + '</p><p>' + outputLang + '</p><p class="time">' + timeResult + '</p><button id="replyBtn" class="replyBtn" onclick="showInput()" name="' + commentName + '">回复</button><div id="oli' + commentName + '"></div><div class="hr"></div>';
        } else {
            cont.innerHTML = '<img src=' + headimgUrl + ' class="avatar"><div class="nameBackground"></div><p class="name">' + user.value + '(' + QQNumber + ')</p><p>' + outputLang + '</p><p class="time">' + timeResult + '</p><button id="replyBtn" class="replyBtn" onclick="showInput()" name="' + commentName + '">回复</button><div id="oli' + commentName + '"></div><div class="hr"></div>';
        }
        document.getElementById('ol').appendChild(cont);
        lang.value = ''; //重置输入框
        btn.setAttribute('disabled', 'disabled'); //禁用按钮
        setTimeout(
            "btn.removeAttribute('disabled', 'disabled')", 5000 //5000ms后解除禁用
        );

        document.getElementById('btn').setAttribute('value', '5秒') //在按钮上显示倒计时

        var myInterval = setInterval(show, 1000); //计时

        function show() { //计时函数 (这个函数不知道为啥封装到外面用不了)
            document.getElementById('btn').setAttribute('value', timeout + '秒')
            timeout = timeout - 1;
            if (timeout == -1) {
                clearInterval(myInterval);
                document.getElementById('btn').setAttribute('value', '发布')
                timeout = 4;
            }
        }
    }
}

function reply() { //回复函数
    var replyUser = document.getElementById('replyUser');
    var replyLang = document.getElementById('replyLang');
    if (replyUser.value == 0) { //回复条件
        alert('请输入你可爱的昵称~');
    } else if (replyLang.value == 0) {
        alert('留言内容不能为空哦~');
    } else if (replyUser.value.length >= 16) {
        alert('昵称太长了呢，请换一个吧(16个字符以内的哟~)');
    } else if (replyLang.value.length >= 300) {
        alert('我只能接受300个字符以内的留言哦');
    } else {
        var timeResult = getNowTime();
        var cont = document.createElement('div');
        if (replyQQNumber === undefined || replyQQNumber === '' || Number(replyQQNumber) == NaN) {
            cont.innerHTML = '<div class="replyComment"><img src=' + headimgUrl + ' class="avatar"><div class="nameBackground"></div><p class="name">' + replyUser.value + '</p><p>' + replyLang.value + '</p><p class="time">' + timeResult + '</p></div>';
        } else {
            cont.innerHTML = '<div class="replyComment"><img src=' + headimgUrl + ' class="avatar"><div class="nameBackground"></div><p class="name">' + replyUser.value + '(' + replyQQNumber + ')</p><p>' + replyLang.value + '</p><p class="time">' + timeResult + '</p></div>';
        }
        document.getElementsByName(getName())[0].parentNode.lastElementChild.appendChild(cont);
        replyLang.value = '';
        btn.setAttribute('disabled', 'disabled');
        setTimeout(
            "btn.removeAttribute('disabled', 'disabled')", 5000
        );

        document.getElementById('btn').setAttribute('value', '5秒')

        var myInterval = setInterval(show, 1000);

        function show() {
            document.getElementById('btn').setAttribute('value', timeout + '秒')
            timeout = timeout - 1;
            if (timeout == -1) {
                clearInterval(myInterval);
                document.getElementById('btn').setAttribute('value', '发布')
                timeout = 4;
            }
        }
    }
}

function exitReply() { //退出回复
    document.getElementById('oli' + getName()).getElementsByTagName('div_c')[0].remove();
    document.getElementById('oli' + getName()).previousSibling.previousSibling.innerHTML = '回复';
    var a = document.getElementsByName(getName())[0].parentNode.childNodes;
    a[11].setAttribute('onclick', 'showInput()');
    QQNumber = '';
    replyQQNumber = '';
    headimgUrl = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202003%2F25%2F20200325142318_jWPnn.thumb.400_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1672041905&t=cb60dfe4a38f176160793cac9aea03b7';
}

function addPublishEmotion(emo) {
    lang.value = lang.value + emo;
}

function addPublishBilibiliEmotion(alt) {
    lang.value = lang.value + alt;
    console.log(lang.value);
}

function toOutputLang(str) {
    var temp;
    var reg = /\$\{(.+?)\}/; //正则表达式
    var reg_g = /\$\{(.+?)\}/g;
    var length = str.match(reg_g).length;
    console.log(str.match(reg_g).length);
    for (var i = 1; i <= length; i++) { //循环遍历查找${} 找到后替换成标签形式
        temp = reg_g.exec(str)[1];
        switch (temp) {
            case 'tv_doge':
                str = str.replace(reg, '<img class="emotion" src="https://owo.imaegoo.com/bilibili/6ea59c827c414b4a2955fe79e0f6fd3dcd515e24.png" alt=":tv_doge:">')
                break;
            case 'tv_亲亲':
                str = str.replace(reg, '<img class="emotion" src="https://owo.imaegoo.com/bilibili/a8111ad55953ef5e3be3327ef94eb4a39d535d06.png" alt=":tv_亲亲:">')
                break;
            case 'tv_偷笑':
                str = str.replace(reg, '<img class="emotion" src="https://owo.imaegoo.com/bilibili/bb690d4107620f1c15cff29509db529a73aee261.png" alt=":tv_偷笑:">')
                break;
            case 'tv_再见':
                str = str.replace(reg, '<img class="emotion" src="https://owo.imaegoo.com/bilibili/180129b8ea851044ce71caf55cc8ce44bd4a4fc8.png" alt=":tv_再见:">')
                break;
            case 'tv_冷漠':
                str = str.replace(reg, '<img class="emotion" src="https://owo.imaegoo.com/bilibili/b9cbc755c2b3ee43be07ca13de84e5b699a3f101.png" alt=":tv_冷漠:">')
                break;
            case 'tv_发怒':
                str = str.replace(reg, '<img class="emotion" src="https://owo.imaegoo.com/bilibili/34ba3cd204d5b05fec70ce08fa9fa0dd612409ff.png" alt=":tv_发怒:">')
                break;
            case 'tv_发财':
                str = str.replace(reg, '<img class="emotion" src="https://owo.imaegoo.com/bilibili/34db290afd2963723c6eb3c4560667db7253a21a.png" alt=":tv_发财:">')
                break;
            case 'tv_可爱':
                str = str.replace(reg, '<img class="emotion" src="https://owo.imaegoo.com/bilibili/9e55fd9b500ac4b96613539f1ce2f9499e314ed9.png" alt=":tv_可爱:">')
                break;
            case 'tv_吐血':
                str = str.replace(reg, '<img class="emotion" src="https://owo.imaegoo.com/bilibili/09dd16a7aa59b77baa1155d47484409624470c77.png" alt=":tv_吐血:">')
                break;
            case 'tv_呆':
                str = str.replace(reg, '<img class="emotion" src="https://owo.imaegoo.com/bilibili/fe1179ebaa191569b0d31cecafe7a2cd1c951c9d.png" alt=":tv_呆:">')
                break;
            case 'tv_呕吐':
                str = str.replace(reg, '<img class="emotion" src="https://owo.imaegoo.com/bilibili/9f996894a39e282ccf5e66856af49483f81870f3.png" alt=":tv_呕吐:">')
                break;
            case 'tv_困':
                str = str.replace(reg, '<img class="emotion" src="https://owo.imaegoo.com/bilibili/241ee304e44c0af029adceb294399391e4737ef2.png" alt=":tv_困:">')
                break;
            case 'tv_坏笑':
                str = str.replace(reg, '<img class="emotion" src="https://owo.imaegoo.com/bilibili/1f0b87f731a671079842116e0991c91c2c88645a.png" alt=":tv_坏笑:">')
                break;
            case 'tv_大佬':
                str = str.replace(reg, '<img class="emotion" src="https://owo.imaegoo.com/bilibili/093c1e2c490161aca397afc45573c877cdead616.png" alt=":tv_大佬:">')
                break;
            case 'tv_大哭':
                str = str.replace(reg, '<img class="emotion" src="https://owo.imaegoo.com/bilibili/23269aeb35f99daee28dda129676f6e9ea87934f.png" alt=":tv_大哭:">')
                break;
            case 'tv_委屈':
                str = str.replace(reg, '<img class="emotion" src="https://owo.imaegoo.com/bilibili/d04dba7b5465779e9755d2ab6f0a897b9b33bb77.png" alt=":tv_委屈:">')
                break;
            case 'tv_害羞':
                str = str.replace(reg, '<img class="emotion" src="https://owo.imaegoo.com/bilibili/a37683fb5642fa3ddfc7f4e5525fd13e42a2bdb1.png" alt=":tv_害羞:">')
                break;
            case 'tv_尴尬':
                str = str.replace(reg, '<img class="emotion" src="https://owo.imaegoo.com/bilibili/7cfa62dafc59798a3d3fb262d421eeeff166cfa4.png" alt=":tv_尴尬:">')
                break;
            case 'tv_微笑':
                str = str.replace(reg, '<img class="emotion" src="https://owo.imaegoo.com/bilibili/70dc5c7b56f93eb61bddba11e28fb1d18fddcd4c.png" alt=":tv_微笑:">')
                break;
            case 'tv_思考':
                str = str.replace(reg, '<img class="emotion" src="https://owo.imaegoo.com/bilibili/90cf159733e558137ed20aa04d09964436f618a1.png" alt=":tv_思考:">')
                break;
            case 'tv_惊吓':
                str = str.replace(reg, '<img class="emotion" src="https://owo.imaegoo.com/bilibili/0d15c7e2ee58e935adc6a7193ee042388adc22af.png" alt=":tv_惊吓:">')
                break;
            default:
                break;
        }
    }
    return str;
}
