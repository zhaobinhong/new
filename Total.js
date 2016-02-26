/**
 * Created by bankeys-01 on 2016/2/19.
 */
var myChart = echarts.init(document.getElementById('main'));


myChart.showLoading({
    text: '正在努力的读取数据中...'
}); //loading等待

//creation Data
var categories = ['银行卡', '微信', '支付宝', 'QQ钱包', '百度钱包'];


function get_data() {
    var data;
    //通过Ajax获取数据
    $.ajax({
        type: "post",
        async: false, //同步执行
        url: "Total.json",
        contentType: "application/json",
        dataType: "json", //返回数据形式为json
        success: function (result) {
            if (result) {
                data = result;
            }
        },
        error: function (errorMsg) {
            console.log("数据加载失败！");
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

var BankCard = WeChat = AliPay = QQWallet = BaiduWallet = null;

//数据格式
/*
 [
 {
 "BankCard": 9200,
 "WeChat": 5355,
 "AliPay": 3350,
 "QQWallet": 7200,
 "BaiduWallet": 3585
 }
 ]
 */

function getJSON(x) {

    BankCard = (x[0].BankCard).toString();
    BankCard = new Array(BankCard);

    WeChat = (x[0].WeChat).toString();
    WeChat = new Array(WeChat);

    AliPay = (x[0].AliPay).toString();
    AliPay = new Array(AliPay);

    QQWallet = (x[0].QQWallet).toString();
    QQWallet = new Array(QQWallet);

    BaiduWallet = (x[0].BaiduWallet).toString();
    BaiduWallet = new Array(BaiduWallet);

    return BankCard, WeChat, AliPay, QQWallet, BaiduWallet;
}


if (json) {
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
            orient: 'horizontal',
            itemGap: 10,
            data: categories,
            bottom: "0",
            x: 'center'/*,
             y:"top"*/
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
            x: "50"
        }, //x:,x2,y,y2
        series: [

            {
                name: '银行卡',
                type: 'bar',
                data: BankCard,
                barWidth: 32,
                itemStyle: {

                    normal: {

                        color: function (params) {
                            // build a color map as your need.
                            var colorList = [
                                "#019b8b"
                            ];
                            return colorList[params.dataIndex]
                        },
                        label: {
                            show: true
                        }
                    }
                }
            }, {
                name: '微信',
                type: 'bar',
                barWidth: 32,
                data: WeChat,
                itemStyle: {
                    normal: {
                        color: function (params) {
                            // build a color map as your need.
                            var colorList = [
                                "#44b336"
                            ];
                            return colorList[params.dataIndex]
                        },
                        label: {
                            show: true
                        }
                    }
                }
            }, {
                name: '支付宝',
                type: 'bar',
                data: AliPay,
                barWidth: 32,
                itemStyle: {

                    normal: {

                        color: function (params) {
                            // build a color map as your need.
                            var colorList = [
                                "#2f90d8"
                            ];
                            return colorList[params.dataIndex]
                        },
                        label: {
                            show: true
                        }
                    }
                }
            }, {
                name: 'QQ钱包',
                type: 'bar',
                data: QQWallet,
                barWidth: 32,
                itemStyle: {

                    normal: {

                        color: function (params) {
                            // build a color map as your need.
                            var colorList = [
                                "#80ccff"
                            ];
                            return colorList[params.dataIndex]
                        },
                        label: {
                            show: true
                        }
                    }
                }
            }, {
                name: '百度钱包',
                type: 'bar',
                data: BaiduWallet,
                barWidth: 32,
                itemStyle: {

                    normal: {

                        color: function (params) {
                            // build a color map as your need.
                            var colorList = [
                                "#e51816"
                            ];
                            return colorList[params.dataIndex]
                        },
                        label: {
                            show: true
                        }
                    }
                }
            }

        ]
    };

    /* tableDataLoading */
    var totalMoney = document.getElementById("totalMoney");
    totalMoney.innerHTML = (parseInt(BankCard) + parseInt(WeChat) + parseInt(AliPay) + parseInt(QQWallet) + parseInt(BaiduWallet)) + ".0";

// 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    myChart.hideLoading(); //取消loading
    window.onresize = myChart.resize;
} else {
    myChart.hideLoading();

    myChart.showLoading({
        text: '数据努力加载中...'
    }); //loading等待
}


var totalButton = document.getElementById("totalButton");
totalButton.onclick = function () {
    totalButton.style.color = "#ccc";
    myChart.hideLoading();
};
