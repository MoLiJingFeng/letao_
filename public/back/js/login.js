


 // 1. 进行表单校验配置
 /*校验要求:
  *   (1) 用户名不能为空, 长度为2-6位
  *   (2) 密码不能为空, 长度为6-12位
  */
$(function(){
    // 表单校验初始化
    $('#form').bootstrapValidator({

        //配置图标
        feedbackIcons:{
            valid:'glyphicon glyphicon-ok',  // 校验成功
            invalid:'glyphicon glyphicon-remove', // 校验失败
            validating:'glyphicon glyphicon-refresh'  // 校验中
        },
        // 指定校验字段
        fields: {
            username: {
                // 配置校验规则
                validators: {
                    // 配置非空校验
                    notEmpty: {
                        message:'用户名不能为空'
                    },
                    // 配置长度校验
                    stringLength: {
                        min:2,
                        max:6,
                        message:'用户名长度必须在 2-6位'
                    },
                    callback:{
                        message:'用户名不存在'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty:{
                        message:'密码不能为空'
                    },
                    stringLength:{
                        min:6,
                        max:12,
                        message:'密码长度必须在 6-12位'
                    },
                    callback:{
                        message:'密码错误'
                    }
                }
            }
        }
    });

});


// 2.注册表单校验成功事件
 /**使用 submit 按钮进行提交,表单校验插件会在提交时,进行校验,
  *
  * (1)注册表单校验成功,在成功事件内,先阻止默认的表单提交, 通过 ajax 进行提交
  * (2)校验失败,会提示用户,输入有误
  */
 $('#form').on('success.form.bv',function(e){
     e.preventDefault(); // 阻止默认的表单提交
     //通过ajax进行请求
     $.ajax({
         type:'post',
         url:'/employee/employeeLogin',
         // 表单序列化, 快速收集表单提交内容, 进行提交, input 必须设置 name 属性
         data:$('#form').serialize(),
         dataType:'json',
         success:function( info ){
            if( info.success ){
                //登陆成功, 跳转到首页
                location.href = "index.html";
            }
            //如果失败,则更改两个框的状态
            if( info.error === 1000 ){
            // 将 username 的校验状态, 置成 校验失败状态, 并提示 用户名不存在
                $('#form').data('bootstrapValidator').updateStatus('username','INVALID','callback')
            }
            if( info.error === 1001 ){
             //将 password 的校验状态, 置成 校验失败状态, 并提示 密码错误
            $('#from').data('bootstrapValidator').updateStatus('password','INVALID','callback');
            }
         }
     })
 })
 //updateStatus()方法参数详解
 /**
  * 参数1:字段名(要校验的字段)
  * 参数2:校验状态, VALID 校验成功  INVALID 校验失败  NOT_VALIDATED 未校验
  * 参数3:配置提示信息, 需要传校验规则
  */



// 3.重置表单bug,
 //点击重置时,不仅重置表单内容,还要重置校验状态
// 调用插件提供的方法, 进行重置校验状态
// resetForm 不传 true, 只重置校验状态, 传true还会将表单内容重置
 $('[type="reset"]').click(function(){
    $('#from').data('bootstrapValidator').resetForm();
 })







