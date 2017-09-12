/**
 * Created by Administrator on 2017/2/16.
 */
$(function () {
   // 显示注册公司
   function show() {
        $(".form_row .form_cont p:eq(0) input").on("click",function () {
                $("#company_row").css("display","none");
        });
       $(".form_row .form_cont p:eq(1) input").on("click",function () {
           $("#company_row").css("display","block");
       });
   }
   show();


});