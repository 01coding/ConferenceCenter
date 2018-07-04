<template>
  <div>
    <navbar></navbar>
    <div class="card customize"
         style="width: 100%; padding-top: 2rem; padding-bottom: 2rem; margin: 0;"
         :style="{'background-image':bg_overlay+'url(/static/bg1.jpg)'}">
      <div class="white-text row container">
        <div class="col s10 offset-s1">
          <h4 class="center">登录</h4>
        </div>
      </div>
    </div>
    <div class="white section" style="padding-top: 5rem; padding-bottom: 5rem;">
      <div class="center container" style="width: 35%; min-width: 30rem;">
        <div class="row">
          <div class="input-field col s12" style="margin-bottom: 0">
            <i class="medium material-icons prefix">email</i>
            <input id="email" type="email" class="validate"  v-model="email"/>
            <label for="email">邮箱</label>
          </div>
          <span class="red-text" style="margin-left: 55px">{{emailMessage}}</span>
        </div>
        <div class="row">
          <div class="input-field col s12" style="margin-bottom: 0">
            <i class="medium material-icons prefix">vpn_key</i>
            <input id="password" type="password" class="validate" v-model="password" />
            <label for="password">密码</label>
          </div>
          <span class="red-text" style="margin-left: 55px">{{passwordMessage}}</span>
        </div>
        <div class="row center-align">
          <label class="col s3 offset-l1">
            <input type="radio" name="scholar" value="scholar" v-model="isScholar" checked />
            <span>学者</span>
          </label>
          <label class="col s3">
            <input type="radio" name="institution" value="institution" v-model="isScholar" />
            <span>主办方</span>
          </label>
          <label class="col s3">
            <input type="radio" name="manager" value="manager" v-model="isScholar" />
            <span>管理员</span>
          </label>
        </div>
        <div class="row center-align">
          <button class="btn-large waves-effect waves-light blue darken-2"
                  style="margin-top: 7px;" type="submit" name="action"
                  v-on:click="loginfuc()">
            <i class="material-icons left">send</i>
            GO
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import navbar from '@/include/NavBar';
    export default {
        name: "Login",
        components: { navbar},
        data() {
          return {
            bg_overlay: "linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)),",
            page_height: $(window).height(),
            email : '',
            password : '',
            isScholar: 'scholar',
            emailMessage: '',
            passwordMessage:'',
            token:'',
            uid:''
          }
        },
        methods:{
          loginfuc :function(){

              const regEmail= /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
              if(this.email===''||!regEmail.test(this.email)){
                this.emailMessage="请输入正确的邮箱!";
                return
              }else{
                this.emailMessage="";
              }
              if(this.password===''){
                this.passwordMessage="请输入密码!";
                return
              }else{
                this.passwordMessage="";
              }
            let formData = new FormData();
            formData.append('email',this.email);
            formData.append('password',this.password);
              if(this.isScholar==='scholar') {
                this.$user.post('/user/login', {
                  email: this.email,
                  password: this.password
                }).then(rsp => {
                  if(rsp.data.code==="400"){
                    this.passwordMessage=rsp.data.msg;
                    return;
                  }
                  this.token = rsp.data.data.token;
                  sessionStorage.setItem('session',this.token);
                  this.session_callback();
                  this.$router.push('/');

                  M.toast({
                    html:"<span style='font-weight: bold'>登录成功</span>",
                    classes: "rounded green"
                  });

                }).catch(err => {
                  console.log(err);
                });
                console.log(this.token);
              }
              else if(this.isScholar==="institution"){
                this.$user.post('/pp/login', {
                  email: this.email,
                  password: this.password
                }).then(rsp => {
                  if(rsp.data.code==="400"){
                    this.passwordMessage=rsp.data.msg;
                    return;
                  }
                  this.token = rsp.data.data.token;
                  sessionStorage.setItem('session',this.token);
                  this.session_callback();
                  this.$router.push('/orgspace');

                  M.toast({
                    html:"<span style='font-weight: bold'>登录成功</span>",
                    classes: "rounded green"
                  });

                }).catch(err => {
                  console.log(err);
                })
              }
              else if (this.isScholar==="manager"){
                this.$user.post('/manager/login', {
                  email: this.email,
                  password: this.password
                }).then(rsp => {
                  if(rsp.data.code==="400"){
                    this.passwordMessage=rsp.data.msg;
                    return;
                  }
                  this.token = rsp.data.data.token;
                  sessionStorage.setItem('session',this.token);
                  this.session_callback();
                  this.$router.push('/review/application');

                  M.toast({
                    html:"<span style='font-weight: bold'>登录成功</span>",
                    classes: "rounded green"
                  });

                }).catch(err => {
                  console.log(err);
                })
              }
          },
          session_callback: function() {
            this.$axios.post('/api/user/token', {
              token: this.token,
            }).then(rsp => {
              sessionStorage.setItem('name',rsp.data.data.name);
            }).catch(err => {
              console.log(err);
            });
          }
        },
        created(){
        },
        mounted(){
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
