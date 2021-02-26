<template>
  <div class="hello">
    <h1>{{ message }}</h1>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      message: "",
      path: "ws://localhost:13002/api/downlist",
      ws: {},
      list: {}
    };
  },
  created() {
    console.log(this.$props.msg);
    this.message = "message";
    this.ws = new WebSocket(this.path);

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
      const d = JSON.parse(wsdata.content)
      this.list = d
      console.log(this.list)
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  margin: 40px 0 0;
  color: #000;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
