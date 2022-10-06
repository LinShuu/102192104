function popDiv() {
    // 获取div元素
    let popBox = document.getElementById("popDiv");
    let popLayer = document.getElementById("popLayer");
    let box1 = document.getElementById("box1");
    let box2 = document.getElementById("box2");

    // 控制两个div的显示与隐藏
    popBox.style.display = "block";
    popLayer.style.display = "none";

    //设置无关元素隐藏
    box1.style.visibility = "hidden";
    box2.style.visibility = "hidden";
}

function closePop() {
    // 获取弹出窗口元素
    let popDiv = document.getElementById("popDiv");
    popDiv.style.display = "none";
    popLayer.style.display = "block";
    box1.style.visibility = "visible";
    box2.style.visibility = "visible";
}