<template>
  <div>
    <ul class="tabs">
      <li class="tab col s6"><a class="active" href="#tab1">未读</a></li>
      <li class="tab col s6"><a href="#tab2">已读</a></li>
    </ul>
    <div style="height: 1rem;"></div>
    <div id="tab1" class="row">
      <div class="container">
        <div v-for="item in notReadYet">
          <div class="row" style="padding-right: 1.2%;padding-left: 1.2%">
            <div class="card">
              <div class="card-content">
                <h4 style="padding-top: 0;margin-top: 0">{{item.send_time}}</h4>
                <p>{{item.content}}.</p>
              </div>
              <div class="card-action right-align">
                <button class="btn green" @click="readMessage(item)">标记为已读</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="tab2" class="row container">
      <div class="container">
        <div v-for="item in alreadyRead">
          <div class="row" style="padding-right: 1.2%;padding-left: 1.2%">
            <div class="card">
              <div class="card-content">
                <h4 style="padding-top: 0;margin-top: 0">{{item.send_time}}</h4>
                <p>{{item.content}}.</p>
              </div>
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
            alreadyRead:{},
            index:1
          }
        },
        methods:{
          readMessage:function(item){
            let that = this;
            this.$axios.post('/api/user/message/'+item.id, {})
              .then(response => {
                  var i=-1;
                  for(i=0;i<that.notReadYet.length;++i){
                    if(that.notReadYet[i]==item)break;
                  }
                  if(i!=-1){
                    that.notReadYet.splice(i,1);
                  }
                    that.alreadyRead.push(item);
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
        },
        computed:{
        },
        mounted(){
          this.$bus.emit('manage-change-title', {text: '我的消息'});
          let that = this;
          this.$axios.post('/api/user/messages', {index:that.index,size:3,state:0})
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
          this.$axios.post('/api/user/messages', {index:that.index,size:5,state:1})
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
        },
        created(){
          $(document).ready(function(){
            $('.tabs').tabs();
          });
        }
    }
</script>

<style scoped>
  .col .row {
    margin: 0;
  }
</style>
