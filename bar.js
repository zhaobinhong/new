var myChart = echarts.init(document.getElementById('main'));


myChart.showLoading({
    text: '正在努力的读取数据中...'
}); //loading等待

//creation Data
var categories = ['支出', '收入'];


function get_data() {
    var data;
    //通过Ajax获取数据
    $.ajax({
        type: "post",
        async: false, //同步执行
        url: "bar.json",
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
/*var json = [{
 "income": 9200,
 "expenditure": 5355
 }];*/

var income = expenditure = null;

function getJSON(x) {
    var array = new Array();
    income = (x[0].income).toString();
    income = new Array(income);
    expenditure = (x[0].expenditure).toString();
    expenditure = new Array(expenditure);
    return income, expenditure;
}


getJSON(json);


option = {
    //轴
    tooltip: {
        trigger: '' // 加上参数axis 则有轴  
    },
    toolbox: {
        show: false, //工具栏
        feature: {
            mark: {
                show: true
            },
            dataView: {
                show: true,
                readOnly: false
            },
            magicType: {
                show: true,
                type: ['line', 'bar']
            },
            restore: {
                show: true
            },
            saveAsImage: {
                show: true
            }
        }
    },
    calculable: true,
    legend: {
        data: categories,
        bottom: "0",
        right: "38"
    },
    xAxis: [{
        type: 'category',
        data: ['']
    }],
    yAxis: [{
        type: 'value',
        name: '',
        min: 0,

        interval: 1000,
        axisLabel: {
            formatter: '{value}'
        }
    }, {
        type: 'value',
        name: '',
        min: 0,

        interval: 1000,
        axisLabel: {
            formatter: '{value}'
        }
    }],

    grid: {
        x: 50
    }, //x:,x2,y,y2
    series: [

        {
            name: '支出',
            type: 'bar',
            data: expenditure,
            barWidth: 60,
            itemStyle: {

                normal: {

                    color: function (params) {
                        // build a color map as your need.
                        var colorList = [
                            "#d86052"
                        ];
                        return colorList[params.dataIndex]
                    },
                    label: {
                        show: true
                    }
                }
            }
        }, {
            name: '收入',
            type: 'bar',
            barWidth: 60,
            data: income,
            itemStyle: {
                normal: {
                    color: function (params) {
                        // build a color map as your need.
                        var colorList = [
                            "#6db988"
                        ];
                        return colorList[params.dataIndex]
                    },
                    label: {
                        show: true
                    }
                }
            }
        }
        /*  , {
         name:'平均温度',
         type:'line',
         yAxisIndex: 1,
         data:[2.0]
         }*/
    ]
};

/* tableDataLoading */

var totalExpenditure = document.getElementById("expenditure"),
    totalIncome = document.getElementById("income"),
    page1=document.getElementById("page1"),
    balance = page1.getElementsByClassName("balanceTextColor")[0];
totalExpenditure.innerHTML = "总支总计<br/>" + expenditure + ".0";
totalIncome.innerHTML = "收入总计<br/>" + income + ".0"
balance.innerHTML = income - expenditure + ".0"


// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);
myChart.hideLoading(); //取消loading
window.onresize = myChart.resize;