<template>
  <div>
    <navbar></navbar>
    <test-robot v-on:child-say="fill_form"></test-robot>
  <div class="row" style="background: url(/static/bg7.jpg) no-repeat; background-size: cover;height: 658px;margin-bottom: 0">
    <div class="col s12 m4 offset-m4 l4 offset-l4" style="padding-top: 40px;width:35%">
      <div class="card-panel" style="padding-bottom: 5px;padding-top: 10px;opacity: 0.9">
        <div class="row center-align" style="margin-top:0; margin-bottom: 8px">
          <h3>注册</h3>
        </div>
        <div class="row">
          <div class="row" style="margin-bottom: 0;">
            <div class="input-field col s11" style="margin-bottom: 0; margin-left: 18px" >
              <i class="medium material-icons prefix">account_circle</i>
              <input id="name" type="text" class="validate"  v-model="name"/>
              <label for="name" v-show="name===''">姓名</label>
            </div>
            <span class="red-text" style="margin-left: 72px">{{nameMessage}}</span>
          </div>
          <div class="row" style="margin-bottom: 0;">
            <div class="input-field col s11" style="margin-bottom: 0; margin-left: 18px" >
              <i class="medium material-icons prefix">email</i>
              <input id="email" type="email" class="validate"  v-model="email"/>
              <label for="email" v-show="email===''">邮箱</label>
            </div>
            <span class="red-text" style="margin-left: 72px">{{emailMessage}}</span>
          </div>
          <div class="row" style="margin-bottom: 0;">
            <div class="input-field col s11" style="margin-bottom: 0; margin-left: 18px" >
              <i class="medium material-icons prefix">vpn_key</i>
              <input id="password" type="password" class="validate" v-model="password" />
              <label for="password" v-show="password===''">密码</label>
            </div>
            <span class="red-text" style="margin-left: 72px">{{passwordMessage}}</span>
          </div>
          <div class="row" style="margin-bottom: 0;">
            <div class="input-field col s11" style="margin-bottom: 0; margin-left: 18px" >
              <i class="medium material-icons prefix">vpn_key</i>
              <input id="confirmPassword" type="password" class="validate" v-model="confirmPassword" />
              <label for="confirmPassword" v-show="confirmPassword===''">确认密码</label>
            </div>
            <span class="red-text" style="margin-left: 72px">{{confirmPasswordMessage}}</span>
          </div>
          <div class="row center-align">
            <button class="col s6 offset-l3 btn waves-effect waves-light" style="margin-top: 7px;" type="submit" id="submit" v-on:click="userRegisterFuc()">
              注册
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
    <div class="grey lighten-1 footer-copyright">
      <div class="container center" style="padding-top: 5px;padding-bottom: 5px">
        © 2014 Copyright Text
      </div>
    </div>
  </div>
</template>

<script>
  import navbar from '@/include/NavBar';
  import TestRobot from "../../include/TestRobot";
    export default {
      name: "UserRegister",
      components: { navbar,TestRobot},
      data() {
        return {
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
        fill_form:function(form_data){
          this.name=form_data.name;
          this.email = form_data.email;
          this.password = form_data.password;
          this.confirmPassword = form_data.confirmPassword
        },
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

</style>
