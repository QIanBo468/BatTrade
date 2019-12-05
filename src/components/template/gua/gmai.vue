<template>
    <div>
        <trannav title="挂卖" :leftj="true" ></trannav>
        <div class="cont">
                <div class="contmodule">
                    <div><span>挂卖数量</span><span>剩余：{{ofc}}BAT</span></div>
                    <input type="number" v-model="uploaddata.num" placeholder="请输入挂卖数量">
                </div>
                <div class="contmodule">
                    <div><span>挂卖单价</span></div>
                    <!-- <div><span>挂卖售价</span><span>最低售价：{{price}}</span></div> -->
                    <input type="number" v-model="uploaddata.price" placeholder="请输入售价">
                </div>
                <div class="contmodule">
                    <div>交易密码</div>
                    <input type="password" v-model="uploaddata.mm" placeholder="请输入交易密码">
                </div>

                <div class="contmodule">
                    <div><span>挂卖总价</span><span>{{bothprice}}CNY</span></div>
                </div>

                <div class="queding" @click="yesmai()">确定</div>
            </div>
    </div>
</template>

<script>
export default {
    name:'gmai',
    data(){
        return{
            ofc:'0',//ofc
            price:'',//最低售价
            uploaddata:{
                num:'',
                price:'',
                mm:''
            },
            bothprice:'0.00',//总价CNY
        }
    },
    created(){
        this. getofc()
    },
    computed:{
        suannum(){
            return this.uploaddata.num
        },
        suanprice(){
            return this.uploaddata.price
        }
    },
    watch:{
        suannum(val){
            console.log(val)
            this.bothprice = val * this.uploaddata.price
        },
        suanprice(val){
            this.bothprice = val * this.uploaddata.num
        }
    },
    methods:{
        //获取ofc数量
        getofc(){
            var _this = this;
            _this.$axios.fetchPost('/portal',{
                interface: "1000",
                module: "Finance",
                source: "web",
                version: "v1",
                data:{}
            })
            .then(res =>{
                console.log('ofc',res)
                 if(res.code == 0){
                   _this.ofc = res.data.credit_2.value
                }else if(res.code == 4800){
                    _this.$toast(res.message)
                }
            })
        },
        // 点击确定
        yesmai(){
             var _this = this;
            let is_int = /^[0-9]*[1-9][0-9]*$/;
            if(_this.uploaddata.num == ''){
                _this.$toast('请输入挂卖数量');
                return false;
            }else if(_this.uploaddata.num == 0){
                _this.$toast('挂卖数量不为0');
                return false;
            }else if(is_int.test(_this.uploaddata.num) == false){
                _this.$toast('挂卖数量应为整数');
                return false;
            }else if(_this.uploaddata.price == ''){
                _this.$toast('请输入售价');
                return false;
            }else if(_this.uploaddata.mm == ''){
                _this.$toast('请输入交易密码');
                return false;
            }else if(_this.uploaddata.mm.length != 6){
                _this.$toast('交易密码必须由 6 位数字组成');
                return false
            }

            let data={
                creditType:'credit_2',
              amount : _this.uploaddata.num,
                unitPrice : _this.uploaddata.price,
                safeword : _this.uploaddata.mm
            };
            // data.status = 0;
            // data.num = _this.uploaddata.num;
            // data.price = _this.uploaddata.price;
            // data.safeword = _this.uploaddata.safeword;
            _this.$axios.fetchPost('/portal/C2C',{
                interface: "2000",
                module: "Market",
                source: "web",
                version: "v1",
                data:data
            })
            .then(res=>{
                console.log('挂卖',res)
                if(res.code == 0){
                    _this.$toast(res.message)
                    setTimeout(()=>{
                        this.$router.go(-1)
                        Object.assign(_this.$data.uploaddata,_this.$options.data().uploaddata)
                        _this.getofc()
                    },1300)
                }else if(res.code >= 4800 && res.code < 4900){
                    _this.$toast(res.message)
                }
            })
        }
    },
    components:{}
}
</script>

<style lang="less" scoped>
/deep/.van-nav-bar{
    background: #0B0C21;
    color: #fff;
}
.van-nav-bar__title{
    color: #fff;
}
.cont{
    padding:0 16px;
}
.contmodule{
    padding:20px 0 0;
    div{
        font-size:14px;
        font-weight:400;
        color:rgba(255,255,255,1);
        display: flex;
        justify-content: space-between;
        span{
            display: block;
        }
    }
    input{
        height:40px;
        background:#1D1C3B; 
        border-radius:4px;
        border:none;
        width:100%;
        box-sizing: border-box;
        padding-left:10px;
        font-size:14px;
        font-weight:400;
        margin-top:10px;
        color:#fff;
    }

}
input::-webkit-input-placeholder{
    color:rgba(199,199,204,1);
}    /* 使用webkit内核的浏览器 */
:-moz-placeholder{
    color:rgba(199,199,204,1);
}                  /* Firefox版本4-18 */
::-moz-placeholder{
    color:rgba(199,199,204,1);
}                  /* Firefox版本19+ */
:-ms-input-placeholder{
    color:rgba(199,199,204,1);
} 
.queding{
    margin-top: 85px;
    line-height:40px;
    text-align: center;
    font-size:16px;
    font-weight:400;
    color:rgba(255,255,255,1);
    background:linear-gradient(90deg,#494EFE 0%,#0900F8 100%);
    border-radius:8px;
}     
</style>
