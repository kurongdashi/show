/**
 * Created by Administrator on 2017/2/13.
 */
 $(function () {

    function tabActive() {
        $(".tab_box ul li a").on("click",function () {
            act($(this));
            $(this).children("i").addClass("active");
            $(this).children("p").addClass("act");
        });
        $(".tab_box ul li a").hover(function () {
            //样式改变1
            act($(this));
            $(this).children("i").addClass("active");
            $(this).children("p").addClass("act");
        //    显示选项卡

        });
    }
     tabActive();
    function act($this){
        $(".tab_box ul li a i").removeClass("active");
        $(".tab_box ul li a p").removeClass("act");
    }
    // 3d图片轮播
     var go=true;
    function li_positon() {
        // var data=null;
        //获取json,相对整个文档的路径,因为走了网络请求
        $.getJSON("js/adv.json",function (data) {
                    move_li(data);

                        move(data);
        });

    }
     li_positon();
    //轮播的点击事件
    function move(data){
        //显示前一个，向左走，第一个移除，添加到最后一个
        $(".tab_box .tab_content .prev").on("click",function () {
            if(go){
                go=false;
                data.unshift(data.pop());
                move_li(data);
            }

        });
        //显示后一个，向右走，移除最后一个，添加到第一个
        $(".tab_box .tab_content .next").on("click",function () {
            if(go){
                go=false;
                data.push(data.shift());
                move_li(data);
            }

        });
    }
    //每个li的位置布局
    function move_li(data) {
        $(".tab_box .moving_box li").each(function (i,item) {
            var item=$(item);
            item.animate({
                "opacity":data[i].opacity,
                "left":data[i].left+"px",
                "top":data[i].top+"px",
                "zIndex":data[i].z,
                "width":data[i].width+"px"
            },function () {
                go=true
            });

        });
    }

 });