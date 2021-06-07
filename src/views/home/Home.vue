<template>
  <div id="home">
     <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
       <!-- <img v-for="item in banners" :src="item.image" :key="item.link" alt=""> -->
        <tab-control :titles="['流行','新款','精选']" ref="tabcontrol1"  @tabClick="tabClick" class="tabcontrol" v-show="isTabFixed"></tab-control>
       <scroll ref="scroll" class="content" :probe-type="3" @scroll="scrollHandler" :pull-up-load="true" @pullingUp="loadMore">
          <home-swiper :banners="banners" @swiperImageLoad='swiperImageLoad'/>
          <recommend-view :recommends="recommends"/>
          <!-- 本周流行 -->
          <feature-view/>
          <tab-control :titles="['流行','新款','精选']" ref="tabcontrol2"  @tabClick="tabClick"></tab-control>
          <goods-list :goods="showgoods"/> 
       </scroll>
        <back-top @click.native="backClick"  v-show="isShowBackTop"/>
       
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import {getHomeMultidata,getHomeGoods} from 'network/home'
import FeatureView from './childComps/FeatureView'

import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'
import {itemListenerMixin} from 'common/mixin'
export default {
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  mixins:[itemListenerMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      result: null,
      goods: {
        'pop': {page: 0,list: []},
        'new': {page: 0,list: []},
        'sell': {page: 0,list: []}
      },
      currentType: 'pop',
      isShowBackTop:false,
      tabOffsetTop:0,
      isTabFixed:false,
      saveY:0,
      itemImgListener:null
    }
  },
  created() {
    //请求多个数据
    this.getHomeMultidata(),
    //请求商品数据
    this.getHomeGoods('pop'),
    this.getHomeGoods('new'),
    this.getHomeGoods('sell')
  },
  mounted(){
    // const refresh=debounce(this.$refs.scroll.refresh,500)
    //  //监听item中的图片加载完成
    //  this.itemImgListener=()=>{
    //   // console.log('---')
    //   // this.$refs.scroll.refresh();
    //   refresh()
    // }
    // this.$bus.$on('itemImageLoad',this.itemImgListener)
  },
  destroyed(){
      console.log('home destroyed')
  },
  activated(){
     this.$refs.scroll.scrollTo(0,this.saveY,0)
     this.$refs.scroll.refresh()
      this.$bus.$on('itemImageLoad',this.itemImgListener)
  },
  deactivated(){
    //1.保存y值
     this.saveY=this.$refs.scroll.getScrollY()
    //2.取消全局事件的监听
    this.$bus.$off('itemImageLoad',this.itemImgListener)
  },
  computed:{
    showgoods(){
      return this.goods[this.currentType].list
    }
  },
  methods:{
    swiperImageLoad(){
        //获取tabControl的offsetTop
       //所有的组件都有一个属性$el:用于获取组件中的元素
       this.tabOffsetTop = this.$refs.tabcontrol2.$el.offsetTop
      //  console.log(this.$refs.tabcontrol.$el.offsetTop)
    },
    //事件监听相关的方法
    
    backClick(){
       this.$refs.scroll.scrollTo(0,0);
    },
    scrollHandler(position){
      this.isShowBackTop=(-position.y)>1000
      //  console.log(this.isShowBackTop)
      // console.log(position)
      this.isTabFixed=(-position.y>this.tabOffsetTop)
    },
    loadMore(){
      // console.log('下拉加载更多')
      this.getHomeGoods(this.currentType);
    },
    tabClick(index){
       switch (index) {
         case 0:
           this.currentType= 'pop'
           break;
        case 1:
           this.currentType= 'new'
           break;
        case 2:
           this.currentType= 'sell'
           break;
       
         default:
           break;
       }
       this.$refs.tabcontrol1.currentIndex=index
       this.$refs.tabcontrol2.currentIndex=index
    },
    //网络请求相关的方方法
    getHomeMultidata(){
      getHomeMultidata().then(res => {
      // console.log(res)
      this.banners=res.data.banner.list
      this.recommends=res.data.recommend.list
      //this.result=res
      })
    },
    getHomeGoods(type){
      const page = this.goods[type].page + 1;
      getHomeGoods(type,page).then(res=>{
        console.log(res)
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page +=1

        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
#home{
 /* padding-top: 44px; */
 /* 100%视口高度 vh->vieport height */
 height: 100vh;
 position: relative;
}
.home-nav{
  background-color: var(--color-tint);
  /* height: 44px; */
}

.content{
  /* height: calc(100%-93); */
  /* height: 300px; */
  /* height: calc(100%-93px); */
  /* height: 100%;
  overflow: hidden;
  margin-top: 44px; */

  
  position: absolute;
  top: 44px;
  bottom: 52px;
  overflow: hidden;
}
.tabcontrol{
  position: relative;
  margin-top: -1px;
  z-index: 9;
}

</style>