<template>
  <tab-bar>
      <tab-bar-item path="/home" class="item">
        <img class="item-icon" slot="item-icon" src="~assets/img/tabbar/home.svg" alt="">
        <img class="item-icon" slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" alt="">
        <div class="item-text" slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category" class="item">
        <img  class="item-icon"  slot="item-icon" src="~assets/img/tabbar/category.svg" alt="">
        <img class="item-icon" slot="item-icon-active" src="~assets/img/tabbar/category_active.svg" alt="">
        <div class="item-text" slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/cart" class="item">
        <img  class="item-icon"  slot="item-icon" src="~assets/img/tabbar/che.svg" alt="">
        <img class="item-icon" slot="item-icon-active" src="~assets/img/tabbar/che_active.svg" alt="">
        <div class="item-text" slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile"  class="item">
        <img  class="item-icon"  slot="item-icon" src="~assets/img/tabbar/my.svg" alt="">
        <img class="item-icon" slot="item-icon-active" src="~assets/img/tabbar/my_active.svg" alt="">
        <div class="item-text" slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
</template>

<script>
import TabBar from '@/components/common/tabbar/Tabbar'
import TabBarItem from '@/components/common/tabbar/TabBarItem'
export default {
    components: {
        TabBar,
        TabBarItem
    }
}
</script>

<style>
@import "~assets/css/base.css";
.item-icon {
       height: 24px;
       width: 24px;
       vertical-align: middle;
       margin-bottom: -3px;
}
.item-text {
     margin-top: 5px;
}
</style>