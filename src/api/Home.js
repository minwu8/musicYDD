// 推荐歌单
import request from '@/utils/request'
export const recommendMusic = params => request({
        url: '/personalized',
        params
    })
    // 最新音乐
export const newMusic = params => request({
    url: '/personalized/newsong',
    params
})