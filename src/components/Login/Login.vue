<template>
  <div>
    <br/>
    <div class="row center-align" style="margin-top:70px; margin-bottom: 1px">
      <h2>Login</h2>
    </div>
    <div class="row">
      <div class="col s12 m4 offset-m4 l4 offset-l4">
        <div class="card-panel" style="padding-bottom: 5px">
          <div class="row">
              <div class="row">
                <div class="input-field col s12">
                  <i class="medium material-icons prefix">email</i>
                  <input id="email" type="email" class="validate"  v-model="email"/>
                  <label for="email">Email</label>
                </div>
                <span class="red-text" style="margin-left: 55px">{{emailMessage}}</span>
              </div>
              <div class="row">
                <div class="input-field col s12">
                  <i class="medium material-icons prefix">vpn_key</i>
                  <input id="password" type="password" class="validate" v-model="password" />
                  <label for="password">Password</label>
                </div>
                <span class="red-text" style="margin-left: 55px">{{passwordMessage}}</span>
              </div>
              <div class="row center-align">
                  <p>
                    <label class="col s3 offset-l1">
                      <input type="radio" name="scholar" value="scholar" v-model="isScholar" checked />
                      <span>学者</span>
                    </label>
                    <label class="col s4">
                      <input type="radio" name="institution" value="institution" v-model="isScholar" />
                      <span>主办方</span>
                    </label>
                    <label class="col s3">
                      <input type="radio" name="manager" value="manager" v-model="isScholar" />
                      <span>管理员</span>
                    </label>
                  </p>
              </div>
              <div class="row center-align">
                <button class="col s6 offset-l3 btn waves-effect waves-light" style="margin-top: 7px;" type="submit" name="action" v-on:click="loginfuc()">Submit
                </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
          return {
            email : '',
            password : '',
            isScholar: 'scholar',
            emailMessage: '',
            passwordMessage:''
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
                  console.log(rsp.data);
                }).catch(err => {
                  console.log(err);
                })
              }
              else if(this.isScholar==="institution"){
                this.$user.post('/pp/login', {
                  email: this.email,
                  password: this.password
                }).then(rsp => {
                  console.log(rsp.data);
                }).catch(err => {
                  console.log(err);
                })
              }
              else if (this.isScholar==="manager"){
                this.$user.post('/manager/login', {
                  email: this.email,
                  password: this.password
                }).then(rsp => {
                  console.log(rsp.data);
                }).catch(err => {
                  console.log(err);
                })
              }
          }
        },
        created(){
        },
        mounted(){
        }
    }

</script>

<style scoped>

</style>
