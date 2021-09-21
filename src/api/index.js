// api下的请求
import { recommendMusic, newMusic } from './Home'
import { hotSearch, searchResultList } from './Search'
import { getSongById, getLyricById } from './Play'

export const recommendMusicAPI = recommendMusic
export const newMusicAPI = newMusic
export const hotSearchAPI = hotSearch
export const searchResultListAPI = searchResultList
export const getSongByIdAPI = getSongById
export const getLyricByIdAPI = getLyricById