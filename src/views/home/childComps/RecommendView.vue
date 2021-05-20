<template>
  <div class="recommend">
      <div v-for="item in recommends" key="item.link">
          <a :href="item.link"></a>
      </div>
  </div>
</template>

<script>
export default {
  props:{
      recommends:{
          type:Array,
           default(){
               return []
           }
      }
  }
}
</script>

<style>

</style>