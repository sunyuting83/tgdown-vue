<template>
  <div v-if="status === 200">
    <section class="content">
        <div class="catalog" v-if="list.length > 0">
          <div ref="xxxMy">
            <div class="b-title"><em></em>正在下载……</div>
            <div v-for="(item,index) in list" class="scroll" :key="item.key">
              <div class="row list">
                <div class="col col-20 img">
                  {{index}}
                </div>
                <div class="col col-60 detail">
                  <h3>{{item.path}}</h3>
                </div>
                <div class="col col-20 delete">
                  <div>{{item.percent}}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="catalog" style="height:100%">
          <img src="https://image.suning.cn/uimg/ZR/share_order/158501870837440052.jpg" class="loading" />
        </div>
      </section>
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
      config:{},
      list:[]
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
      this.status = data.status
      if (data.status === 200) {
        if(data.config.length <= 0) {
          this.$router.push({path: `/Detail/${data.bookid}`})
        }else {
          this.config = data.config
          this.connectWs()
        }
      }
    },
    connectWs(){
      const rootURL = this.globalURL.split("://")[1]
      const wspath = `ws://${rootURL}/api/downlist`
      this.ws = new WebSocket(wspath);

      //监听是否连接成功
      this.ws.onopen = () => {
        console.log("ws连接状态：" + this.ws.readyState);
        //连接成功则发送一个数据
        this.ws.send("getdata");
      };

      //接听服务器发回的信息并处理展示
      this.ws.onmessage = (data) => {
        console.log("接收到来自服务器的消息：");
        const wsdata = JSON.parse(data.data)
        if (wsdata.content !== "err") {
          const d = JSON.parse(wsdata.content)
          this.list = d
        }
        // console.log(this.list)
      };

      //监听连接关闭事件
      this.ws.onclose = () => {
        //监听整个过程中websocket的状态
        console.log("ws连接状态：" + this.ws.readyState);
      };

      //监听并处理error事件
      this.ws.onerror = function (error) {
        console.log(error);
      };
    }
  }
};
</script>
