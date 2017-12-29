import util from '@/libs/util'

export default {
    summary(data) {
        return util.axios.get('/summary', { params: data})
    }
}
