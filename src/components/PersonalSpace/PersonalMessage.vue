<template>
  <div class="container" style="padding-top: 3%">
      <div class="col s12">
        <ul class="tabs">
          <li class="tab col s6"><a class="active" href="#tab1">未读</a></li>
          <li class="tab col s6"><a href="#tab2">已读</a></li>
        </ul>
      </div>
      <div id="tab1" class="col s12">
        <div v-for="item in personalMessages.messages">
          <div class="row">
            <span>{{item.content}}</span>
          </div>
          <div class="divider"></div>
        </div>
      </div>
      <div id="tab2" class="col s12">Test 2</div>
  </div>
</template>

<script>
    export default {
        name: "PersonalMessage",
        data:function(){
          return{
            personalMessages:{}
          }
        },
        mounted(){
          this.$bus.emit('manage-change-title', {text: '我的消息'});
        },
        created(){
          $(document).ready(function(){
            $('.tabs').tabs();
          });

          let that = this;
          this.$axios.post('/api/user/messages', {index:1,size:5})
            .then(response => {
                that.personalMessages = response.data.data;
              }
            ).catch(
            error => {
              M.toast({
                html: error,
                classes: "rounded red darken-2"
              });
            }
          );
        }
    }
</script>

<style scoped>

</style>
