

$(function(){

    // 1. 一进入页面, 发送 ajax 请求, 获取数据, 进行页面渲染
   var curPage = 1;
   var pageSize = 5;

   render();
   function render(){
       $.ajax({
           type:'get',
           url:'/category/querySecondCategoryPaging',
           data: {
               page:curPage,
               pageSize: pageSize
           },
           dataType:'json',
           success:function( info ){

           }
       })
   }




});





























