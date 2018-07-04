<template>
  <div class="row">
    <div class="col s12">
      <div id="contrib_detail" class="card">
        <div class="card-content">
          <span class="card-title">{{ contrib.title }}</span>
          <div class="row">
            <span class="grey-text">{{ contrib.uploader }} 最近上传于 {{ readable_time(contrib.total_submit) }} #{{ contrib.paper_number }}</span>
            <span class="new teal badge" v-if="contrib.total_result === '1'">已通过</span>
            <span class="new blue badge" v-else-if="contrib.total_result === '0'">未审核</span>
            <span class="new orange badge" v-else-if="contrib.total_result === '2'">修改中</span>
            <span class="new red badge" v-else="contrib.total_result === '3'">已拒绝</span>
          </div>
          <div class="row">
            <div class="col center-align" v-bind:class="'s'+(12/contrib.author.length)"
                 v-for="author in contrib.author">
              <h5>{{ author.name }}</h5>
              <h6>{{ author.institution }}</h6>
              <h6>{{ author.email }}</h6>
            </div>
          </div>
          <div class="row">
            <span>{{ contrib.abstract_ }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { readable_time } from '@/js/utils';

  export default {
    name: "Review",
    data: function () {
      return {
        contrib_id: 1,
        contrib: {},
        review_names: [
          '第一次评审',
          '第二次评审',
          '第三次评审'
        ]
      }
    },
    mounted: function () {
      this.contrib_id = parseInt(this.$route.params.id);
      this.$bua.emit('manage-change-title', { text: '审核稿件' });
    },
    methods: {
      get_detail: function () {
        this.$axios.post()
      }
    }
  }
</script>

<style scoped>

</style>
