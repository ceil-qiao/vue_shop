<template>
    <div>
        <!--面包屑导航区-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>数据统计</el-breadcrumb-item>
            <el-breadcrumb-item>数据报表</el-breadcrumb-item>
        </el-breadcrumb>
        <!--卡片视图区域-->
        <el-card>
            <!-- 2为ECharts准备一个具备大小（宽高）的Dom -->
           <!--<div id="main" style="width: 600px;height:400px;"></div>-->
123
        </el-card>
    </div>
</template>

<script>
    //1导入echarts
   // import echarts from 'echarts'
    export default {
        name: "Report",
        data(){
            return {

            }
        },
        created() {
        },
        //只要执行到mounted 此时,页面上的元素已经渲染完毕了!
        mounted(){
            <!-- 3基于准备好的dom，初始化echarts实例 -->
            //var myChart = echarts.init(document.getElementById('main'));

            <!-- 4指定图表的配置项和数据 -->
            // var option = {
            //     title: {
            //         text: 'ECharts 入门示例'
            //     },
            //     tooltip: {},
            //     legend: {
            //         data:['销量']
            //     },
            //     xAxis: {
            //         data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            //     },
            //     yAxis: {},
            //     series: [{
            //         name: '销量',
            //         type: 'bar',
            //         data: [5, 20, 36, 10, 10, 20]
            //     }]
            // }

            <!-- 5使用刚指定的配置项和数据显示图表。-->
            //myChart.setOption(option)

        },
        methods:{

        }
    }
</script>

<style  lang="less" scoped>

</style>