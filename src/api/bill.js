import util from '@/libs/util'

export default {
    list(data) {
        return util.axios.get('/bill/list', { params: data})
    }
}
