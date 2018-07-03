<template>
  <div>
    <navbar></navbar>
    <div class="card customize"
         style="width: 100%; padding-top: 2rem; padding-bottom: 2rem; margin: 0;"
         :style="{'background-image':bg_overlay+'url(/static/bg1.jpg)'}">
      <div class="white-text row container">
        <div class="col s10 offset-s1">
          <h4 class="center">个人注册</h4>
        </div>
      </div>
    </div>
    <div class="white section valign-wrapper" style="padding-bottom: 5rem;">
      <div class="center container" style="width: 35%; min-width: 30rem;">
        <div class="row" style="margin-bottom: 0;">
          <div class="input-field col s12" style="margin-bottom: 0">
            <i class="medium material-icons prefix">account_circle</i>
            <input id="name" type="text" class="validate"  v-model="name"/>
            <label for="name">姓名</label>
          </div>
          <span class="red-text" style="margin-left: 55px">{{nameMessage}}</span>
        </div>
        <div class="row" style="margin-bottom: 0;">
          <div class="input-field col s12" style="margin-bottom: 0">
            <i class="medium material-icons prefix">email</i>
            <input id="email" type="email" class="validate"  v-model="email"/>
            <label for="email">邮箱</label>
          </div>
          <span class="red-text" style="margin-left: 55px">{{emailMessage}}</span>
        </div>
        <div class="row" style="margin-bottom: 0;">
          <div class="input-field col s12" style="margin-bottom: 0">
            <i class="medium material-icons prefix">vpn_key</i>
            <input id="password" type="password" class="validate" v-model="password" />
            <label for="password">密码</label>
          </div>
          <span class="red-text" style="margin-left: 55px">{{passwordMessage}}</span>
        </div>
        <div class="row" style="margin-bottom: 0;">
          <div class="input-field col s12 " style="margin-bottom: 0">
            <i class="medium material-icons prefix">vpn_key</i>
            <input id="confirmPassword" type="password" class="validate" v-model="confirmPassword" />
            <label for="confirmPassword">确认密码</label>
          </div>
          <span class="red-text" style="margin-left: 55px">{{confirmPasswordMessage}}</span>
        </div>
        <div class="row center-align">
          <button class="btn-large waves-effect waves-light blue darken-2"
                  style="margin-top: 7px;" type="submit"
                  name="action" v-on:click="userRegisterFuc()">
            <i class="material-icons left">send</i>
            提交
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import navbar from '@/include/NavBar';
    export default {
      name: "UserRegister",
      components: { navbar },
      data() {
        return {
          bg_overlay: "linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)),",
          page_height: $(window).height(),
          name: '',
          email : '',
          password : '',
          confirmPassword:'',
          nameMessage:'',
          emailMessage:'',
          passwordMessage:'',
          confirmPasswordMessage:''
        }
      },
      methods:{
        userRegisterFuc:function () {
          const regEmail= /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
          if(this.name===""){
            this.nameMessage="请输入姓名";
            return
          }else{
            this.nameMessage="";
          }
          if(this.email===""||!regEmail.test(this.email)){
            this.emailMessage="请输入正确的邮箱";
            return
          }else{
            this.emailMessage="";
          }
          if(this.password===""){
            this.passwordMessage="请输入密码";
            return
          }else{
            this.passwordMessage="";
          }
          if(this.confirmPassword===""){
            this.confirmPasswordMessage="请输入确认密码";
            return
          }else{
            this.confirmPasswordMessage="";
          }
          if(this.password!==this.confirmPassword){
            this.confirmPasswordMessage="两次密码不一样";
            return

          }else{
            this.confirmPasswordMessage="";
          }
          this.$user.post('/user/register', {
            name:this.name,
            email: this.email,
            password: this.password
          }).then(rsp => {
            if(rsp.data.code==="400"){
              this.emailMessage = rsp.data.msg;
              return;
            }
            M.toast({
              html:"<span style='font-weight: bold'>注册成功</span>",
              classes: "rounded green"
            });
            this.$router.push('/');
          }).catch(err => {
            console.log(err);
          })
        }
      }
    }
</script>

<style scoped>
  .customize {
    background-size: 100% !important;
    background-repeat: no-repeat !important;
    background-position: center center !important;
  }
</style>
