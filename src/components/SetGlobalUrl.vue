<template>
  <header>
      <div class="item-header">
        <div class="item-search">
          <div>
            <i class="fa fa-search sc"></i>
            <input v-model="key" placeholder="请输入关键字..." class="search-input" @keyup.enter="key.length > 0 ? setGlobalUrl() : null">
            <i class="fa fa-times-circle rc" v-if="key.length > 0" @click="cleanKey"></i>
          </div>
        </div>
        <div class="search-btn" :class="key.length > 0 ? 'active': null" @click="key.length > 0 ? setGlobalUrl() : null">搜索</div>
      </div>
    </header>
</template>

<script>
export default {
  name: "SetGlobalUrl",
  data() {
    return {
      key: ''
    }
  },
  created() {
    
  },
  methods: {
    setGlobalUrl() {
      if(this.key.startsWith("http")) {
        localStorage.setItem("host", this.key)
        location.reload()
      }else{
        this.cleanKey()
      }
      console.log("set")
    },
    cleanKey() {
      this.key = ''
    }
  }
};
</script>

