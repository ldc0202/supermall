<template>
   <div class="cart">
     <nav-bar class="nav-bara">
          <div slot="center">购物车({{length}})</div>
     </nav-bar>
   </div>
   
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar'
import {mapGetters} from 'vuex'
export default {
  name:"Cart",
  components: { NavBar },
  computed:{
    // cartLength(){
    //   return this.$store.getters.cartLength;
    // }
    //两种语法
    // ...mapGetters(['cartLength'])
  ...mapGetters({
    length:'cartLength'
  })
  }
}
</script>

<style scoped>
.nav-bar{
  background-color: var(--color-tint);
  color:#fff;
  font-weight: 18px;
  text-align: center;
}

</style>