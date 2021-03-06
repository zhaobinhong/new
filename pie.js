// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main2'));
myChart.showLoading({
    text: '正在努力的读取数据中...'
}); //loading等待


/*    var categories = ['餐饮', '进货', '吃饭', '唱歌', '喝酒'];
 var values = [{
 "value": 325,
 "name": "餐饮"
 }, {
 "value": 310,
 "name": "进货"
 }, {
 "value": 234,
 "name": "吃饭"
 }, {
 "value": 135,
 "name": "唱歌"
 }, {
 "value": 1548,
 "name": "喝酒"
 }];*/


/*JSON 数据处理*/


function get_data() {
    var data;
    //通过Ajax获取数据
    $.ajax({
        type: "post",
        async: false, //同步执行
        url: "data.json",
        contentType: "application/json",
        dataType: "json", //返回数据形式为json
        success: function (result) {
            if (result) {
                data = result;
            }
        },
        error: function (errorMsg) {
            alert("数据加载失败！");
            return false;
        }
    });
    return data;
}

var json = get_data();
/*    var jObj = eval(json);
 console.log(jObj);
 var str = "";
 for (var i = 0; i < jObj.length; i++) {

 str += jObj[i].name + ",";
 };
 var categories = "[" + str.substring(0, str.length - 1) + "]";
 console.log(categories);
 var values = json;*/


function getJSON(x) {

    var JSONObj = x;
    var str = "";
    for (var i = 0; i < JSONObj.length; i++) {
        str += JSONObj[i].name + ",";
    }
    categor = str.substring(0, str.length - 1);
    categories = new Array();
    categories = categor.split(",");
    values = x;

    /*创建表格*/
    (function createEle(str) {

        var statement = document.getElementById("statement");
        var tableTr = "<tr class='tableHeader'>";
        tableTr += "<td>类别</td><td>金额</td><td>比例</td></tr>";

        var string = "";
        var num = null;
        for (var i = 0; i < str.length; i++) {
            str[i].i = i;
            if (i < 1) {
                for (var j = 0; j < str.length; j++) {
                    num += str[j].value;
                }
            }
            (function (i) {
                var b = (str[i].value / num).toFixed(4),
                    c = null;
                if (b != 1) {
                    c = b.slice(2, 4) + "." + b.slice(4, 6) + "%";
                } else {
                    c = b * 100 + "%";
                }
                string += "<tr><td>" + str[i].name + "</td><td>" + str[i].value + "</td><td>" + c + "</td></tr>";
                return string;
            })(i);
        }

        tableTr += string;
        statement.innerHTML = tableTr;

    })(values);

    return categories, values
}


// 同步执行
/*
 $.ajaxSettings.async = false;

 // 加载数据
 $.getJSON('${ctx}/dataAccessServlet', function (json) {
 categories = json.categories;
 values = json.values;
 });
 */

getJSON(json);

// 指定图表的配置项和数据
var option = {
    baseOption: {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            top: "100",
            right: "30",
            textStyle: {
                fontSize: '18'
            },
            data: categories
        },
        series: [{
            name: '支出类别',
            type: 'pie',
            radius: ['50%', '20%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {

                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false

                }
            },
            data: values

        }]
    },
    //自适应
    media: [{
        query: {
            minWidth: 300,
            maxWidth: 1024
        },
        option: {
            legend: {
                right: 0,
                top: 0,
                textStyle: {
                    fontSize: '10'
                },
                data: categories,
                orient: 'vertical' // legend 横向布局。horizontal
            },
            series: [{
                name: '支出类别',
                type: 'pie',
                radius: ['84%', '30%'],
                center: ["48%", "50%"],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '18',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: values
            }


            ]
        }
    }]
};


// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);

myChart.hideLoading(); //取消loading


//随屏幕变化

window.onresize = myChart.resize;


(function clickColor() {
    var statement = document.getElementById("statement");
    var trs = statement.getElementsByTagName("tr");
    if (trs.length > 1) {
        for (var i = 1; i < trs.length; i++) {
            trs[i].i = i;
            trs[i].onclick = function () {
                for (var j = 1; j < trs.length; j++) {
                    trs[j].style.backgroundColor = "";
                }
                this.style.backgroundColor = "#efe8ec";
            }

        }
    }

})();
/*请求数据*/
/* function setChartPie(url){
 myChart.showLoading({text: '正在努力的读取数据中...'  });
 var label=[];
 var value=[];
 $.ajax({
 url:url,
 dataType:"json",
 success:function(data){
 $.each(data,function(i,p){
 label[i]=p['label'];
 value[i]={'name':p['label'],'value':p['value']};
 });
 myChart.hideLoading();
 option.baseOption.legend.data=label;
 option.baseOption.series[0]['data']=value;
 option.baseOption.series[0]['radius']=[0,100];
 myChart.setOption(option);
 }
 });

 }*/

/*setChartPie("text.txt");*/