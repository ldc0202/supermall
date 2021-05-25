<template>
  <div id="home">
     <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
       <!-- <img v-for="item in banners" :src="item.image" :key="item.link" alt=""> -->
       <home-swiper :banners="banners"/>
       <recommend-view :recommends="recommends"/>
       <feature-view/>
       <tab-control :titles="['流行','新款','精选']" class="tab-control" @tabClick="tabClick"></tab-control>
       <goods-list :goods="showgoods"/>
       <ul>
         <li>列表1</li>
         <li>列表2</li>
         <li>列表3</li>
         <li>列表4</li>
         
       </ul>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import {getHomeMultidata,getHomeGoods} from 'network/home'
import FeatureView from './childComps/FeatureView'

import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from '../../components/content/goods/GoodsList'
export default {
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList
  },
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
      currentType: 'pop'
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
  computed:{
    showgoods(){
      return this.goods[this.currentType].list
    }
  },
  methods:{
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
    },
    //网络请求相关的方方法
    getHomeMultidata(){
      getHomeMultidata().then(res => {
      console.log(res)
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
      })
    }
  }
}
</script>

<style>
#home{
 padding-top: 44px;
}
.home-nav{
  background-color: var(--color-tint);

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.tab-control{
  position: sticky;
  top: 44px;
  z-index: 10;
}
</style>