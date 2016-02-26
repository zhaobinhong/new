/**
 * Created by bankeys-01 on 2016/2/24.
 */

try {
    var page1 = (function () {
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
            page1 = document.getElementById("page1"),
            balance = page1.getElementsByClassName("balanceTextColor")[0];
        totalExpenditure.innerHTML = "总支总计<br/>" + expenditure + ".0";
        totalIncome.innerHTML = "收入总计<br/>" + income + ".0"
        balance.innerHTML = income - expenditure + ".0"


// 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        myChart.hideLoading(); //取消loading
        window.onresize = myChart.resize;
    })();
} catch (e) {
    console.log("Failed to load the page.");
}


try {
    var page2 = (function () {
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

    })();
} catch (e) {
    console.log("Failed to load the page.");
}

try {
    var page3 = (function () {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main3'));
        myChart.showLoading({
            text: '正在努力的读取数据中...'
        }); //loading等待


        /*JSON 数据处理*/
        /*
         var json = [{
         "value": 325,
         "name": "销售"
         }, {
         "value": 310,
         "name": "线上"
         }, {
         "value": 234,
         "name": "商品"
         }];
         */

        function get_data() {
            var data;
            //通过Ajax获取数据
            $.ajax({
                type: "post",
                async: false, //同步执行
                url: "incomePie.json",
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


        function getJSON(x) {
            var vategories = values = null;
            var JSONObj = x;
            var str = "";
            for (var i = 0; i < JSONObj.length; i++) {
                str += JSONObj[i].name + ",";
            }
            ;
            categor = str.substring(0, str.length - 1);
            categories = new Array();
            categories = categor.split(",");
            values = x;

            /*创建表格*/
            (function createEle(str) {
                var statement = document.getElementById("statement3");
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
                    name: '收入类别',
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
                        name: '收入类别',
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
            var statement = document.getElementById("statement3");
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


    })();
} catch (e) {
    console.log("Failed to load the page.");
}