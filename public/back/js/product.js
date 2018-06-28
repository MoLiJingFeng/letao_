

$(function(){
  //1,渲染数据
  var curpage = 1;
  var pageSize = 5;

  render();
  function render(){
    $.ajax({
      type:'get',
      url:'/product/queryProductDetailList',
      data:{
        page:curpage,
        pageSize:pageSize
      },
      dataType:'json',
      success:function( info ){

      }
    })
  }








})



















