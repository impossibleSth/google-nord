// ==UserScript==
// @name           google nord background
// @namespace      pecial Links Converter
// @description    将google界面修改为符合nord颜色的背景
// @version        0.1.4
// @match        https://www.google.com.hk/search*
// ==/UserScript==

(function () {
    var Gr1 = 0; //RGB中的R值...当网页的背景颜色的rgb值分别大于Gr1,Gg1,Gb1时此脚本将把颜色改成目标颜色color
    var Gg1 = 0; //RGB中的G值
    var Gb1 = 0; //RGB中的B值
    var color = "#2E3440"; //改变后的背景颜色
    var searchBoxColor = "#484E59";

    //**********以下代码用户无需修改***********//

    var Gr, Gg, Gb; //全局变量记录当前标签的rgb值,用于比较
    //以下函数用于分解获取的"rgb(255, 255, 255)"格式的rgb

    function FGrgb(Grgb) {
        Grgb = Grgb.replace(/[rgba\(\)]/g, "");
        var kaisi = Grgb.split(",");
        if (kaisi < 3) return;
        Gr = parseInt(kaisi[0]);
        Gg = parseInt(kaisi[1]);
        Gb = parseInt(kaisi[2]);
        //alert(Gr+"|"+Gb+"|"+Gg);
    }

    var Lcolor = ""; //用于记录网页中获取的背景颜色
    //获取并修改body的背景颜色.

    try {
        Lcolor = document.defaultView
            .getComputedStyle(document.body, "")
            .getPropertyValue("background-Color");
    } catch (e) {
        return;
    }

    FGrgb(Lcolor);

    if (
        (Gr > Gr1 && Gg > Gg1 && Gb > Gb1) ||
        Lcolor == "transparent" ||
        (Gr == 0 && Gg == 0 && Gb == 0)
    ) {
        //transparent表示透明
        document.body.style.backgroundColor = color;
    }

    changeAllElementsColor();

    fixAutoPage();

    function changeAllElementsColor() {
        //获取并修改所有标签的背景颜色
        var alltags = document.getElementsByTagName("*");
        var len = alltags.length;
        for (var i = 0; i < len; i++) {
            if (alltags[i].style.backgroundColor == color) {
                continue;
            }

            Lcolor = document.defaultView
                .getComputedStyle(alltags[i], "")
                .getPropertyValue("background-Color");
            FGrgb(Lcolor);
            if (Gr > Gr1 && Gg > Gg1 && Gb > Gb1) {
                alltags[i].style.backgroundColor = color;
            }
        }
    }

    function fixAutoPage() {
        var _bodyHeight = document.body.clientHeight;
        // 创建观察者对象
        var observer = new window.MutationObserver(function (mutations) {
            if (mutations[0].addedNodes) {
                if (document.body.clientHeight > _bodyHeight) {
                    // console.log("--------addedNodes---------");

                    setTimeout(function () {
                        changeAllElementsColor();
                    }, 200);

                    _bodyHeight = document.body.clientHeight;
                }
            }
        });
        observer.observe(document, {
            childList: true,
            subtree: true,
        });
    }

    // 将搜索框变色
    try {
        var element = document.querySelector("[jsname='RNNXgb']");
        element.style.backgroundColor = searchBoxColor;
    } catch (e) {
        return;
    }

    try {
        var element = document.querySelector("[jsname='aajZCb']");
        element.style.backgroundColor = searchBoxColor;
    } catch (e) {
        return;
    }
})();
