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
                            id-name="user_created_count"
                            :end-val="count.createUser"
                            iconType="android-person-add"
                            color="#2d8cf0"
                            intro-text="今日新增用户"
                        ></infor-card>
                    </Col>
                </Row>
            </Col>
        </Row>
    </div>
</template>

<script>
import inforCard from './components/inforCard.vue'

export default {
    name: 'home',
    components: {
        inforCard,
    },
    data () {
        return {
            count: {
                createUser: 496,
                visit: 3264,
                collection: 24389305,
                transfer: 39503498
            }
        };
    }
};
</script>
