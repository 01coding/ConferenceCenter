<template>
  <div class="container" style="padding-top: 3%">
      <div class="col s12">
        <ul class="tabs">
          <li class="tab col s6"><a class="active" href="#tab1">未读</a></li>
          <li class="tab col s6"><a href="#tab2">已读</a></li>
        </ul>
      </div>
      <div id="tab1" class="col s12">
        <div v-for="item in notReadYet">
          <div class="row" style="padding-right: 1.2%;padding-left: 1.2%">
            <div class="card blue-grey darken-1">
              <div class="card-content white-text">
                <h4 style="padding-top: 0;margin-top: 0">{{item.send_time}}</h4>
                <p>{{item.content}}.</p>
              </div>
              <div class="card-action right-align">
                <button class="btn green">标记为已读</button>
              </div>
            </div>
          </div>
          <div class="divider"></div>
        </div>
      </div>
      <div id="tab2" class="col s12">
        <div v-for="item in alreadyRead">
          <div class="row" style="padding-right: 1.2%;padding-left: 1.2%">
            <div class="card blue-grey darken-1">
              <div class="card-content white-text">
                <h4 style="padding-top: 0;margin-top: 0">{{item.send_time}}</h4>
                <p>{{item.content}}.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
    export default {
        name: "PersonalMessage",
        data:function(){
          return{
            notReadYet:{},
            alreadyRead:{}
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
          this.$axios.post('/api/user/messages', {index:1,size:3,state:0})
            .then(response => {
                that.notReadYet=response.data.data.messages;
              }
            ).catch(
            error => {
              M.toast({
                html: error,
                classes: "rounded red darken-2"
              });
            }
          );
          this.$axios.post('/api/user/messages', {index:1,size:5,state:1})
            .then(response => {
                that.alreadyRead=response.data.data.messages;
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
