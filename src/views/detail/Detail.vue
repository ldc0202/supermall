<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar"></detail-nav-bar>
    <scroll ref="detailcontent" class="detail-content" :pullUpLoad="true" >
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :paramInfo="paramInfo"/>
      <detail-comment-info :commentInfo="commentInfo"/>
      <goods-list :goods="recommends"/>
      
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from './childcomps/DetailNavBar'
import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
import DetailSwiper from './childcomps/DetailSwiper'
import DetailBaseInfo from './childcomps/DetailBaseInfo'
import DetailShopInfo from './childcomps/DetailShopInfo'
import Scroll from '../../components/common/scroll/Scroll'
import DetailGoodsInfo from './childcomps/DetailGoodsInfo'
import DetailParamInfo from './childcomps/DetailParamInfo'
import DetailCommentInfo from './childcomps/DetailCommentInfo'
import GoodsList from '../../components/content/goods/GoodsList'

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
    GoodsList
    },
  data(){
      return{
          iid:null,
          topImages:[],
          goods:{},
          shop:{},
          detailInfo:{},
          paramInfo:{},
          commentInfo:{},
          recommends:[]
      }
  },
  created(){
    //1.保存传入的iid
      this.iid=this.$route.params.iid
      console.log('-------'+ this.iid)
    //2.根据iid请求数据
       getDetail(this.iid).then(res=>{
        
      //  console.log(res)
         //1.获取数据
        const data=res.result;
         //2.获取顶部的图片轮播数据
        this.topImages = data.itemInfo.topImages;
        //3.获取商品信息
        console.log(data.columns)
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
        
       })
       //请求推荐数扰
       getRecommend().then(res=>{
         console.log(res)
         this.recommends=res.data.list
       })
  },
  methods:{
    imageLoad(){
       this.$refs.detailcontent.refresh()
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