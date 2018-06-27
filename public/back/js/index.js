

$(function(){


 // 1, echarts1 图表

  // 基于准备好的dom，初始化echarts实例
  var echarts1 = echarts.init(document.querySelector('.echarts1'));

  // 指定图表的配置项和数据
  var option1 = {
    // 大标题
    title: {
      text: '2017年注册人数'
    },
    // 提示框组件
    tooltip: {
      trigger: "item" // 必须要移动到数据项才显示提示框
      //trigger: "axis"   // 必须要移动到数据项才显示提示框
    },
    // 图例
    // data 的值必须和 数据项的 name 的值组合使用, 必须一一比对
    legend: {
      data:['人数']
    },
    // x轴坐标
    xAxis: {
      data: ["1月","2月","3月","4月","5月","6月"]
    },
    // y轴, 没有设置刻度, y轴一般不需要设置刻度, 根据数据自动生成
    yAxis: {},
    // 数据项
    series: [{
      name: '人数',
      // bar 表示柱状图, line 表示折线图, pie 表示饼图
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
    }]
  };

  // 使用刚指定的配置项和数据显示图表。
  echarts1.setOption(option1);


// 2, echarts2 图表

  // 基于准备好的dom，初始化echarts实例
  var echarts2 = echarts.init(document.querySelector('.echarts2'));
  // 指定图表的配置项和数据
  var option2 = {
    // 大标题
    title : {
      text: '热门品牌销售',
      //子标题
      subtext: '2018年6月',
      //控制标题水平方向居中
      x:'center'
    },
    //提示框组件
    tooltip : {
      //item 数据项触发,用于饼图
      trigger: 'item',
      // 指定 提示框 组件的文本的(可写html标签)
      // {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    //图例
    legend: {
      //控制图例的显示方向, horizontal 水平排列
      orient: 'vertical',
      left: 'left',
      data: ['耐克','阿迪','新百伦','李宁','阿迪王']
    },
    //系列名称,里面放数据项的集合
    series : [
      {
        name: '品牌',
        type: 'pie',
        // 圆直径的长度
        radius : '55%',
        // 圆心的位置, x, y(在当前容器内的位置)
        center: ['50%', '60%'],
        data:[
          {value:335, name:'耐克'},
          {value:310, name:'阿迪'},
          {value:234, name:'新百伦'},
          {value:135, name:'李宁'},
          {value:1548, name:'阿迪王'}
        ],
        // 设置阴影
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  // 使用刚指定的配置项和数据显示图表。
  echarts2.setOption(option2)

})