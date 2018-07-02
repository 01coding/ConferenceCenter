<template>
  <div>
    <navbar></navbar>
  <br/>
  <div class="row center-align" style="margin-bottom: 1px">
    <h2>注册</h2>
  </div>
  <div class="row">
    <div class="col s12 m4 offset-m4 l4 offset-l4">
      <div class="card-panel" style="padding-bottom: 5px">
        <div class="row">
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
            <button class="col s6 offset-l3 btn waves-effect waves-light" style="margin-top: 7px;" type="submit" name="action" v-on:click="userRegisterFuc()">
              注册
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  import navbar from '@/include/NavBar';
    export default {
      name: "UserRegister",
      components: { navbar},
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
