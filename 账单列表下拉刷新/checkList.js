/**
 * Created by bankeys-01 on 2016/2/25.
 */

//创建canvas
var circle = new Sonic({

    width: 30,
    height: 30,
    padding: 0,

    strokeColor: '#000',

    pointDistance: .01,
    stepsPerFrame: 3,
    trailLength: .7,

    step: 'fader',

    setup: function () {
        this._.lineWidth = 3;
    },

    path: [
        ['arc', 14, 14, 12, 0, 360]
    ]

});

circle.play();


/*function get_data() {
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
 var json = get_data();*/


var json = [
    {
        "data": "2016-02-25",
        "income": "出售",
        "incomeMoney": 1000,
        "expenditure": "餐饮",
        "expenditureMoney": 300

    },
    {
        "data": "2016-02-25",
        "income": "清仓",
        "incomeMoney": 2000,
        "expenditure": "喝酒",
        "expenditureMoney": 500
    },
    {
        "data": "2016-02-25",
        "income": "变卖",
        "incomeMoney": 3000,
        "expenditure": "吸毒",
        "expenditureMoney": 3500
    },
    {
        "data": "2016-02-25",
        "income": "。。。",
        "incomeMoney": 10000,
        "expenditure": "餐饮",
        "expenditureMoney": 1000
    }
];
var content = document.getElementById("content");
function getJson(x){

}

console.log(json[0].data);
/*
<li>
<table class="tableList">
    <tr class="dateBackgroundColor">
    <th colspan="2">2016-01-16</th>
    </tr>
    <tr>
    <td>金额<span class="tableRight incomeMoney" >1000.0</span></td>
</tr>
<tr>
<td>餐饮<span class="tableRight expenditureMoney" >500.0</span></td>
</tr>
<tr>
<td class="settlement">收入：<span class="incomeMoney">1000.0</span> 支出：<span class="expenditureMoney">500.0</span>结算：<span class="settlementMoney">500.0</span></td>
</tr>
</table>

</li>
*/

var slide = function (option) {
    var defaults = {
        container: '',
        next: function () {
        }
    }
    var start,
        end,
        length,
        isLock = false,//是否锁定整个操作
        isCanDo = false,//是否移动滑块
        isTouchPad = (/hp-tablet/gi).test(navigator.appVersion),
        hasTouch = 'ontouchstart' in window && !isTouchPad;
    var obj = document.querySelector(option.container);
    var loading = obj.firstElementChild;
    var offset = loading.clientHeight;
    var objparent = obj.parentElement;
    /*操作方法*/
    var fn =
    {
        //移动容器
        translate: function (diff) {
            obj.style.webkitTransform = 'translate3d(0,' + diff + 'px,0)';
            obj.style.transform = 'translate3d(0,' + diff + 'px,0)';
        },
        //设置效果时间
        setTransition: function (time) {
            obj.style.webkitTransition = 'all ' + time + 's';
            obj.style.transition = 'all ' + time + 's';
        },
        //返回到初始位置
        back: function () {
            fn.translate(0 - offset);
            //标识操作完成
            isLock = false;
        },
        addEvent: function (element, event_name, event_fn) {
            if (element.addEventListener) {
                element.addEventListener(event_name, event_fn, false);
            } else if (element.attachEvent) {
                element.attachEvent('on' + event_name, event_fn);
            } else {
                element['on' + event_name] = event_fn;
            }
        }
    };

    fn.translate(0 - offset);
    fn.addEvent(obj, 'touchstart', start);
    fn.addEvent(obj, 'touchmove', move);
    fn.addEvent(obj, 'touchend', end);
    fn.addEvent(obj, 'mousedown', start);
    fn.addEvent(obj, 'mousemove', move);
    fn.addEvent(obj, 'mouseup', end);

    //滑动开始
    function start(e) {
        if (objparent.scrollTop <= 0 && !isLock) {
            var even = typeof event == "undefined" ? e : event;
            //标识操作进行中
            isLock = true;
            isCanDo = true;
            //保存当前鼠标Y坐标
            start = hasTouch ? even.touches[0].pageY : even.pageY;
            //消除滑块动画时间
            fn.setTransition(0);
            loading.innerHTML = '下拉刷新数据';
        }
        return false;
    }

    //滑动中
    function move(e) {
        if (objparent.scrollTop <= 0 && isCanDo) {
            var even = typeof event == "undefined" ? e : event;
            //保存当前鼠标Y坐标
            end = hasTouch ? even.touches[0].pageY : even.pageY;
            if (start < end) {
                even.preventDefault();
                //消除滑块动画时间
                fn.setTransition(0);
                //移动滑块
                if ((end - start - offset) / 2 <= 150) {
                    length = (end - start - offset) / 2;
                    fn.translate(length);
                }
                else {
                    length += 0.3;
                    fn.translate(length);
                }
            }
        }
    }

    //滑动结束
    function end(e) {
        if (isCanDo) {
            isCanDo = false;
            //判断滑动距离是否大于等于指定值
            if (end - start >= offset) {
                //设置滑块回弹时间
                fn.setTransition(1);
                //保留提示部分
                fn.translate(0);
                //执行回调函数
                /*loading.innerHTML = "正在刷新数据";*/
                loading.innerHTML = "";
                loading.appendChild(circle.canvas);
                if (typeof option.next == "function") {
                    option.next.call(fn, e);
                }
            } else {
                //返回初始状态
                fn.back();
            }
        }
    }
}
slide({
    container: "#container", next: function (e) {
        //松手之后执行逻辑,ajax请求数据，数据返回后隐藏加载中提示
        var that = this;
        setTimeout(function () {
            that.back.call();
        }, 2000);
    }
});