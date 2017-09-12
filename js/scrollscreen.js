/**
 * Created by Administrator on 2017/6/19.
 */
$(function () {
    in_animate_1();
    var height=$(window).height();
    //定义一个标志位向下滚动
    var down;
    var completed=true;
    $(window).on("scroll",function () {
        //先获取一下当前top值
        if(completed){
            completed=false;
            var scrolltop1=$(document).scrollTop();

            setTimeout(function () {
                var scrolltop2=$(document).scrollTop();
                var scroll=scrolltop2-scrolltop1;
                if(scroll>0){
                    //向下滚动
                    down=true;
                }else{
                    down=false;
                }
                set_position(scrolltop2);
            },100)

        }
    });
    function set_position(scrolltop) {
        //判断当前是第几屏 从0 开始
        var current_screen;
        if(down){
            current_screen=Math.floor(scrolltop/height)+1;
        }else{
            //向上滚动，向上取整
            current_screen=Math.ceil(scrolltop/height)-1;
        }
        //要滚动到第几屏
        var position=current_screen*height;
        //滚屏动画执行
        $("html,body").animate({"scrollTop":position},function () {
            $(this).stop(true,false);
            setTimeout(function () {
                completed=true;
                //执行完成后再获取一次top值
                var temptop=$(document).scrollTop();
                //滚动到当前屏后，屏中内容所做操作
                screen_option(temptop);
            },100)
        });

    }
    function screen_option(temptop) {
        switch (temptop){
            case 0:
                in_animate_1();
                out_animate_2();
                break;
            case 1*height:
                in_animate_2();
                out_animate_1();
                break;
            case 2*height:
                out_animate_2();
                out_animate_1();
                break;
        }

    }

    function in_animate_1() {
        $("body>ul>li .media_box").fadeIn();
        $("body>ul>li .media_box").addClass("move");

    }
    function out_animate_1() {
        $("body>ul>li .media_box").removeClass("move");
        $("body>ul>li .media_box").fadeOut();
    }

    function in_animate_2() {
        $("body>ul>li:nth-child(2) .bg").addClass("scale");

        $(".advantage").addClass("scale2")
          $(".advantage").fadeIn();
    }

    function out_animate_2() {
        $(".advantage").fadeOut();
        $(".advantage").removeClass("scale2")

        $("body>ul>li:nth-child(2) .bg").removeClass("scale");
    }

});