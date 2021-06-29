<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll ref="scroll" class="detail-content" :pullUpLoad="true" @scroll="contentScroll" :probeType="3" >
      <div>
        <ul>
          <li v-for="item,index in this.$store.state.cartList" :key="index">{{index}}</li>
        </ul>
      </div>
      <!-- 详情轮播图 -->
      <detail-swiper :top-images="topImages"/>
      <!-- 详情基本信息 -->
      <detail-base-info :goods="goods"></detail-base-info>
      <!-- 详情店铺信息 -->
      <detail-shop-info :shop="shop"/>
      <!-- 详情商品信息 -->
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
      <!-- 详情参数信息 -->
      <detail-param-info ref="params" :paramInfo="paramInfo"/>
      <!-- 详情评论信息 -->
      <detail-comment-info ref="comment" :commentInfo="commentInfo"/>
      <!-- 详情推荐信息 -->
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
      <!-- 底部工具栏 -->
      <detail-bottom-bar @addToCart='addToCart'></detail-bottom-bar>
      <back-top @click.native="backClick"  v-show="isShowBackTop"/>
  </div>
</template>

<script>
import DetailNavBar from './childcomps/DetailNavBar'
import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
import DetailSwiper from './childcomps/DetailSwiper'
import DetailBaseInfo from './childcomps/DetailBaseInfo'
import DetailShopInfo from './childcomps/DetailShopInfo'
import Scroll from 'components/common/scroll/Scroll'
import DetailGoodsInfo from './childcomps/DetailGoodsInfo'
import DetailParamInfo from './childcomps/DetailParamInfo'
import DetailCommentInfo from './childcomps/DetailCommentInfo'
import GoodsList from '../../components/content/goods/GoodsList'
import {itemListenerMixin} from '../../common/mixin'
import {debounce} from '@/common/utils'
import DetailBottomBar from './childcomps/DetailBottomBar'
// import BackTop from 'components/content/backTop/BackTop'
import {backTopMixin} from "common/mixin"
export default {
  name:"Detail",
  components: { 
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    },
    mixins:[itemListenerMixin,backTopMixin],
  data(){
      return{
          iid:null,
          topImages:[],
          goods:{},
          shop:{},
          detailInfo:{},
          paramInfo:{},
          commentInfo:{},
          recommends:[],
          theneTopYs:[],
          getThemeTopY:null,
          currentIndex:0
      }
  },
  created(){
    //1.保存传入的iid
      this.iid=this.$route.params.iid
      // console.log('-------'+ this.iid)
    //2.根据iid请求数据
       getDetail(this.iid).then(res=>{
        
      //  console.log(res)
         //1.获取数据
        const data=res.result;
         //2.获取顶部的图片轮播数据
        this.topImages = data.itemInfo.topImages;
        //3.获取商品信息
        // console.log(data.columns)
        this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        //4.创建店铺信息的对像
        this.shop=new Shop(data.shopInfo)
        //5.保存商品的详情数据
        this.detailInfo=data.detailInfo
        //6.获取参数的信息
        this.paramInfo= new GoodsParam(data.itemParams.info,data.itemParams.rule)
        //7.取出评论的信息
        if(data.rate.cRate !== 0){
          this.commentInfo=data.rate.list[0]
        }
        //根据最新的数据，对应的DOM是已经被渲染出来回调的函数
        this.$nextTick(()=>{
          
        })
       })
       //请求推荐数扰
       getRecommend().then(res=>{
        //  console.log(res)
         this.recommends=res.data.list
       })
       this.getThemeTopY=debounce(()=>{
           this.theneTopYs[0]=0;
           this.theneTopYs[1]=this.$refs.params.$el.offsetTop;
           this.theneTopYs[2]=this.$refs.comment.$el.offsetTop;
           this.theneTopYs[3]=this.$refs.recommend.$el.offsetTop;
          //  console.log('property'+this.theneTopYs)
       },100)
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
  methods:{
    // backClick(){
    //    this.$refs.scroll.scrollTo(0,0);
    // },
    addToCart(){
      // console.log("aaaaaa")
      //1.获取购物车需要展示的信息
      const product={}
      product.image=this.topImages;
      product.title=this.goods.title;
      product.desc=this.goods.desc;
      product.price=this.goods.realPrice;
      product.iid=this.iid;
      //2.将商品添加到购物车里
      // this.$store.commit('addCart',product)
      this.$store.dispatch('addCart',product)
    },
    imageLoad(){
      // console.log('detailGoodInfo----imageLoad')
       this.$refs.scroll.refresh()
         this.getThemeTopY()
    },
    titleClick(index){
      console.log(index)
       this.$refs.scroll.scrollTo(0,-this.theneTopYs[index],100)
    },
    contentScroll(position){
      //  this.isShowBackTop=(-position.y)>1000
      this.listenShowBackTop(position)
      //1.获取Y值
       const positionY = -position.y;
      // console.log(positionY)
       //2.positionY数组theneTopYs的值之间来确定index的值
       let length=this.theneTopYs.length;
      //  for(let i=0;i<length;i++){
      //    if(this.currentIndex!== i && ((i<length-1 && positionY>=this.theneTopYs[i] && positionY<this.theneTopYs[i+1]) || (i===length-1 && positionY >= this.theneTopYs[i]))){
      //      this.currentIndex=i;
      //      this.$refs.nav.currentIndex=this.currentIndex;
      //    }
      //  }
      for(let i=0;i<length-1;i++){
         if(this.currentIndex!== i && positionY>=this.theneTopYs[i] && positionY<this.theneTopYs[i+1]){
           this.currentIndex=i;
          //  console.log(this.currentIndex)
           this.$refs.nav.currentIndex=this.currentIndex;
         }
       }
    }
  }
  
}
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-content{
   height: calc(100% - 44px);
  /*overflow: hidden; */
  /* position: absolute;
  top: 0px;
  bottom: 0px;
  overflow: hidden; */
}
.detail-nav-bar{
  background-color: #fff;
  position: relative;
  z-index: 9;
}
</style>