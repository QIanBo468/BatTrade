<template>
  <div class="mydingdan">
    <trannav :title="title" :leftj="true"></trannav>
    <div class="bodylist">
      <div class="listmodule" v-for="(item,index) in bodylist" :key="index" @click="goxq(index)">
        <div class="between">
          <p>单号:{{item.orderNo}}</p>
          <span style="color:#f00">
            <span v-if="item.status == 0">匹配中</span>
            <span v-if="item.status == 1">待付款</span>
            <span v-if="item.status == 2">待确认</span>
            <span v-if="item.status == 3" style="color:#1890FF">已完成</span>
            <span v-if="item.status == -1">申诉未付款</span>
            <span v-if="item.status == -2">申诉未确认</span>
          </span>
        </div>
        <div class="center">
          <div>
            <p>{{item.amount}}</p>
            <span>交易数量</span>
          </div>
          <div>
            <p>{{item.unitPrice}}</p>
            <span>单价(CNY)</span>
          </div>
          <div>
            <p>{{item.price}}</p>
            <span>售价(CNY)</span>
          </div>
        </div>
        <div class="between">
          <p>卖家昵称</p>
          <span>{{item.user.account}}</span>
        </div>
        <div class="between">
          <p>卖家手机号</p>
          <span>{{item.user.nickname}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "我的买单",
      lastpage: "", //最后一页
      interface: 0,
      page: 1, //页数
      lastId: 0, //lastid
      bodylist: [
      ],
      tabstate:0,
    };
  },
  created() {
    console.log(this.$route.query.type)
    if(this.$route.query.type ==0 ){
     this.title = '我的买单'
     this.tabstate = this.$route.query.type
    } 
    if(this.$route.query.type ==1){
      this.title = '我的卖单'
      this.tabstate = this.$route.query.type
    }
    this.myjiao();
  },
  mounted() {
    window.addEventListener("scroll", this.scrollFn, true);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scrollFn, true); // 销毁监听
  },
  methods: {
    //文档高度
    getScrollTop() {
      var scrollTop = 0,
        bodyScrollTop = 0,
        documentScrollTop = 0;
      if (document.body) {
        bodyScrollTop = document.body.scrollTop;
      }
      if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
      }
      scrollTop =
        bodyScrollTop - documentScrollTop > 0
          ? bodyScrollTop
          : documentScrollTop;
      return scrollTop;
    }, //可视窗口高度
    getWindowHeight() {
      var windowHeight = 0;
      if (document.compatMode == "CSS1Compat") {
        windowHeight = document.documentElement.clientHeight;
      } else {
        windowHeight = document.body.clientHeight;
      }
      return windowHeight;
    }, //滚动条高度
    getScrollHeight() {
      var scrollHeight = 0,
        bodyScrollHeight = 0,
        documentScrollHeight = 0;
      if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
      }
      if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
      }
      scrollHeight =
        bodyScrollHeight - documentScrollHeight > 0
          ? bodyScrollHeight
          : documentScrollHeight;
      return scrollHeight;
    }, //然后在scrollFn函数中判断:
    scrollFn() {
      if (
        this.getScrollTop() + this.getWindowHeight() ==
        this.getScrollHeight()
      ) {
        //这里执行动态获取数据的函数
        this.page++;
        // this.myjiao();
        if (this.page == this.lastpage) {
          window.removeEventListener("scroll", this.scrollFn); // 销毁监听
        }
      }
    },
    myjiao() {
      var _this = this;
      let data = {
        lastId: _this.lastId,
        page: _this.page,
        //type: _this.tabstate
        marketId: this.$route.query.id
      };
        console.log(data.marketId)
      if (_this.tabstate == 0) {
        _this.interface = 3001;
      } else {
        _this.interface = 3000;
      }

      _this.$axios
        .fetchPost("/portal/C2C", {
          interface: _this.interface,
          module: "Trade",
          source: "web",
          version: "v1",
          data: data
        })
        .then(res => {
          console.log("我的交易", res);
          if (res.code == 0) {
            _this.lastId = res.data.lastId;
            _this.page = res.data.currentPage;
            _this.lastpage = res.data.lastPage;
            _this.bodylist = _this.bodylist.concat(res.data.list);
          } else if (res.code == 4800) {
            _this.$toast(res.message);
          }
        });
    },
      goxq(index) {
      let list = this.bodylist;
      let id = list[index].id;
      console.log(list[index].status);
      // return false;

      if (list[index].status < 0) {
        this.$toast("该订单已被投诉无法查看详情");
        return false;
      }

      if (list[index].status == 3 && this.tabstate != 1) {
        // console.log(list[index].onOffer)
        this.$router.push({
          path: "/payment",
          query: { id: id, states: true }
        });
      }
      if (list[index].status == 1 && this.tabstate != 1) {
        // console.log(list[index].onOffer)
        this.$router.push({
          path: "/payment",
          query: { id: id, states: true }
        });
      }
      if (list[index].status == 3 && this.tabstate == 1) {
        // console.log(list[index].onOffer)
        this.$router.push({
          path: "/payment",
          query: { id: id, states: true, tabstate: 1 }
        });
      }
      if (list[index].status != 1 && list[index].status != 3) {
        this.$router.push({
          path: "/payment",
          query: { id: id, states: false }
        });
      }
      if (list[index].status == 1) {
        this.$router.push({
          path: "/payment",
          query: { id: id, states: true, tabstate: 0 }
        });
      }

      /*if(list[index].status == 2&&this.tabstate == 0){
           this.$router.push({path:'/payment',query:{id:id,states:true}})
        }*/
    },
  }
};
</script>

<style lang='less' scope>
.mydingdan {
  width: 100%;
  height: 100%;
  background: #0b0c21;
  justify-content: center;
  color: #fff;
  margin-top: 2rem;
  .bodylist {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background: #0b0c21;
    margin-top: 1rem;
    padding: 1rem;

    .listmodule {
      background: #1d1c3b;
      padding: 0.5rem;
      border-radius: 8px;
      margin-top: 1rem;
    }
    .between {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      p {
        font-size: 14px;
      }
    }
    .center {
      display: flex;
      justify-content: space-around;
      text-align: center;
      margin-bottom: 0.5rem;
      div {
        span {
          font-size: 11px;
        }
      }
    }
  }
}
</style>