<template>
  <div class="bothse">
    <trannav :title="title" :leftj="true"></trannav>
    <div class="titletab">
      <div
        class="tablist"
        @click="clicktab(index)"
        v-for="(item,index) in tablist"
        :key="index"
        :class="[index == tabstate?'tabact':'']"
      >{{item}}</div>
    </div>
    <div class="bodylist" >
      <div class="listmodule" v-for="(item,index) in bodylist" :key="index" >
        <div class="list_model first_div" @click="dingdan(item)">
          <div>单号：{{item.orderNo}}</div>
          <div>
            <!--<span :style=" {'color':item.status != 3 ? '':'#1890FF'}">已完成</span>-->
            <span  v-if="item.status == 0" >匹配中</span>
            <span v-if="item.status == 1" >待付款</span>
            <span v-if="item.status == 2" >待确认</span>
            <span v-if="item.status == 3" style="color:#1890FF">已完成</span>
            <span v-if="item.status == -1" >申诉未付款</span>
            <span v-if="item.status == -2" >申诉未确认</span>
            <!-- <span v-else-if="item.onOffer == 0" style="color:#1890FF;">已完成</span> -->
          </div>
        </div>

        <div class="list_model" @click="dingdan(item)">
          <div>数量</div>
          <div>{{item.amount}}</div>
        </div>

        <div class="list_model" @click="dingdan(item)">
          <div>单价</div>
          <div>{{item.unitPrice}}</div>
        </div>
        <div class="list_model" @click="dingdan(item)">
          <div>剩余</div>
          <div>{{item.remainingAmount}}</div>
        </div>

        <div class="list_model maijia" @click="dingdan(item)">
          <div>售价</div>
          <div>{{item.price}}</div>
        </div>


        <div class="list_model clickview" >
          <div></div>
          <div  v-if="item.status > 0" @click="dingdan(item,index)" class="details">详情</div>
          <div  @click="chexiao(index)" v-if="item.status == 0" class="cancle">撤销</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { setTimeout } from 'timers';
export default {
  name: "mytrans",
  data() {
    return {
      title: "我的挂单",
      tablist: ["买单列表", "卖单列表"], //头部切换
      tabstate: 0, //选中状态
      interface:0,
      page: 1, //页数
      lastId: 0, //lastid
      bodylist: [
      ], //列表
      lastpage: "" //最后一页
    };
  },
  created(){
      this.myjiao()
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
        this.myjiao();
        if (this.page == this.lastpage) {
         window.removeEventListener("scroll", this.scrollFn); // 销毁监听
        }
      }
    },
    
        // 我的交易
    myjiao(){
      var _this = this;
      let data = {
        lastId: _this.lastId,
        page: _this.page,
        //type: _this.tabstate
      };

      if(_this.tabstate == 0){
        _this.interface = 1001;
      }else{
        _this.interface = 1000;
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


    // 撤销
    chexiao(index){
        var _this = this;
        let list = _this.bodylist;
        let id = list[index].id;
        _this.$axios.fetchPost("/portal/C2C", {
          interface: "2003",
          module: "Trade",
          source: "web",
          version: "v1",
          data: {
              id:id
          }
        })
        .then(res => {
          console.log("撤销挂单", res);
          if (res.code == 0) {
            _this.$toast(res.message);
            setTimeout(()=>{
                _this.page= 1, //页数
                _this.lastId= 0, //lastid
                _this.bodylist = [];
                _this.myjiao()
            },1200)
            
          } else if (res.code == 4800) {
            v.$toast(res.message);
          }
        });  
    },
    
    // 点击切换
    clicktab(index) {
      this.tabstate = index;
      this.page= 1, //页数
      this.lastId= 0, //lastid
      this.bodylist = [];
      this.myjiao()
    },
    //去详情
    goxq(index){
        let list = this.bodylist;
        let id = list[index].id;
        console.log(list[index].status)
        // return false;

      if(list[index].status < 0){
        this.$toast("该订单已被投诉无法查看详情")
        return false;
      }

        if(list[index].status == 3 && this.tabstate != 1){
          // console.log(list[index].onOffer)
          this.$router.push({path:'myDingdan',query:{id:id,states:true}})
        }
         if(list[index].status == 3 && this.tabstate == 1){
          // console.log(list[index].onOffer)
          this.$router.push({path:'myDingdan',query:{id:id,states:true,tabstate:1}})
        }
        if(list[index].status != 1 && list[index].status != 3){
          this.$router.push({path:'myDingdan',query:{id:id,states:false}})
        }
        if(list[index].status == 1){
          this.$router.push({path:'myDingdan ',query:{id:id,true:false,tabstate:0}})
        }

        /*if(list[index].status == 2&&this.tabstate == 0){
           this.$router.push({path:'/payment',query:{id:id,states:true}})
        }*/


        
    },
    dingdan(item,index) {
      console.log(item)
      // if(item.status){
        this.$router.push({path:'myGuadan',query:{type:this.tabstate,id: item.id}})
      // } 
      // else{
      //  let list = this.bodylist;
      // let id = list[index].id;
      // console.log(list[index].status);
      // // return false;

      // if (list[index].status < 0) {
      //   this.$toast("该订单已被投诉无法查看详情");
      //   return false;
      // }

      // if (list[index].status == 3 && this.tabstate != 1) {
      //   // console.log(list[index].onOffer)
      //   this.$router.push({
      //     path: "/payment",
      //     query: { id: id, states: true }
      //   });
      // }
      // if (list[index].status == 3 && this.tabstate != 1) {
      //   // console.log(list[index].onOffer)
      //   this.$router.push({
      //     path: "/payment",
      //     query: { id: id, states: true }
      //   });
      // }
      // if (list[index].status == 3 && this.tabstate == 1) {
      //   // console.log(list[index].onOffer)
      //   this.$router.push({
      //     path: "/payment",
      //     query: { id: id, states: true, tabstate: 1 }
      //   });
      // }
      // if (list[index].status != 1 && list[index].status != 3) {
      //   this.$router.push({
      //     path: "/payment",
      //     query: { id: id, states: false }
      //   });
      // }
      // if (list[index].status == 1) {
      //   this.$router.push({
      //     path: "/payment",
      //     query: { id: id, true: false, tabstate: 0 }
      //   });
      // }
      // }
    }
  },
  components: {}
};
</script>

<style lang="less" scoped>
/deep/.van-nav-bar{
  background: #0B0C21;
}
.bothse {
  height: 100vh;
  padding: 40px 0 0;
  background: #0B0C21;
}
.titletab {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #121E4D;
  margin: 0 15px;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  .tablist {
    width: 50%;
    line-height: 35px;
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    color: rgba(216, 216, 216, 1);
    position: relative;
  }
  .tabact {
    color: #fff;
    background: linear-gradient(90deg,#494EFE 0% , #0900F8 100%);
      border-top-right-radius: 20px;
  border-top-left-radius: 20px;
    // &:after {
    //   content: "";
    //   width: 20px;
    //   height: 3px;
    //   background: rgba(248, 77, 77, 1);
    //   border-radius: 2px;
    //   position: absolute;
    //   bottom: 0;
    //   left: 44%;
    // }
  }
}
.bodylist {
  /*margin: 0 15px;*/
  background: #0B0C21;
  .listmodule {
    margin: 10px 0 0;
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
  color: rgba(255, 255, 255, 1);
}
.first_div {
  box-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 0.1);
  // border-bottom: 1px solid #253786;
  div:first-child {
    color: #ffffff;
  }
  div:last-child {
    color: rgba(248, 77, 77, 1);
  }
}
// .maijia {
//   color: rgba(248, 77, 77, 1);
// }
.clickview {


.details{
  width: 76px;
  line-height: 26px;
  background: linear-gradient(
    90deg,
    #d82a67 0%,
    #ee609c 100%
  );
// opacity: 0.79;
  text-align: center;
  border-radius: 20px;
}

  .cancle {
    width: 76px;
    line-height: 26px;
    background: linear-gradient(
      90deg,
      #494EFE 0%,
      #0900F8 100%
    );
    // opacity: 0.79;
    text-align: center;
    border-radius: 20px;
  }
}
</style>
