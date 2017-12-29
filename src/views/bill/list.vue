<template>
    <Row class="wrap">
        <Col>
            <Table :columns="columns1" :data="list"></Table>
        </Col>
        <Col>
            <Page :total="count" :page-size="50" @on-change="changePage" show-elevator></Page>
        </Col>
    </Row>
</template>
<script>
    import billApi from '@/api/bill'
    export default {
        data () {
            return {
                columns1: [
                    {
                        title: 'id',
                        key: 'id'
                    },
                    {
                        title: '借款平台',
                        key: 'channel'
                    },
                    {
                        title: '还款金额',
                        key: 'repayment'
                    }
                ],
                list: [],
                params: {
                    phone: "13968084799",
                    token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzaGFuZ2FuYmFvIiwiaXNzIjoiZWNyZWR0aXBhbCIsImNsYWltIjoiMTM5NjgwODQ3OTkiLCJleHAiOjE1MTU1NjY5Mjd9.Em5zb_R3UMzVqB4rTSPNCOZ_yfqQEpOV8BBtplKGnJ0"
                },
                count: 100
            }
        },
        created() {
            this.fetch()
        },
        methods: {
            changePage() {
               this.fetch();
            },
            fetch() {
                billApi.list(this.params).then((resp) => {
                    this.list = resp.data.data
                    this.count = 200
                })
            }
        }
    }
</script>