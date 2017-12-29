<template>
    <div style="width:100%;height:100%;" id="service_request_con"></div>
</template>

<script>
import echarts from 'echarts';
import {formatDate} from '@/libs/date.js';
import summaryApi from '@/api/summary'

export default {
    name: 'staticticsChart',
     data () {
        return {
            option: {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                grid: {
                    top: '23%',
                    left: '1.2%',
                    right: '1%',
                    bottom: '3%',
                    containLabel: true
                },
                legend: {
                    left: 'left',
                    data: ['用户数', '微信关注数', '完成账单填写人数', '收集到的账单数', '申请上岸人数', '申请上岸账单数']
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: []
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        minInterval: 100
                    }
                ],
                series: [
                    {
                        name: '用户数',
                        type: 'line',
                        data: []
                    },
                    {
                        name: '微信关注数',
                        type: 'line',
                        data: []
                    },
                    {
                        name: '完成账单填写人数',
                        type: 'line',
                        data: []
                    },
                    {
                        name: '收集到的账单数',
                        type: 'line',
                        data: []
                    },
                    {
                        name: '申请上岸人数',
                        type: 'line',
                        data: []
                    },
                    {
                        name: '申请上岸账单数',
                        type: 'line',
                        data: []
                    }
                ]
            }
        }
    },
    mounted () {
        this.fetch()
    },
    methods: {
        fetch () {
            var now = new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000);
            var startTime = new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000);
            const start = formatDate(startTime, "yyyy-MM-dd")
            const end = formatDate(now, "yyyy-MM-dd")
            summaryApi.summary({'start_time': start, 'end_time': end}).then((resp) => {
                if (resp.data.code == 200) {
                    var registerCountToday = []
                    var billCompletedCountToday = []
                    var billCountToday = []
                    var wechatFollowCountByNow = []
                    var applyBillCountToday = []
                    var applyCountToday = []
                    var x = []
                    resp.data.report.forEach(function(ele) {
                        registerCountToday.push(ele.register_count_today) 
                        billCompletedCountToday.push(ele.bill_completed_count_today) 
                        billCountToday.push(ele.bill_count_today) 
                        wechatFollowCountByNow.push(ele.wechat_follow_count_by_now) 
                        applyBillCountToday.push(ele.apply_bill_count_today)               
                        applyCountToday.push(ele.apply_count_today) 

                        x.push(ele.time)
                    }, this);
                    this.option.series[0].data = registerCountToday
                    this.option.series[1].data = wechatFollowCountByNow
                    this.option.series[2].data = billCompletedCountToday
                    this.option.series[3].data = billCountToday
                    this.option.series[4].data = applyCountToday
                    this.option.series[5].data = applyBillCountToday
                    this.option.xAxis[0].data = x
                    this.render()
                }
            })
        },
        render () {
            const serviceRequestCharts = echarts.init(document.getElementById('service_request_con'));
            serviceRequestCharts.setOption(this.option);

            window.addEventListener('resize', function () {
                serviceRequestCharts.resize();
            });
        }
    }
    
};
</script>