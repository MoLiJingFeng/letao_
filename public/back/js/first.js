$(function () {

  // 1 一进入页面, 需要发送ajax, 请求数据, 进行页面渲染
  var curpage = 1; // 当前页
  var pageSize = 2; // 每页多少条

  render();
  function render() {
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: curpage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {
        $('tbody').html(template('fTmp', info));

        //分页初始化
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          totalPages: Math.ceil(info.total / info.size),
          currentPage:info.page,
          onPageClicked:function( a, b, c, page){
            curpage = page;
            render();
          }
        })
      }
    })
  }

  //2. 添加分类
  $('#addBtn').click(function(){
    $('#addModal').modal('show')

  })




})























