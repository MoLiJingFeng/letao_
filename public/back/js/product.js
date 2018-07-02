

$(function(){


  var curpage = 1;
  var pageSize = 2;
  var picArr = []; // 定义一个数组, 专门用于存储所有上传的图片地址


  //1,渲染数据 一进入页面进行一次渲染
  render();
  function render(){
    $.ajax({
      type:'get',
      url:'/product/queryProductDetailList',
      data:{
        page:curpage,
        pageSize:pageSize
      },
        // 如果后台设置了响应头, 设置了 content-type:application/json
        // 前端可以不用设置dataType, jquery 会自动按照 json 格式解析数据
      dataType:'json',
      success:function( info ){
          //console.log(info);
          $('tbody').html(template('productTpl',info ));

          //分页初始化
          $('#paginator').bootstrapPaginator({
              bootstrapMajorVersion: 3,
              totalPages:Math.ceil(info.total / info.size),
              currentPage:info.page,

              // 控件的大小
              size:"mini",

              //配置每个按钮的显示文字
              /**每个按钮, 在初始化时都会调用这个方法, 根据返回值进行设置文本
               *type: 决定了按钮的功能类型, page, 就是普通页面, next, prev, last, first
               *page: 点击该按钮, 跳转到哪一页
               * current: 表示当前是第几页
               */
              itemTexts:function(type, page, current){
                  //console.log(arguments);
                  switch (type) {
                      case "first":
                        return "首页";
                      case "prev":
                        return "上一页";
                      case "next":
                        return "下一页";
                      case "last":
                        return "尾页";
                      case "page":
                        return page;
                  }
              },
              // 配置每个按钮的 title (提示信息.鼠标悬停按钮上显示)
              // 每个按钮都会调用这个方法, 将方法的返回值, 作为 title 的内容
              tooltipTitles:function(type, page, current){
                switch (type){
                    case "first":
                      return "首页";
                    case "prev":
                      return "上一页";
                    case "next":
                      return "下一页";
                    case "last":
                      return "尾页";
                    case "page":
                      return "前往" + page + "页";
                }

              },
              // 使用 bootstrap 的提示框(给上面的title提示信息,添加样式)
              useBootstrapTooltip:true,
              onPageClicked:function (a, b, c, page) {
                  //更新当前页
                  curpage = page;
                  //重新渲染
                  render();
              }
          })
      }
    })
  }


// 2. 点击添加商品显示模态框,并请求二级分类数据.渲染
    $('#addBtn').click(function(){
      $('#addModal').modal('show');
        // 请求所有二级分类数据, 进行渲染下拉菜单
      $.ajax({
          type:'get',
          url:'/category/querySecondCategoryPaging',
          data:{
            page:1,
            pageSize:100
          },
          dataType:'json',
          success:function(info){
            $('.dropdown-menu').html(template('dropdownTpl',info));
          }
      })
    })







})



















