<style lang="less">
    @import "./home.less";
</style>
<template>
    <div class="home-main">
        <Row :gutter="10">
            <Col :md="24" :lg="16">
                <Row :gutter="5">
                    <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                        <infor-card
                            id-name="registerCountToday"
                            :end-val="count.registerCountToday"
                            iconType="android-person-add"
                            color="#2d8cf0"
                            intro-text="今日新增用户"
                        ></infor-card>
                    </Col>
                    <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                        <infor-card
                            id-name="wechatFollowCountByNow"
                            :end-val="count.wechatFollowCountByNow"
                            iconType="ios-eye"
                            color="#64d572"
                            :iconSize="50"
                            intro-text="今日微信关注数"
                        ></infor-card>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row :gutter="10" class="margin-top-10">
             <Col :md="24" :lg="16">
                <Row :gutter="5">
                    <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                        <infor-card
                            id-name="billCompletedCountToday"
                            :end-val="count.billCompletedCountToday"
                            iconType="compose"
                            color="#2d8cf0"
                            :iconSize="50"
                            intro-text="完成账单填写人数"
                        ></infor-card>
                    </Col>
                    <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                        <infor-card
                            id-name="billCountToday"
                            :end-val="count.billCountToday"
                            iconType="navicon-round"
                            color="#64d572"
                            :iconSize="50"
                            intro-text="收集到的账单数"
                        ></infor-card>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row :gutter="10" class="margin-top-10">
            <Col :md="24" :lg="16">
                <Row :gutter="5">
                    <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                        <infor-card
                            id-name="applyCountToday"
                            :end-val="count.applyCountToday"
                            iconType="arrow-up-a"
                            color="#2d8cf0"
                            :iconSize="50"
                            intro-text="申请上岸人数"
                        ></infor-card>
                    </Col>
                    <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                        <infor-card
                            id-name="applyBillCountToday"
                            :end-val="count.applyBillCountToday"
                            iconType="arrow-up-c"
                            color="#64d572"
                            :iconSize="50"
                            intro-text="申请上岸账单数"
                        ></infor-card>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row class="margin-top-10">
            <Card>
                <p slot="title" class="card-title">
                    <Icon type="ios-shuffle-strong"></Icon>
                    过去7天数据
                </p>
                <div class="line-chart-con">
                    <staticticsChart></staticticsChart>
                </div>
            </Card>
        </Row>
        <Row class="margin-top-10">
            <Card>
                <p slot="title" class="card-title">
                    <Icon type="ios-shuffle-strong"></Icon>
                    今日借款平台统计
                </p>
                <div class="data_source_con" :style="{height: '500px'}">
                    <platformPie></platformPie>
                </div>
            </Card>
        </Row>
        <Row class="margin-top-10">
            <Card>
                <p slot="title" class="card-title">
                    <Icon type="ios-shuffle-strong"></Icon>
                    过去7天借款平台统计
                </p>
                <div class="data_source_con" :style="{height: '500px'}">
                    <platformPie7days></platformPie7days>
                </div>
            </Card>
        </Row>
    </div>
</template>

<script>
import inforCard from './components/inforCard.vue'
import summaryApi from '@/api/summary'
import {formatDate} from '@/libs/date.js';
import staticticsChart from './components/staticticsChart.vue';
import platformPie from './components/platformPie.vue';
import platformPie7days from './components/platformPie7days.vue';

export default {
    name: 'home',
    components: {
        inforCard,
        staticticsChart,
        platformPie,
        platformPie7days
    },
    data () {
        return {
            count: {
                registerCountToday: 0,
                billCompletedCountToday: 0,
                billCountToday: 0,
                wechatFollowCountByNow: 0,
                applyBillCountToday: 0,
                applyCountToday: 0
            }
        };
    },
    created() {
        this.fetch()
    },
    methods: {
        fetch() {
            const date = formatDate(new Date(), "yyyy-MM-dd");
            summaryApi.summary({'start_time': date, 'end_time': date}).then((resp) => {
                if(resp.data.code == 200 && resp.data.report && resp.data.report.length > 0){
                    var report = resp.data.report[0]
                    this.count.registerCountToday = report.register_count_today
                    this.count.billCompletedCountToday = report.bill_completed_count_today
                    this.count.billCountToday = report.bill_count_today
                    this.count.wechatFollowCountByNow = report.wechat_follow_count_by_now
                    this.count.applyBillCountToday = report.apply_bill_count_today
                    this.count.applyCountToday = report.apply_count_today
                }
            })
        }
    }
};
</script>
