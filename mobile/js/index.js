/**
 * Created by Administrator on 2017/4/19.
 */
$(function () {
    scrool_top();
});
//根据点击改变导航栏的样式
function nav_style(count) {
    $(".container ul li a").removeClass("active");
    $(".container ul li a").eq(count).addClass("active");
}

//对导航栏头部设置paddingTop
function scrool_top() {
    var headerHeight=$(".header").height()+5;
    $(".screen").css("paddingTop",headerHeight+"px");

}
//初始化时要显示page1,同时调整footer高度
window.onload=function () {
    //footer 默认在最大高度viewpager的下面，向上走为负值，h2为最大
    footer_height(getViewPager_height(0));
    // touch_move();
}
//判断当前要显示哪一个页面
function switchItem(str) {
    var count;
    switch (str){
        case "gs":
            count=0;
            break;
        case "gg":
            count=1;
            change_nav(0)
            break;
        case "mj":
            count=2;
            change_nav(0)
            break;
        case "wm":
            count=3;
            change_nav(-getScreenWidth()/3)
            break;
        case "dl":
            count=4;
            break;
    }

    change_footer(count);
    //移动页面
    move_page(count)
}
function change_nav(left) {
    $(".nav").animate({"left":left+"px"});
}
//改变导航栏对应页面
function change_footer(count) {
    nav_style(count);
    footer_height(getViewPager_height(count));
}
//移动页面
function move_page(count) {
    var w=getScreenWidth();
    $(".page_count").animate({"left":-count*w+"px"},function () {
        $(this).stop(true,false);
    });
}

//返回当前显示的viewpager的高度
function getViewPager_height(count) {
    switch (count){
        case 0:
            return $(".viewpager1").height();
            break;
        case 1:
            return $(".viewpager2").height();
            break;
        case 2:
            return $(".viewpager3").height();
            break;
        case 3:
            return $(".viewpager4").height();
            break;
        case 4:
            return $(".viewpager5").height();
            break;

    }
}
//调整footer的高度，
function footer_height(h1) {
    //以h2的高度为参考，调整footer的高度
    var h2=$(".viewpager2").height();

    var fh=$(".footer_box").height();
    var hh=$(".header").height()+5;
    //每个页面的viewpager的高度不同，所以每次切换页面后都要重新设置container的高度
    var ch=h1+fh+hh;
    $(".container").css("height",ch+"px");
    //调整footer高度
    var h=h1-h2;
    $(".footer_box").css("top",h+"px");
    scrool_top();

}
//返回当前屏幕的宽度
function getScreenWidth() {
    return $(window).width();
}







//viewpager的touch事件
function touch_move() {
    var w=getScreenWidth();
    var startX=0;
    var currentLeft;
    var dx;
    $(".page_count").on("touchstart",function (e) {
        startX=e.originalEvent.touches[0].clientX;
        currentLeft=$(this).offset().left;

    });
    $(".page_count").on("touchmove",function (e) {
         dx=e.originalEvent.touches[0].clientX-startX;
         if(Math.abs(dx)<50){
             //防止抖动
             dx=0;
         }
        var pos=currentLeft+dx;
        pos=check(pos);
        $(this).css("left",pos+"px");

    })
    $(".page_count").on("touchend",function (e) {
        var pos;
        var flag=1;
            if(dx>0){
                //end>start  start点在左边，end点在右边，手指向右滑动
                flag=1
            }else if(dx<=0){
                //手指向左滑动
                flag=-1
            }
            if(Math.abs(dx)<w/3){
                //返回原来位置
                $(".page_count").animate({"left":currentLeft+"px"});
                pos=currentLeft;
            }else{
            //    滑动到下一张
                 pos=check(currentLeft+flag*w);

                $(".page_count").animate({"left":pos+"px"})
            }
        //    校正底部footer位置
        var count=Math.abs(pos)/w;
        change_footer(count);
    });
    //移动后位置校验
    function check(pos) {
        console.log("pos="+pos);
        //最左边限制,pos>0向page_count向右移动
       pos=pos>0?0:pos;
        //最右边限制
       pos=pos<-4*w?-4*w:pos;
        return pos;

    }
}


