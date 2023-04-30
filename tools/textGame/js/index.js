function creatLocalStorage() { //创建本地缓存
    localStorage.setItem('isPlayed', false);
    localStorage.setItem('userName', '');
    localStorage.setItem('speed', 2000);
    localStorage.setItem('money', 0);
    localStorage.setItem('attack', 0);
    localStorage.setItem('defense', 0);
    localStorage.setItem('fire', 0);
    localStorage.setItem('water', 0);
    localStorage.setItem('HP', 100);
    localStorage.setItem('items', '[]');
}
if (localStorage.length == 0) { //判断是否第一次运行程序
    document.getElementById('zhezhao1').style.display = '';
    creatLocalStorage();
    console.log('[INFO]:第一次加载,创建本地缓存');
}
//初始化变量
var userName = localStorage['userName'];
var speed = parseInt(localStorage['speed']);
var money = parseInt(localStorage['money']);
var items = JSON.parse(localStorage['items']);
var isPlayed = localStorage['isPlayed'];
var attack = parseInt(localStorage['attack']);
var defense = parseInt(localStorage['defense']);
var fire = parseInt(localStorage['fire']);
var water = parseInt(localStorage['water']);
var HP = parseInt(localStorage['HP']);
var realAttack = 0;
msg('已加载用户名:' + userName);
msg('已加载余额:' + money);
msg('已加载播放速度:' + speed);
msg('已加载物品:' + items);
msg('已加载属性:攻击力(' + attack + '),防御力(' + defense + '),火属性天赋(' + fire + '),水属性天赋(' + water + '),生命值(' + HP + ')');
msg('接下来你可以通过侧边栏来进行决定了');

function save() { //保存函数
    userAttribute()
    localStorage.setItem('isPlayed', true);
    localStorage.setItem('userName', userName);
    localStorage.setItem('speed', speed);
    localStorage.setItem('money', money);
    localStorage.setItem('items', JSON.stringify(items));
    localStorage.setItem('attack', attack);
    localStorage.setItem('defense', defense);
    localStorage.setItem('fire', fire);
    localStorage.setItem('water', water);
    localStorage.setItem('HP', HP);
    msg('已保存用户名:' + userName);
    msg('已保存余额:' + money);
    msg('已保存播放速度: ' + speed);
    msg('已保存物品:' + items);
    msg('已保存属性:攻击力(' + attack + '),防御力(' + defense + '),火属性天赋(' + fire + '),水属性天赋(' + water + '),生命值(' + HP + ')');
}

function userAttribute() { //计算用户属性值
    console.log('[SYSTEM]:开始检索');
    attack = 0
    defense = 0
    fire = 0
    water = 0
    for (var i = 0; i < items.length; i++) {
        switch (items[i]) {
            case '新手长剑':
                attack = attack + 10;
                console.log('[SYSTEM]:检索到新手长剑,攻击力+10');
                break;
            case '新手护甲':
                defense = defense + 10;
                console.log('[SYSTEM]:检索到新手护甲,防御力+10');
                break;
            case '火魔法书':
                fire = fire + 10;
                console.log('[SYSTEM]:检索到火魔法书,火属性天赋+10');
                break;
            case '水魔法书':
                water = water + 10;
                console.log('[SYSTEM]:检索到水魔法书,水属性天赋+10');
                break;
            default:
                break;
        }
    }
    realAttack = (attack * 0.8) + (defense * 0.1) + (fire * 0.8) + (water * 0.8);
    console.log('[SYSTEM]:属性值计算成功:攻击力(' + attack + '),防御力(' + defense + '),火属性天赋(' + fire + '),水属性天赋(' + water + '),实际输出(' + realAttack + ')');
    return attack, defense, fire, water, realAttack;
}

function profile() {
    document.getElementById('pName').innerHTML = '个体名称:' + userName;
    document.getElementById('pHP').innerHTML = '生命值:' + HP;
    document.getElementById('pMoney').innerHTML = '余额:' + money;
    document.getElementById('pAttack').innerHTML = '攻击力:' + attack;
    document.getElementById('pDefense').innerHTML = '防御力:' + defense;
    document.getElementById('pFire').innerHTML = '火属性天赋:' + fire;
    document.getElementById('pWater').innerHTML = '水属性天赋:' + water;
    console.log('[SYSTEM]:个体名称:' + userName);
    console.log('[SYSTEM]:生命值:' + HP);
    console.log('[SYSTEM]:余额:' + money);
    console.log('[SYSTEM]:攻击力:' + attack);
    console.log('[SYSTEM]:防御力:' + defense);
    console.log('[SYSTEM]:火属性天赋:' + fire);
    console.log('[SYSTEM]:水属性天赋:' + water);
}

function reStart() { //重新开始
    localStorage.clear();
    window.location.href = 'index.html';
}

var IdTemp;

function cheat() { //作弊码
    console.log('修改余额: money = 修改的金额(不带引号)');
    console.log('修改播放速度(任意值): speed = 修改的速度(不带引号)');
    console.log('快速逛街: street()')
    console.log('重新观看开场白: review()');
}

function review() { //作弊码 重新观看开场白
    start();
    setTimeout('load_1()', speed * 8);
}

function street() { //作弊码 快速逛街
    temp = speed;
    speed = 0;
    ing_2();
    speed = temp;
}

console.log('[INFO]:输入cheat()查看作弊功能');

function msg(msg) { //信息盒子里插入信息
    var a = document.createElement('span');
    a.innerText = msg;
    a.setAttribute('class', 'msg');
    msgBox.appendChild(a);
    console.log('[INFO]:' + msg);
    document.getElementById("msgBox").scrollTop = document.getElementById("msgBox").scrollHeight;
}

function changeSpeed() { //更改播放速度
    console.log('[SYSTEM]:更改播放速度');
    var a = parseInt(prompt('请输入播放速度(单位:毫秒(1秒=1000毫秒))(默认速度:3000毫秒)(速度应小于等于15000并大于等于100)'));
    if (typeof a != "number") {
        console.warn('[ERROR]:请输入一个数字!');
        alert('请输入一个数字!');
    } else if (a > 15000 || a < 100) {
        console.warn('[ERROR]:输入的数字不在指定范围内!');
        alert('输入的数字不在指定范围内!');
    } else {
        speed = a;
        console.log('[SYSTEM]:用户设置播放速度为' + speed + '毫秒');
        alert('用户设置播放速度为' + speed + '毫秒');
    }
}

function setting() { //看consol.log()
    document.getElementById('zhezhao').style.display = "";
    console.log('[SYSTEM]:打开设置');
}

function hidSetting() {
    document.getElementById('zhezhao').style.display = "none";
    console.log('[SYSTEM]:关闭设置');
}

function start() {
    document.getElementById('zhezhao1').style.display = "";
    console.log('[SYSTEM]:开始游戏提示');
}

function hidStart() {
    document.getElementById('zhezhao1').style.display = "none";
    console.log('[SYSTEM]:关闭开始游戏提示');
}

function showReStart() {
    hidSetting();
    document.getElementById('zhezhao6').style.display = "";
    console.log('[SYSTEM]:重新开始游戏提示');
}

function hidReStart() {
    document.getElementById('zhezhao6').style.display = "none";
    console.log('[SYSTEM]:关闭重新开始游戏提示');
}

function showName() {
    document.getElementById('zhezhao2').style.display = "";
    console.log('[SYSTEM]:打开取名提示');
}

function hidName() {
    document.getElementById('zhezhao2').style.display = "none";
    console.log('[SYSTEM]:关闭取名提示');
}

function showMy() {
    profile();
    document.getElementById('zhezhao7').style.display = "";
    console.log('[SYSTEM]:打开状态');
}

function hidMy() {
    document.getElementById('zhezhao7').style.display = "none";
    console.log('[SYSTEM]:关闭状态');
}

function showItems() {
    document.getElementById('itemsWindow').innerHTML = '物品栏 (余额:' + money + ')';
    getItems()
    document.getElementById('zhezhao5').style.display = "";
    console.log('[SYSTEM]:打开物品栏');
}

function hidItems() {
    document.getElementById('zhezhao5').style.display = "none";
    for (var i = 0; i < items.length; i++) {
        document.getElementById('Id_' + i).remove();
    }
    console.log('[SYSTEM]:关闭物品栏');
    console.log('[SYSTEM]:清空用户物品信息');
}

function getItems() { //刷新用户物品栏信息
    for (var i = 0; i < items.length; i++) {
        var div = document.getElementById('contentItems')
        var a = document.createElement('input');
        a.type = "button";
        a.value = items[i];
        a.setAttribute('class', 'myBtn');
        a.id = "Id_" + i;
        div.appendChild(a);
        console.log('[SYSTEM]:获取用户物品信息');
    }
}

function creatMessage(jsonName) {
    console.log('[SYSTEM]:加载json↓');
    console.log(jsonName);
    for (var i = 0; i < jsonName.msg.length; i++) {
        (function(i) {
            setTimeout(function() {
                var a = document.createElement('span');
                var msg = jsonName.msg[i].msg;
                a.innerText = msg;
                a.setAttribute('class', 'msg');
                msgBox.appendChild(a);
                console.log('[INFO]:' + msg);
                document.getElementById("msgBox").scrollTop = document.getElementById("msgBox").scrollHeight;
            }, speed * i)
        })(i)
    }
    console.log('[SYSTEM]开始');
}

function start() { //开场函数
    var welcomeJson = `
    {
        "msg": [{
                "msg": "公元2020年12月25日,你因感染新冠病毒不幸离世..."
            },
            {
                "msg": "你在最后的时光里,向天许了一个愿..."
            },
            {
                "msg": "我  :  我想去...一个无忧无虑的..."
            },
            {
                "msg": "我  :  新世界..."
            },
            {
                "msg": "我  :  去闯荡世界...那多好啊(流泪)"
            },
            {
                "msg": "你闭上了眼睛..."
            },
            {
                "msg": "......"
            },
            {
                "msg": "那是圣诞老人吗..."
            },
            {
                "msg": "......"
            }
        ]
    }
    `
    var welcome = JSON.parse(welcomeJson)
    creatMessage(welcome);
    setTimeout('showName()', speed * welcome.msg.length - 1); //计时弹出,询问昵称
}

function getName() { //获取昵称
    var a = document.getElementById('getName').value
    if (a == '') {
        console.warn('[ERROR]:请输入一个昵称');
        alert('请输入一个昵称')
        showName()
    } else if (a.length >= 20) {
        console.warn('[ERROR]:你的名字太长了哼,这么长异世界不会接你的!');
        alert('你的名字太长了哼,这么长异世界不会接你的!')
        showName()
    } else {
        userName = a;
        console.log('[SYSTEM]:用户输入昵称:' + userName);
        load_1()
    }
    document.getElementsByName('114514')[0].style.backgroundColor = 'red';
    document.getElementsByName('114514')[0].setAttribute('onclick', 'hidName()')
    document.getElementById('getNameBtn').setAttribute('onclick', 'hidName(),getNewName()')
}

function getNewName() { //更改昵称(和上面的比不播放load_1)
    var a = document.getElementById('getName').value
    if (a == '') {
        console.warn('[ERROR]:请输入一个昵称');
        alert('请输入一个昵称')
        showName()
    } else if (a.length >= 20) {
        console.warn('[ERROR]:你的名字太长了哼,这么长异世界不会接你的!');
        alert('你的名字太长了哼,这么长异世界不会接你的!')
        showName()
    } else {
        userName = a;
        console.log('[SYSTEM]:用户输入昵称:' + userName);
        console.log('[INFO]:您已获得新昵称:' + userName);
        msg('您已获得新昵称:' + userName)
    }
}

function changeName() { //更改昵称
    showName();
    hidSetting();
}

function load_1() { //第二段开场白
    var afterNamedJson = `
{
    "msg": [{
            "msg": "恭喜!你成功转生到了异世界!"
        },
        {
            "msg": "您的新名字是${userName},你将拥有一个新的身份在新的世界里继续活下去!(您的昵称可以随时在设置里更改)"
        },
        {
            "msg": "......"
        },
        {
            "msg": "十八年后...${userName}的生日上,你似乎想起了你前世的事情...."
        },
        {
            "msg": "在这里呆了十八年,是时候去做点什么了(现在可以在侧边栏保存您的数据)"
        },
        {
            "msg": "你决定:"
        }
    ]
}
`
    var ing_1 = JSON.parse(afterNamedJson);
    creatMessage(ing_1);
    setTimeout('showDecision()', speed * ing_1.msg.length - 1);
}

function showDecision() { //看log
    document.getElementById('zhezhao3').style.display = "";
    document.getElementById('zhezhao').style.display = "none";
    console.log('[SYSTEM]:打开决定');
}

function hidDecision() {
    document.getElementById('zhezhao3').style.display = "none";
    console.log('[SYSTEM]:关闭决定');
}

function ing() { //DOM侧边栏状态,防止用户卡bug
    document.getElementById('decision').style.backgroundColor = 'red';
    document.getElementById('decision').removeAttribute('onclick');
    setTimeout("document.getElementById('decision').removeAttribute('style')", speed * 3)
    setTimeout("document.getElementById('decision').setAttribute('onclick','showDecision()')", speed * 3)
}

function ing_2() { //逛街
    ing();

    var rand = Math.floor(Math.random() * 11);

    if (rand == 0) { //随机事件 100块钱10% 10块钱60% 狗30%
        money = money + 100;
        console.log('[INFO]:用户余额+100,余额:' + money);
        var ing_2_2 = `
{
    "msg": [{
            "msg": "你来到了街上"
        },
        {
            "msg": "你在路边捡到了100块钱"
        },
        {
            "msg": "(大幸运!)(余额 + 100)(余额:${money})"
        },
        {
            "msg": "接下来你可以通过侧边栏来进行决定了"
        }
    ]
}
`
        var ing_2 = JSON.parse(ing_2_2);
        creatMessage(ing_2);
    } else if (rand == 9 || rand == 8 || rand == 7) {
        var ing_2_3 = `
{
    "msg": [{
            "msg": "你来到了街上"
        },
        {
            "msg": "路边的狗对着你吼叫"
        },
        {
            "msg": "你觉得这只狗不好惹,回去了"
        },
        {
            "msg": "接下来你可以通过侧边栏来进行决定了"
        }
    ]
}
`
        var ing_2 = JSON.parse(ing_2_3);
        creatMessage(ing_2)
    } else {
        money = money + 10;
        console.log('[INFO]:用户余额+10,余额:' + money);
        var ing_2_1 = `
{
    "msg": [{
            "msg": "你来到了街上"
        },
        {
            "msg": "你在路边捡到了10块钱"
        },
        {
            "msg": "(余额 + 10)(余额:${money})"
        },
        {
            "msg": "接下来你可以通过侧边栏来进行决定了"
        }
    ]
}
`
        var ing_2 = JSON.parse(ing_2_1);
        creatMessage(ing_2)
    }
}

function showStore() { //看log
    document.getElementById('zhezhao4').style.display = "";
    document.getElementById('zhezhao').style.display = "none";
    console.log('[SYSTEM]:打开商店');
}

function hidStore() {
    document.getElementById('zhezhao4').style.display = "none";
    console.log('[SYSTEM]:关闭商店');
}

function ing_3() { //进入商店
    ing();

    var ing_3 = `
{
    "msg": [{
            "msg": "老板  :  欢迎光临!您买些啥?"
        }
    ]
}
`
    var ing_3 = JSON.parse(ing_3);
    creatMessage(ing_3);
    setTimeout('showStore()', speed * ing_3.msg.length - 1);
}

function getPrice(event) {
    btnName = window.event.target;
    return (btnName.name);
}

function getId(element) {
    IdTemp = element.id;
}

function buy(item) { //购买函数
    if (money < parseInt(getPrice())) {
        msg("老板  :  小哥,没钱就不要来捣乱");
        console.warn('[ERROR]:余额不足!');
        msg('余额不足!')
        msg(userName + '  :  欸,没有钱了,去街上看看吧');
        ing_2() //逛街事件
    } else {
        money = money - parseInt(getPrice());
        msg("老板  :  谢谢惠顾");
        items[items.length] = item;
        console.log('[INFO]:已购入' + item);
        msg('已购入' + item)
    }
}



function use(item) {
    for (var i = 0; i < items.length; i++) {
        if (items[i] = IdTemp) {
            items.splice(i, 1);
        }
    }
}

function ing_4() { //野外
    ing();

    var a = Math.random() + "" //产生一个随机数
    var rand = parseInt(a.charAt(5)) //的到这个数的第五个字符(实际还是从0~9的数字)

    if (rand == 0 || rand == 1 || rand == 2 || rand == 3 || rand == 4) { //50% 史莱姆事件
        //总消息
        var ing_4_1 = `
{
    "msg": [{
            "msg": "你来到了野外"
        },
        {
            "msg": "你在在野外遇见了史莱姆!"
        }
    ]
}
`
        userAttribute()
        var enermyHP = 70; //史莱姆(敌人)的属性
        var enermyAttact = 10;
        var enermyRealAttack = enermyAttact / defense * 5; //敌人的实际攻击力(公式:敌人攻击力除以我的防御力乘以10)
        //回合数
        var round = Math.ceil(enermyHP / realAttack) < Math.ceil(HP / enermyRealAttack) ? Math.ceil(enermyHP / realAttack) : Math.ceil(HP / enermyRealAttack);
        //我攻击敌人最多的次数 小于 敌人攻击我最多的次数 吗? 是 返回 我攻击敌人最多的次数 , 不是 返回  敌人攻击我最多的次数 (三元表达式)
        //敌人血量除以我的实际攻击力是我用几次可以打败敌人(我的血量除以敌人的实际攻击力是敌人用几次可以打败我),大部分情况会出现小数,即敌人(我)有剩余血量,所以用Math.ceil()向上取整
        //Math.ceil(enermyHP / realAttack) < Math.ceil(HP / enermyRealAttack)时,我能击败敌人,反之不能
        if (Math.ceil(enermyHP / realAttack) > Math.ceil(HP / enermyRealAttack)) { //我不能击败敌人
            hidDecision()
            var ing_4 = JSON.parse(ing_4_1)
            ing_4.msg[2] = { msg: userName + "   :  贸然出击肯定没我好果汁吃,先走吧" };
            ing_4.msg[3] = { msg: "接下来你可以通过侧边栏来进行决定了" }
            console.log('[SYSTEM]:加载json↓');
            creatMessage(ing_4);
        } else if (HP <= 10) { //生命值不够
            hidDecision()
            var ing_4 = JSON.parse(ing_4_1)
            ing_4.msg[2] = { msg: userName + "   :  现在生命值太少了,赶紧跑吧" };
            ing_4.msg[3] = { msg: "接下来你可以通过侧边栏来进行决定了" }
            console.log('[SYSTEM]:加载json↓');
            creatMessage(ing_4);
        } else if (realAttack <= 15) { //攻击力不够
            hidDecision();
            var ing_4 = JSON.parse(ing_4_1)
            ing_4.msg[2] = { msg: userName + "   :  打不过吧应该,赶紧跑吧" };
            ing_4.msg[3] = { msg: "接下来你可以通过侧边栏来进行决定了" }
            creatMessage(ing_4);
        } else {
            var ing_4 = JSON.parse(ing_4_1);
            var ing_4_1_1 = `
            {
                "msg": [{
                        "msg": "你准备迎战了!"
                    },
                    {
                        "msg": "${userName}  :  放马过来吧!"
                    }
                ]
            }
            `
            var ing_4_1_1 = JSON.parse(ing_4_1_1);
            for (var i = 0; i < 2; i++) { //把迎战消息加进总消息;
                ing_4.msg[i + 2] = ing_4_1_1.msg[i];
            }
            var ing_4_1_2;
            for (var i = 0; i < round; i++) { //回合战
                if (enermyHP - realAttack >= 0) { //如果不是最后一击
                    ing_4_1_2 = `
                    {
                        "msg": [{
                                "msg": "${userName}给了史莱姆一剑!"
                            },
                            {
                                "msg": "史莱姆生命值-${realAttack},还剩${enermyHP - realAttack}生命值"
                            },
                            {
                                "msg": "史莱姆攻击了${userName}!"
                            },
                            {
                                "msg": "${userName}生命值-${enermyRealAttack},还剩${HP - enermyRealAttack}生命值"
                            }
                        ]
                    }
                    `
                        //计算我和敌人的剩余血量
                    enermyHP = enermyHP - realAttack;
                    HP = HP - enermyRealAttack;
                    var ing_4_1_2 = JSON.parse(ing_4_1_2);
                    for (var j = 0; j <= 3; j++) { //将此回合消息插入总消息中
                        ing_4.msg[ing_4.msg.length] = ing_4_1_2.msg[j];
                    }
                } else { //最后一击
                    ing_4_1_2 = `
                    {
                        "msg": [{
                                "msg": "${userName}给了史莱姆一剑!"
                            },
                            {
                                "msg": "史莱姆生命值-${realAttack},还剩0生命值"
                            },
                            {
                                "msg": "${userName}成功击败了史莱姆!!!"
                            }
                        ]
                    }
                    `
                    var ing_4_1_2 = JSON.parse(ing_4_1_2);
                    for (var j = 0; j <= 2; j++) { //将此胜利消息插入总消息中
                        ing_4.msg[ing_4.msg.length] = ing_4_1_2.msg[j];
                    }
                }
            }
            creatMessage(ing_4); //在消息框显示总消息
        }
    } else {
        var ing_4_2 = `
        {
            "msg": [{                    
                    "msg": "你来到了野外"
                },
                {
                    "msg": "这里似乎什么都没有"
                },
                {
                    "msg": "${userName}  :  好无聊啊,回去了"
                },
                {
                    "msg": "接下来你可以通过侧边栏来进行决定了"
                }
            ]
        }
`
        var ing_4 = JSON.parse(ing_4_2);
        creatMessage(ing_4);
    }
}