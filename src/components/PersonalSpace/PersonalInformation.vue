<template>
  <div>

  </div>
</template>

<script>
export default{
  name:"PersonalInformation",
  components:{},
  data: function () {
    return{
        individual_information:{}
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
