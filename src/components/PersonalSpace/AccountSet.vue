<template>
  <div>
    <div class="row" style="height: 1rem;"></div>
    <div class="row">
      <form class="col s10 offset-s1">
        <div class="row">
          <div class="input-field col s8">
            <i class="material-icons prefix">email</i>
            <input disabled id="icon_telephone" type="email" class="validate" v-model="individual_information.email">
            <label for="disabled">Email</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s8">
            <i class="material-icons prefix">vpn_key</i>
            <input id="password_origin" type="password" class="validate" v-model="origin_pass">
            <label for="password">Password</label>
          </div>
          <div class="col s4" style="margin-top: 2.4rem;">
            请输入原来的旧密码
          </div>
        </div>
        <div class="row">
          <div class="input-field col s8">
            <i class="material-icons prefix">vpn_key</i>
            <input id="password_first" type="password" class="validate" v-model="first_pass">
            <label for="password">Password</label>
          </div>
          <div class="col s4" style="margin-top: 2.4rem;">
            请输入新的密码
          </div>
        </div>
        <div class="row">
          <div class="input-field col s8">
            <i class="material-icons prefix">vpn_key</i>
            <input id="password_second" type="password" class="validate" v-model="second_pass">
            <label for="password">Password</label>
          </div>
          <div class="col s4" style="margin-top: 2.4rem;">
            请再次确认密码
          </div>
        </div>
        <div class="row center-align">
          <div class="btn-large blue darken-1" @click="submit">
            <i class="material-icons left">send</i>
            提交
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default{
  name:"AccountSet",
  components:{},
  data:function () {
      return{
        individual_information:{
            email:"23"
        },
        origin_pass:"123",
        first_pass:"123",
        second_pass:"123"
      }
  },
  methods:{
      submit:function () {
        if(this.first_pass!=this.second_pass){
          M.toast({
            html: "<span style='font-weight: bold'>" + "二次密码输入不一致" + "</span>",
            classes: "rounded red"
          });
        }
        else{
          let pass_info={
            origin_pass:this.origin_pass,
            new_pass:this.first_pass
          };
          this.$axios.post('http://118.89.229.204:8080/server-0.0.1-SNAPSHOT/api/user/password', pass_info).then(rsp => {
            if (rsp.data.status === 'succ') {
              M.toast({
                html: "<span style='font-weight: bold'>" + "修改成功" + "</span>",
                classes: "rounded green"
              });
            }
            else{
              M.toast({
                html: "<span style='font-weight: bold'>" + rsp.data.info + "</span>",
                classes: "rounded green"
              });
            }
          }).catch(err => {
            M.toast({
              html: "<span style='font-weight: bold'>" + err.toString() + "</span>",
              classes: "rounded red"
            });
          })
        }
      },

  },
  created(){

  },
  mounted(){
    $(document).ready(function() {
      M.updateTextFields();
    });

    this.$axios.post('http://118.89.229.204:8080/server-0.0.1-SNAPSHOT/api/user/info', {}).then(rsp => {
      if (rsp.data.status === 'succ') {
        this.individual_information=rsp.data.data;
      }
    }).catch(err => {
      M.toast({
        html: "<span style='font-weight: bold'>" + err.toString() + "</span>",
        classes: "rounded red"
      });
    })
    this.$bus.emit('manage-change-title', {text: '账户密码设置'});

    this.origin_pass="";
    this.first_pass="";
    this.second_pass="";

    this.$bus.emit('manage-change-title', {text: '账户设置'});
  },
};
</script>
