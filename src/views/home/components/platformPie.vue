<template>
    <div style="width:100%;height:100%;" id="data_source_con"></div>
</template>

<script>
import echarts from 'echarts'
import {formatDate} from '@/libs/date.js'
import summaryApi from '@/api/summary'

export default {
    name: 'platformPie',
    data () {
        return {
            scource: [],
            
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.fetch()            
        })
    },
    methods: {
        fetch () {
            const date = formatDate(new Date(), "yyyy-MM-dd");
            summaryApi.platform({'start_time': date, 'end_time': date}).then((resp) => {
                if(resp.data.code == 200 && resp.data.report && resp.data.report.length > 0){
                    var data = resp.data.report[0].data
                    var source = []
                    data.forEach(function(ele) {
                        source.push({value: ele.bill_count, name: ele.platform})
                    }, this);
                    this.source = source
                    this.render()
                }
            })
        },
        render () {
            var dataSourcePie = echarts.init(document.getElementById('data_source_con'));
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
