<template>
    <div style="width:100%;height:100%;" id="data_source_con7days"></div>
</template>

<script>
import echarts from 'echarts'
import {formatDate} from '@/libs/date.js'
import summaryApi from '@/api/summary'

export default {
    name: 'platformPie7days',
    data () {
        return {
            scource: [],
            title: []
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.fetch()            
        })
    },
    methods: {
        fetch () {
            var now = new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000);
            var startTime = new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000);
            const start = formatDate(startTime, "yyyy-MM-dd")
            const end = formatDate(now, "yyyy-MM-dd")
            summaryApi.platform({'start_time': start, 'end_time': end}).then((resp) => {
                if(resp.data.code == 200 && resp.data.report && resp.data.report.length > 0){
                    var source = []
                    var map = {}
                    resp.data.report.forEach(function(element) {
                        var data = element.data
                        data.forEach(function(ele) {
                            if(ele.platform in map){
                                map[ele.platform] += ele.bill_count
                            }
                            else {
                                map[ele.platform] = 0
                            }
                        }, this);
                    }, this);
                    for(var key in map){
                        source.push({value: map[key], name: key})
                    }
                    this.source = source
                    this.render()
                }
            })
        },
        render () {
            var dataSourcePie = echarts.init(document.getElementById('data_source_con7days'));
            const option = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 'right',
                    data: this.title
                },
                series: [
                    {
                        name:'借款平台',
                        type:'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: this.source
                    }
                ]
            }
            dataSourcePie.setOption(option)
            window.addEventListener('resize', function () {
                dataSourcePie.resize()
            })
        }
    }
};
</script>
