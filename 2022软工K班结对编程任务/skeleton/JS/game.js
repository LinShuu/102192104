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

//设置中间公共骰子颜色
let color = 1;

//点击开始投骰子
function f() {
    if (!flag) {
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
        } else {
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
        alert("请先放置上一结果！")
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
    document.getElementById("countbox1").innerText = 0;
    document.getElementById("countbox2").innerText = 0;

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
        if (total1 > total2) {
            setTimeout(function () {
                alert("游戏结束,左边玩家胜利！");
            }, 300);
        } else if (total2 > total1) {
            setTimeout(function () {
                alert("游戏结束,右边玩家胜利！");
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

//设置左右操作互斥锁
let p1 = 1;
let p2 = 0;

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
    if (flag && p1) {
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
            compareDiceLeft();
            countScore();
            judge();
            flag = 0;
            p1 = 0;
            p2 = 1;

        }
    } else {
        alert("请先投骰子再放置！");
    }

}

//右边玩家操作
function fri(event) {
    let id = event.id;
    let i = Math.floor(id / 3) - 3;
    let j = id % 3;
    //下标修正
    if (j == 0) {
        i = i - 1;
        j = 2;
    } else {
        j = j - 1;
    }
    if (flag && p2) {
        if (right[i][j] != 0) {
            alert("此位置已放置骰子，请选择其他位置")
        } else {
            switch (m) {
                case 1:
                    document.getElementById(id).style.backgroundImage = 'url("../pictures/tz/b1.png")';
                    right[i][j] = m;
                    break;
                case 2:
                    document.getElementById(id).style.backgroundImage = 'url("../pictures/tz/b2.png")';
                    right[i][j] = m;
                    break;
                case 3:
                    document.getElementById(id).style.backgroundImage = 'url("../pictures/tz/b3.png")';
                    right[i][j] = m;
                    break;
                case 4:
                    document.getElementById(id).style.backgroundImage = 'url("../pictures/tz/b4.png")';
                    right[i][j] = m;
                    break;
                case 5:
                    document.getElementById(id).style.backgroundImage = 'url("../pictures/tz/b5.png")';
                    right[i][j] = m;
                    break;
                case 6:
                    document.getElementById(id).style.backgroundImage = 'url("../pictures/tz/b6.png")';
                    right[i][j] = m;
                    break;

            }
            compareDiceRight();
            countScore();
            judge();
            flag = 0;
            p1 = 1;
            p2 = 0;
        }
    } else {
        alert("请先投骰子再放置！")
    }
}

