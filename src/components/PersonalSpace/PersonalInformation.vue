<template>
  <div>
    <div class="row" style="height: 1rem;"></div>
    <div class="row">
      <form class="col s8 offset-s1">
        <div class="row">
          <div class="input-field col s6">
            <i class="material-icons prefix">account_circle</i>
            <input id="icon_prefix" type="text" class="validate" v-model="individual_information.name">
            <label for="icon_prefix">Name</label>
          </div>
          <div class="input-field col s6">
            <i class="material-icons prefix">account_balance</i>
            <input id="icon_telephone" type="text" class="validate" v-model="individual_information.institution">
            <label for="icon_telephone">Institution</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s6">
            <i class="material-icons prefix">phone</i>
            <input id="icon_prefix" type="tel" class="validate" v-model="individual_information.telephone">
            <label for="icon_prefix">Telephone</label>
          </div>
          <div class="input-field col s6">
            <i class="material-icons prefix">email</i>
            <input id="icon_telephone" type="email" class="validate" v-model="individual_information.email">
            <label for="icon_telephone">Email</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <i class="material-icons prefix">description</i>
            <textarea id="textarea1" class="materialize-textarea" v-model="individual_information.profile"></textarea>
            <label for="textarea1">Introduction</label>
          </div>
        </div>
        <div class="row center-align">
          <div class="btn-large blue darken-1" @click="submit">
          <i class="material-icons left">send</i>
            提交
        </div>
        </div>
      </form>
      <div class="col s2" style="margin-left: 3rem;">
        <div class="card">
          <div class="card-image">
            <img v-bind:src="individual_information.avator"></img>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  name:"PersonalInformation",
  components:{},
  data: function () {
    return{
        individual_information:{
          name: "李某某",
          email: "li@qq.com",
          avator: "../../../static/Image/C1.png",
          profile: "简介",
          telephone:"18811526200",
          institution:"清华大学"
        }
    }
  },
  methods:{
    created(){

    },
    mounted(){
      this.$axios.post('/api/user/info', {}).then(rsp => {
        if (rsp.data.status === 'succ') {
          if (rsp.data.data.principal.power === 'all') {
            this.is_superuser = true;
          }
        }
      }).catch(err => {
        M.toast({
          html: "<span style='font-weight: bold'>" + err.toString() + "</span>",
          classes: "rounded red"
        });
      })
    }
  }
};
</script>
