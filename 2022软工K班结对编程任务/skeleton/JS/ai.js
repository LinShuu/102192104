const left = Array(3).fill(0).map(x => Array(3).fill(0));
const right = Array(3).fill(0).map(x => Array(3).fill(0));
//设置flag作为投掷和放置的互斥
let flag = 0;
//用于存放每次投骰子的结果
let m;
//用于判断九宫格是否下满
let countleft, countright = 0;
//用于统计分数
let total1 = 0;
let total2 = 0;
//用于判断是否轮到ai操作
let ai = 0
//设置中间公共骰子颜色
let color = 1;
//选择完先后手才能开始进行游戏，设置一个信号量来加锁
let choose = 0;
//先后手按钮容器
let beforebutton = document.getElementById("beforebutton");
let afterbutton = document.getElementById("afterbutton");
//其他隐藏组件
let box0 = document.getElementById("box0");
let countbox1 = document.getElementById("countbox1");
let countbox2 = document.getElementById("countbox2");
let bj = document.getElementById("bj");
function before(){
    choose = 1;
    bj.style.backgroundImage = 'url("../pictures/bj.png")';
    beforebutton.style.visibility = "hidden";
    afterbutton.style.visibility = "hidden";
    box0.style.visibility = "visible"
    countbox1.style.visibility = "visible";
    countbox2.style.visibility = "visible";
}

function after() {
    choose = 1;
    ai = 1;
    bj.style.backgroundImage = 'url("../pictures/bj.png")';
    beforebutton.style.visibility = "hidden";
    afterbutton.style.visibility = "hidden";
    box0.style.visibility = "visible"
    countbox1.style.visibility = "visible";
    countbox2.style.visibility = "visible";
    color = 0;
    setTimeout(function () {
        computer();
    }, 1000);

}

//投骰子操作
function f() {
    if (!flag && choose) {
        // 随机数定义结果
        m = Math.floor(Math.random() * 6) + 1;
        if(color == 1){
            document.getElementById('ds').style.backgroundImage = 'url("../pictures/dicel.gif")';
        }else{
            document.getElementById('ds').style.backgroundImage = 'url("../pictures/dicer.gif")';
        }
        setTimeout(function () {
            if (color == 1) {
                switch (m) {
                    case 1:
                        document.getElementById('ds').style.backgroundImage = 'url("../pictures/tz/le1.png")';
                        flag = 1;
                        break;
                    case 2:
                        document.getElementById('ds').style.backgroundImage = 'url("../pictures/tz/le2.png")';
                        flag = 1;
                        break;
                    case 3:
                        document.getElementById('ds').style.backgroundImage = 'url("../pictures/tz/le3.png")';
                        flag = 1;
                        break;
                    case 4:
                        document.getElementById('ds').style.backgroundImage = 'url("../pictures/tz/le4.png")';
                        flag = 1;
                        break;
                    case 5:
                        document.getElementById('ds').style.backgroundImage = 'url("../pictures/tz/le5.png")';
                        flag = 1;
                        break;
                    case 6:
                        document.getElementById('ds').style.backgroundImage = 'url("../pictures/tz/le6.png")';
                        flag = 1;
                        break;
                }
                color = 0;
            }else{
                switch (m) {
                    case 1:
                        document.getElementById('ds').style.backgroundImage = 'url("../pictures/tz/ri1.png")';
                        flag = 1;
                        break;
                    case 2:
                        document.getElementById('ds').style.backgroundImage = 'url("../pictures/tz/ri2.png")';
                        flag = 1;
                        break;
                    case 3:
                        document.getElementById('ds').style.backgroundImage = 'url("../pictures/tz/ri3.png")';
                        flag = 1;
                        break;
                    case 4:
                        document.getElementById('ds').style.backgroundImage = 'url("../pictures/tz/ri4.png")';
                        flag = 1;
                        break;
                    case 5:
                        document.getElementById('ds').style.backgroundImage = 'url("../pictures/tz/ri5.png")';
                        flag = 1;
                        break;
                    case 6:
                        document.getElementById('ds').style.backgroundImage = 'url("../pictures/tz/ri6.png")';
                        flag = 1;
                        break;
                }
                color = 1;
            }
        },500);
    } else {
        if (flag) {
            alert("请先放置上一结果！")
        }else{
            alert("请先选择先后手顺序！")
        }
    }
}

//下左边九宫格消除右边
function compareDiceLeft() {
    let m;
    for (let i = 0; i < left.length; i++) {
        for (let j = 0; j < left[i].length; j++) {
            for (let k = 0; k < 3; k++) {
                if (left[i][j] == right[i][k]) {
                    right[i][k] = 0;
                    //计算对应的id值
                    m = i * 3 + k + 10;
                    document.getElementById(m).style.backgroundImage = 'url("../pictures/transparent.png")';
                }
            }
        }
    }
}

//下右边九宫格消除左边
function compareDiceRight() {
    let m;
    for (let i = 0; i < right.length; i++) {
        for (let j = 0; j < right[i].length; j++) {
            for (let k = 0; k < 3; k++) {
                if (right[i][j] == left[i][k]) {
                    left[i][k] = 0;
                    //计算对应的id值
                    m = i * 3 + k + 1;
                    document.getElementById(m).style.backgroundImage = 'url("../pictures/transparent.png")';
                }
            }
        }
    }
}

//计算分数
function countScore() {
    total1 = 0;
    total2 = 0;
    //左边九宫格计分
    for (let i = 0; i < left.length; i++) {
        if ((left[i][0] == left[i][1]) && (left[i][1] == left[i][2])) {
            total1 = total1 + left[i][0] * 9;
        } else if (left[i][0] == left[i][1]) {
            total1 = total1 + left[i][0] * 4 + left[i][2];
        } else if (left[i][1] == left[i][2]) {
            total1 = total1 + left[i][1] * 4 + left[i][0];
        } else if (left[i][0] == left[i][2]) {
            total1 = total1 + left[i][0] * 4 + left[i][1];
        } else {
            total1 = total1 + left[i][0] + left[i][1] + left[i][2]
        }
    }
    document.getElementById("countbox1").innerText = total1;

    //右边九宫格计分
    for (let i = 0; i < right.length; i++) {
        if ((right[i][0] == left[i][1]) && (right[i][1] == left[i][2])) {
            total2 = total2 + right[i][0] * 9;
        } else if (right[i][0] == right[i][1]) {
            total2 = total2 + right[i][0] * 4 + right[i][2];
        } else if (right[i][1] == right[i][2]) {
            total2 = total2 + right[i][1] * 4 + right[i][0];
        } else if (right[i][0] == right[i][2]) {
            total2 = total2 + right[i][0] * 4 + right[i][1];
        } else {
            total2 = total2 + right[i][0] + right[i][1] + right[i][2]
        }
    }
    document.getElementById("countbox2").innerText = total2;


}

//重新游戏，清除所有已放置的骰子
function clearDice() {
    for (let k = 0; k < left.length; k++) {
        for (let l = 0; l < left[k].length; l++) {
            left[k][l] = 0;
            right[k][l] = 0;
        }
    }
    for (let i = 1; i < 19; i++) {
        document.getElementById(i).style.backgroundImage = 'url("../pictures/transparent.png")';
    }
    //重置计分板
    document.getElementById("countbox1").innerText = 0;
    document.getElementById("countbox2").innerText = 0;
    //显示先后手按钮
    buttonbox.style.visibility = "visible";

}

//判断是否结束游戏
function judge() {
    for (let k = 0; k < left.length; k++) {
        for (let l = 0; l < left[k].length; l++) {
            if (left[k][l] != 0) {
                countleft++;
            }
            if (right[k][l] != 0) {
                countright++;
            }
        }
    }
    if (countleft == 9 || countright == 9) {
        ai = 0;
        if (total1 > total2) {
            setTimeout(function () {
                alert("游戏结束,玩家胜利！");
            }, 300);
        } else if (total2 > total1) {
            setTimeout(function () {
                alert("游戏结束,电脑胜利！");
            }, 300);
        } else {
            setTimeout(function () {
                alert("游戏结束,双方平局！");
            }, 300);
        }
        setTimeout(function () {
            clearDice();
        }, 500);
    }
    countleft = 0;
    countright = 0;
}

//左边玩家操作
function fl(event) {
    let id = event.id;
    //计算二维数组行下标
    let i = Math.floor(id / 3);
    //计算二维数组列下标
    let j = id % 3;
    //下标修正
    if (j == 0) {
        i = i - 1;
        j = 2;
    } else {
        j = j - 1;
    }
    if (flag) {
        if (left[i][j] != 0) {
            alert("此位置已放置骰子，请选择其他位置")
        } else {
            switch (m) {
                case 1:
                    document.getElementById(id).style.backgroundImage = 'url("../pictures/tz/r1.png")';
                    left[i][j] = m;
                    break;
                case 2:
                    document.getElementById(id).style.backgroundImage = 'url("../pictures/tz/r2.png")';
                    left[i][j] = m;
                    break;
                case 3:
                    document.getElementById(id).style.backgroundImage = 'url("../pictures/tz/r3.png")';
                    left[i][j] = m;
                    break;
                case 4:
                    document.getElementById(id).style.backgroundImage = 'url("../pictures/tz/r4.png")';
                    left[i][j] = m;
                    break;
                case 5:
                    document.getElementById(id).style.backgroundImage = 'url("../pictures/tz/r5.png")';
                    left[i][j] = m;
                    break;
                case 6:
                    document.getElementById(id).style.backgroundImage = 'url("../pictures/tz/r6.png")';
                    left[i][j] = m;
                    break;

            }
            ai = 1;
            compareDiceLeft();
            countScore();
            judge();
            flag = 0;
            setTimeout(function () {
                computer();
            }, 1000);
        }
    } else {
        alert("请先投骰子再放置！");
    }

}

//退出循环判断标志位
let flag1 = 0;

//AI操作
function computer() {
    if (ai) {
        f();
        //随机数大于等于3的时候再考虑效益较大
        if (m >= 3) {
            //如果投到与对某行点数相同的随机数时，优先消除
            for (let i = 0; i < left.length; i++) {
                if (flag1) {
                    break;
                }
                for (let j = 0; j < left[i].length; j++) {
                    if (flag1) {
                        break;
                    }
                    if (left[i][j] == m) {
                        for (let k = 0; k < 3; k++) {
                            if (flag1) {
                                break;
                            }
                            if (right[i][k] == 0) {
                                right[i][k] = m;
                                let id = i * 3 + k + 10;
                                fri(id);
                            }
                        }
                    }

                }
            }
            //如果上述情况未发生
            if (!flag) {
                //其次考虑将骰子放在我方已有相同点数的行上
                for (let i = 0; i < left.length; i++) {
                    if (flag1) {
                        break;
                    }
                    for (let j = 0; j < left[i].length; j++) {
                        if (flag1) {
                            break;
                        }
                        if (right[i][j] == m) {
                            for (let k = 0; k < 3; k++) {
                                if (flag1) {
                                    break;
                                }
                                if (right[i][k] == 0 && (k != j)) {
                                    right[i][k] = m;
                                    let id = i * 3 + k + 10;
                                    fri(id);
                                }
                            }
                        }

                    }

                }
            }
            //当随机数大于等于3时，如果上述操作均未发生，采取如下操作
            if (!flag1) {
                let count = 0;
                //9个数，但是数组从下标为1的位置开始存，故数组大小设置为10
                let arr = new Array(10);
                for (let i = 0; i < right.length; i++) {
                    for (let j = 0; j < right[i].length; j++) {
                        if (right[i][j] == 0) {
                            count++;
                            arr[count] = i * 3 + j + 10;
                        }
                    }

                }
                let n = Math.floor(Math.random() * count) + 1;
                let id = arr[n];
                fri(id);
            }

        } else {//当随机数小于3时采取如下操作
            let count = 0;
            let arr = new Array(10);
            for (let i = 0; i < right.length; i++) {
                for (let j = 0; j < right[i].length; j++) {
                    if (right[i][j] == 0) {
                        count++;
                        arr[count] = i * 3 + j + 10;
                    }
                }

            }
            let n = Math.floor(Math.random() * count) + 1;
            let id = arr[n];
            fri(id);

        }
        setTimeout(function () {
            flag1 = 0;
            compareDiceRight();
            countScore();
            judge();
            flag = 0;
            ai = 0;
        },600);

    }
}

//电脑放置骰子
function fri(id) {
    let i = Math.floor(id / 3) - 3;
    let j = id % 3;
    //下标修正
    if (j == 0) {
        i = i - 1;
        j = 2;
    } else {
        j = j - 1;
    }
    switch (m) {
        case 1:
            setTimeout(function () {
                document.getElementById(id).style.backgroundImage = 'url("../pictures/tz/b1.png")';
            }, 600);
            right[i][j] = m;
            flag1 = 1;
            break;
        case 2:
            setTimeout(function () {
                document.getElementById(id).style.backgroundImage = 'url("../pictures/tz/b2.png")';
            }, 600);
            right[i][j] = m;
            flag1 = 1;
            break;
        case 3:
            setTimeout(function () {
                document.getElementById(id).style.backgroundImage = 'url("../pictures/tz/b3.png")';
            }, 600);
            right[i][j] = m;
            flag1 = 1;
            break;
        case 4:
            setTimeout(function () {
                document.getElementById(id).style.backgroundImage = 'url("../pictures/tz/b4.png")';
            }, 600);
            right[i][j] = m;
            flag1 = 1;
            break;
        case 5:
            setTimeout(function () {
                document.getElementById(id).style.backgroundImage = 'url("../pictures/tz/b5.png")';
            }, 600);
            right[i][j] = m;
            flag1 = 1;
            break;
        case 6:
            setTimeout(function () {
                document.getElementById(id).style.backgroundImage = 'url("../pictures/tz/b6.png")';
            }, 600);
            right[i][j] = m;
            flag1 = 1;
            break;

    }
}

