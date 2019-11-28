<template>
    <div id='loginBox'>
        <van-nav-bar
            title="登录"
            :border='false'
        />
        
        <div class='login'>
            <van-cell-group  style="margin-top: 50px">
                <van-field
                    placeholder="请输入手机号"
                    v-model="obj.account"
                    name="phone"
                    v-validate="'required|phones'"
                    :error="errors.has('phone')"
                >
                <template slot='left-icon'>
                    <img class='inputIcon' src='../../static/images/index/xingming 2@2x.png'/>
                </template>
                </van-field>
                <van-field
                    placeholder="请输入密码"
                    type="password"
                    v-validate="'required'"
                    name='password'
                    :error="errors.has('password')"
                    v-model="obj.password"
                >
                <template slot='left-icon'>
                    <img class='inputIcon' src='../../static/images/index/jihuoma@2x.png'/>
                </template>
                </van-field>
            </van-cell-group>
            <!--<van-cell-group :border='false' style="text-align: right;margin-top: 10px">
                <router-link to='/password' class="forget">忘记密码</router-link>
            </van-cell-group>-->
            <van-cell-group :border='false' style="margin-top: 60px;text-align: center">
                <van-button class='btn' @click="submit">登录</van-button>
            </van-cell-group>
            <!--<van-cell-group :border='false' style="margin-top: 10px;text-align: center;color: #999">
                <span  @click="$router.push('/register')">没有账号？去注册</span>
            </van-cell-group>-->
        </div>
    </div>
</template>
<script>
import {Toast} from 'vant'
export default {
    data () {
        return {
            obj: {
                account: '',
                password: ''
            }
        }
    },
  created () {
      if(sessionStorage.getItem('accessToken')){
          this.$router.push('index')
      }
    
  },
    methods:{
        submit(){
            var that = this
            this.$validator.validateAll().then(function(result,field) {
                if (result) {
                that.$axios.fetchPost('/portal',
                {
                    source: "web",
                    version: "v1",
                    module: "Account",
                    interface: "1000",
                    data: that.obj
                }).then(res => {
                    if (res.success) {
                        that.$cookies.set('status', res.data.status)
                        that.userInfo = res.data
                       // that.$cookies.set('accessToken', res.data.tokenType + " " + res.data.accessToken , res.data.expiresIn)
                      sessionStorage.setItem('accessToken', res.data.tokenType + " " + res.data.accessToken , res.data.expiresIn)
                      //console.log(res.data.accessToken);
                      //console.log(sessionStorage.getItem('accessToken'));
                       // return false;

                        // if(confirm('是否直接进入')){
                        //     that.$router.push('/index')
                        // }else{
                            // if(res.data.status == -1){
                            //     Toast('未通过实名认证')
                            //     // that.$router.push('/authentication')
                            //     return 
                            // }else if(res.data.status == -2){
                            //     Toast('未认证')
                            //     // that.$router.push('/authentication')
                            //     return 
                            // }else if(res.data.status ==  0) {
                            //     Toast('申请中')
                            //     return
                            // }else if(res.data.status == 1){
                            //     Toast('登陆成功')
                            // }
                            
                            that.$router.push('/index')
                        // }
                    }else{
                        Toast(res.message)
                    }
                })
                } else {
                    Toast(that.errors.items[0].msg)
                }
            })
            
        },
        // onClickLeft () {
        //     this.$router.push('/index')
        // }
    }
}
</script>
<style lang="less" scoped>
.btn{
    width: 343px;
    height: 44px;
    background: red;
    margin: 0 auto;
  /*  background:linear-gradient(180deg,rgba(253,89,102,1) 0%,rgba(231,17,34,1) 100%);*/
  background:linear-gradient(180deg,#494EFE 0%,#0900F8 100%);
    border-radius: 22px;
    color: #fff;
}

.inputIcon{
    width: 20px;
    height: 20px;
}
#loginBox {
    .login{
        width: 343px;
        margin:  0 auto;
    }
}
.forget{
    font-size: 12px;
    color: #999;
    text-align: right;
}


input:-internal-autofill-selected {
    background-color: rgb(0, 0, 0) !important;
    background-image: none !important;
    color: rgb(0, 0, 0) !important;
    box-shadow: inset 0 0 0 1000px #000!important;
}
// input:-internal-autofill-previewed,
// input:-internal-autofill-selected {
//     -webkit-text-fill-color: #FFFFFF !important;
//     transition: background-color 5000s ease-in-out 0s !important;
// }
// input:-internal-autofill-selected {
//     background: transparent !important;
// }
#loginBox{
    width: 100%;
    height: 100%;
    background: #0b0c21;
}
    /deep/.van-field__control{
        color: #fff;
    }
.van-nav-bar{
    background: #0b0c21;
    
}
.van-nav-bar__title{
    color: #ffffff;
}
.van-icon-arrow-left:before{
    color: #ffffff;
}
/deep/.van-field--error .van-field__control, .van-field--error .van-field__control::placeholder{
    color: #fff;
}
.van-button--default{
    border: 1px solid #0b0c21;
}
.van-cell-group {
    background: #0b0c21;
    border: none;
}
.van-cell{
    background: #0b0c21;
    border-bottom: 1px solid #999;
}
.van-cell:not(:last-child)::after{
    border: none;
}
[class*=van-hairline]::after{
    border: none;
}
.btn{
    width: 343px;
    height: 44px;
    // background: red;
    margin: 0 auto;
    // background:linear-gradient(180deg,rgba(253,89,102,1) 0%,rgba(231,17,34,1) 100%);
    background-image: linear-gradient(90deg,#494efe, #0b02f8);
    border-radius: 22px;
    color: #fff;
}
.inputIcon{
    width: 20px;
    height: 20px;
}
#loginBox {
    .login{
        width: 343px;
        margin:  0 auto;
    }
}
.forget{
    font-size: 12px;
    color: #999;
    text-align: right;
}
</style>
