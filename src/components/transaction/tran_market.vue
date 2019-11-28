<template>
  <div class="bothse-market">
    <!-- <trannav :title="title" :leftj="true"></trannav> -->
    <div class="titletab">
      <div
        class="tablist"
        @click="clicktab(index)"
        v-for="(item,index) in tablist"
        :key="index"
        :class="[index == tabstate?'tabact':'']"
      >{{item}}</div>
    </div>
    <div class="bodylist">
      <div class="listmodule" v-for="(item,index) in bodylist" :key="index" @click="$router.push('mytrans')">
        <div class="list_model first_div">
          <div>单号：{{item.orderNo}}</div>
          <div>{{item.offerChinese}}</div>
        </div>

        <div class="list_model">
          <div>数量</div>
          <div>{{item.amount}}</div>
        </div>

        <div class="list_model">
          <div>单价</div>
          <div>{{item.unitPrice}}</div>
        </div>

        <div class="list_model maijia">
          <div>售价</div>
          <div>{{item.price}}</div>
        </div>

        <div class="list_model clickview">
          <div></div>
          <div v-if="tabstate == 0" @click="chushou(index)">出售</div>
          <div v-else @click="buyin(index)">买入</div>
        </div>
      </div>
    </div>
    <van-popup v-model="show">
      <div class="showcont">
        <input type="password" v-model="safeword" placeholder="请输入支付密码" />
        <div @click="clickqd">确定</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { setTimeout } from 'timers';
export default {
  name: "transmarket",
  data() {
    return {
      title: "交易市场",
      tablist: ["买单列表", "卖单列表"], //头部切换
      tabstate: 0, //选中状态
      interface:0,
      page: 1, //页数
      lastId: 0, //lastid
      bodylist: [

      ], //列表
      lastpage: "", //最后一页

      show: false, //弹出层
      safeword: "", //弹出层里的密码
      shouid: "" //出售的id
    };
  },
  created() {
    this.getrecord();
    if(this.$route.query.lstate ){
      this.tabstate = this.$route.query.lstate
    } 
  },
  mounted() {
    window.addEventListener("scroll", this.scrollFn,true);
  },
  beforeDestroy() {
      window.removeEventListener("scroll", this.scrollFn,true); // 销毁监听
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
        this.getrecord();
        if (this.page == this.lastpage) {
           window.removeEventListener("scroll", this.scrollFn); // 销毁监听;
        }
      }
    },
    

    //挂单记录
    getrecord() {
      var _this = this;

      if(_this.tabstate == 0){
        //查询买单记录
        _this.interface = '1002'
      }else{
        _this.interface = '1001'
      }
      let data = {
        lastId: _this.lastId,
        page: _this.page,
      };
      _this.$axios
        .fetchPost("/portal/C2C", {
          interface: _this.interface,
          module: "Market",
          source: "web",
          version: "v1",
          data: data
        })
        .then(res => {
          console.log("挂单记录", res);
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

    // 点击切换
    clicktab(index) {
      this.tabstate = index;
      this.page= 1, //页数
      this.lastId= 0, //lastid
      this.bodylist = [];
      this.getrecord();
    },
    //买入
    buyin(index) {
      var list = this.bodylist;
      let buyid = list[index].id;
      this.$router.replace({ path: "/marketxq", query: { id: buyid } });
    },
    // 出售
    chushou(index) {
      var list = this.bodylist;
      this.shouid = list[index].id;

      // this.show = !this.show
      this.$router.replace({ path: "/marketxq", query: { id:this.shouid,type:1} });
    },
    // // 点击确定
    clickqd() {
          let data={
              id:this.shouid,
              safeword:this.safeword
          };
          if(data.safeword == ''){
              this.$toast('请输入支付密码');
              return false;
          }else if(data.safeword.length != 6){
              this.$toast('安全密码必须由 6 位数字组成');
              return false
          }
          
          this.$axios.fetchPost('/portal',{
              interface: "1007",
              module: "Attachment",
              source: "web",
              version: "v1",
              data:data
          })
          .then(res=>{
              console.log('出售',res)
              if(res.code == 0){
                  this.$toast('出售成功');
                  setTimeout(()=>{
                      this.show = !this.show;
                      this.page= 1, //页数
                      this.lastId= 0, //lastid
                      this.bodylist = [];
                      this.getrecord();
                  },1300)
              }else if(res.code >= 4800 && res.code < 4900){
                  this.$toast(res.message)
              }
          })
    }
  },
  components: {}
};
</script>

<style lang="less" scoped>
.bothse-market {
  height: 100vh;
  padding: 0 15px;
  background: #0B0C21;
}
.titletab {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #121E4D;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  .tablist {
    width: 50%;
    line-height: 35px;
    text-align: center;
    font-size: 15px;
    font-weight: 400;
    color: rgba(216, 216, 216, 1);
    position: relative;
  }
  .tabact {
    color: #fff;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    background: linear-gradient(90deg,#494EFE 0%,  #0900F8 100%);
  }
}
.bodylist {
  // padding: 0  20px;
  // background: #1D1C3B;
  .listmodule {
    margin: 10px 0 0;
    box-sizing: border-box;
    padding: 0 10px 20px;
    border-radius: 6px;
    background: #1D1C3B;
  }
}
.list_model {
  height: 40px;
  box-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  color: #fff;
}
.first_div {
  box-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 0.1);
  // border-bottom: 1px solid #253786;
  div:first-child {
    color: #D8D8D8;
  }
  div:last-child {
    color: #FF2626;
  }
}
// .maijia {
//   color: rgba(248, 77, 77, 1);
// }
.clickview {
  color: #fff;
  div:last-child {
    width: 76px;
    line-height: 26px;
    
    background: linear-gradient(
      90deg,
      #494EFE 0%,
      #0900F8 100%
    );
    opacity: 0.79;
    text-align: center;
    border-radius: 20px;
  }
}
.showcont {
  width: 230px;
  text-align: center;
  padding: 20px 0 0;
  input {
    line-height: 30px;
    padding-left: 4px;
    border-radius: 4px;
    border: 1px solid #f8f8f8;
  }
  div {
    line-height: 40px;
    font-size: 18px;
    margin-top: 10px;
    border-top: 1px solid #f8f8f8;
    color: #1890ff;
  }
}
</style>
