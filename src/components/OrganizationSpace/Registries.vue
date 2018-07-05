<template>
  <div>
    <div class="row">
      <div class="col s12">
        <table class="striped centered responsive-table">
          <thead>
          <tr>
            <th rowspan="2">注册用户</th>
            <th rowspan="2">论文编号(无为聆听者)</th>
            <th rowspan="2">缴费凭证</th>
            <th colspan="6">参会者</th>
          </tr>
          <tr>
            <!--<th colspan="3"></th>-->
            <th>姓名</th>
            <th>性别</th>
            <th>工作</th>
            <th>联系方式</th>
            <th>住宿</th>
            <th>备注</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="regist in registry_list">
            <td>{{ regist.user_name }}</td>
            <td v-if="regist.paper_number">{{ regist.paper_number }}</td>
            <td v-else>无</td>
            <td>缴费</td>
            <td>{{ regist.name }}</td>
            <td>{{ regist.sex }}</td>
            <td>{{ regist.job }}</td>
            <td>{{ regist.contact }}</td>
            <td v-if="regist.is_book">是</td>
            <td v-else>否</td>
            <td>备注</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row center">
      <pagination @page="page" v-bind:number="page_num" v-bind:current="current"></pagination>
    </div>
  </div>
</template>

<script>
  import pagination from '@/include/Pagination';

  export default {
    name: "Registries",
    components: { pagination },
    data: function () {
      return {
        conf_id: 1,
        registries: [],
        page_num: 1,
        current: 1,
        per_page: 10
      };
    },
    mounted: function () {
      this.conf_id = this.$route.params.id;
      this.refresh();
    },
    methods: {
      refresh: function () {
        this.$axios.post('/api/manage/registry', {
          conference_id: this.conf_id,
          index: this.current,
          size: this.per_page
        }).then(rsp => {
          if (rsp.data.status === 'succ') {
            this.registries = rsp.data.data.registries;
            this.page_num = rsp.data.data.page_num;
          }
        }).catch(err => {

        })
      },
      page: function (num) {
        this.current = num;
        this.refresh();
      }
    },
    computed: {
      registry_list: function () {
        let list = [];
        // if (this.registries.length !== 0) {
        for (let item in this.registries) {
          list.push({
            user_name: item.user_name,
            user_id: item.user_id,
            paper_number: item.type === 0 ? item.paper_number : false,
            payment: item.payment,
            name: item.participant[ 0 ].name,
            sex: item.participant[ 0 ].sex,
            job: item.participant[ 0 ].job,
            contact: item.participant[ 0 ].contract,
            is_book: item.participant[ 0 ].is_book,
            note: item.participant[ 0 ].note
          });
          for (let i = 1; i < item.participant.length; ++i) {
            list.push({
              user_name: '',
              user_id: '',
              paper_number: '',
              payment: false,
              name: item.participant[ i ].name,
              sex: item.participant[ i ].sex,
              job: item.participant[ i ].job,
              contact: item.participant[ i ].contract,
              is_book: item.participant[ i ].is_book,
              note: item.participant[ i ].note
            });
          }
          // }
        }
        return list;
      }
    }
  }
</script>

<style scoped>
  .row {
    margin: 0;
  }
</style>
