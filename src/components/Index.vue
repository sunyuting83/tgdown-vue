<template>
  <div class="hello" v-if="status === 0">
    <h1>wa</h1>
  </div>
  <Loading v-else :page-status="status" :get-data="getData"></Loading>
</template>

<script>
import Storage from '@/helper/storageTTL'
import Loading from '@/public/Loading'
export default {
  components: {
    Loading
  },
  name: "Index",
  data() {
    return {
      globalURL: "",
      status: 3,
      params:{},
      config:{}
    };
  },
  created() {
    const host = localStorage.getItem("host")
    if (host !== null) {
      this.globalURL = host
      const getURL = `${host}/api/getconfig`
      this.params = {
        url: getURL,
        key: 'getconfig',
        ttl: {
          status: false,
          ttl: 0
        }
      }
      this.getData()
    }else {
      location.reload()
    }
  },
  methods: {
    async getData() {
      const data = await Storage(this.params)
      console.log(data)
      if(data.status === 500) {
        this.$router.push({path: `/Detail/${data.bookid}`})
      }else {
        this.status = data.status
        this.config = data.config
        console.log(this.config)
      }
    }
  }
};
</script>
