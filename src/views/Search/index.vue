<template>
  <div>
    <van-search
      v-model="value"
      shape="round"
      placeholder="请输入搜索关键词"
      @input="inputFn"
    />
    <!-- 搜索容器 -->
    <div class="search_wrap" v-if="resultList.length == 0">
      <p class="hot_title">热门搜索</p>
      <div class="hot_name_wrap">
        <span
          class="hot_item"
          v-for="(item, index) in hotArr"
          :key="index"
          @click="btnFn(item.first)"
          >{{ item.first }}</span
        >
      </div>
    </div>
    <!-- 搜索结果 -->
    <div class="search_wrap" v-else>
      <p class="hot_title">最佳匹配</p>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <SongItem
          v-for="item in resultList"
          :key="item.id"
          :name="item.name"
          :author="item.ar[0].name"
          :id="item.id"
        ></SongItem>
        <!-- <van-cell
          :title="item.name"
          :label="item.ar[0].name + '-' + item.name"
          center
          v-for="item in resultList"
          :key="item.id"
          ><template #right-icon>
            <van-icon name="play-circle-o" size="0.6rem" /> </template
        ></van-cell> -->
      </van-list>
    </div>
  </div>
</template>

<script>
import SongItem from "@/components/SongItem";
import { hotSearchAPI, searchResultListAPI } from "@/api";
export default {
  components: {
    SongItem,
  },
  data() {
    return {
      value: "",
      hotArr: [],
      resultList: [],
      // list插件
      loading: false, //loading为false；才能触底后自动触发onload方法
      finished: false,
      page: 1,
      timer: null,
    };
  },
  async created() {
    const res = await hotSearchAPI();
    // console.log(res);
    this.hotArr = res.data.result.hots;
  },
  methods: {
    // async修饰的函数，返回一个promise

    async getListFn() {
      return await searchResultListAPI({
        keywords: this.value,
        limit: 20,
        offset: (this.page - 1) * 20,
      });
    },
    async btnFn(val) {
      this.page = 1;
      // 点击关键词，可能有新数据
      this.finished = false;
      this.value = val;
      // 触发获取列表
      const res = await this.getListFn();
      // console.log(res);
      this.resultList = res.data.result.songs;
      // 请求完成后，改为false
      this.loading = false;
    },

    async inputFn() {
      this.page = 1;
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(async () => {
        // 输入框搜索。可能有新数据
        this.finished = false;
        // 当输入内容后再删除会保留之前的查询内容，需要清空
        if (this.value.length === 0) {
          this.resultList = [];
          return;
        }
        const res = await this.getListFn();
        // 当搜索结果没有数据的时候，使得数组为空
        if (res.data.result.songs === undefined) {
          this.resultList = [];
          return;
        }
        // console.log(res);
        this.resultList = res.data.result.songs;
        // 请求完成后改为false
        this.loading = false;
      }, 900);
    },
    async onLoad() {
      this.page++;
      const res = await this.getListFn();
      // 当只有一页数据的时候，将finished改为true
      if (res.data.result.songs === undefined) {
        this.finished = true; //触底不会执行onload函数
        // 到底了，改为false
        this.loading = false;
        return;
      }
      this.resultList = [...this.resultList, ...res.data.result.songs];
      this.loading = false; //保证下次可以继续触发onload事件
    },
  },
};
</script>

<style scoped>
/* 搜索容器的样式 */
.search_wrap {
  padding: 0.266667rem;
}

/*热门搜索文字标题样式 */
.hot_title {
  font-size: 0.32rem;
  color: #666;
}

/* 热搜词_容器 */
.hot_name_wrap {
  margin: 0.266667rem 0;
}

/* 热搜词_样式 */
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.213333rem;
  margin-bottom: 0.213333rem;
  padding: 0 0.373333rem;
  font-size: 0.373333rem;
  line-height: 0.853333rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
}
</style>