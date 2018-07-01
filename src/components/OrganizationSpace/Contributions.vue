<template>
  <div>
    <div class="row">
      <div class="col s12">
        <ul class="tabs">
          <!--<li class="tab col s3">Test 1</li>-->
          <!--<li class="tab col s3">Test 1</li>-->
          <!--<li class="tab col s3">Test 1</li>-->
          <!--<li class="tab col s3">Test 1</li>-->
          <!--<li class="tab col s2"><a href="#test1">全部 <span class="new badge blue">45</span></a></li>-->
          <li class="tab col s2"><a class="active" href="#all" @click="filter = 'all'; refresh();">全部 145</a></li>
          <li class="tab col s2"><a href="#passed" @click="filter = 'passed'; refresh();">已通过 23</a></li>
          <li class="tab col s2"><a href="#pending" @click="filter = 'pending'; refresh();">审核中 80</a></li>
          <li class="tab col s2"><a href="#fixing" @click="filter = 'fixing'; refresh();">修改中 20</a></li>
          <li class="tab col s2"><a href="#rejected" @click="filter = 'rejected'; refresh();">已拒绝 22</a></li>
        </ul>
      </div>
      <div id="all" class="col s12">
        <div class="card" v-for="(item, index) in all_list" v-bind:key="index">
          <div class="card-content">
            <span class="card-title activator">{{ item.title }}<i class="material-icons right">more_vert</i></span>
            <div class="row">
              上传者 {{ item.uploader }}
            </div>
            <div class="row">
              <div class="col center-align" v-bind:class="'s'+(12/item.author.length)" v-for="author in item.author">
                <h5>{{ author.name }}</h5>
                <h6>{{ author.institution }}</h6>
                <h6>{{ author.email }}</h6>
              </div>
            </div>
            <div class="row">
              <div class="col center-align" v-bind:class="'s'+(12/item.review.length)" v-for="review in item.review">
                评审{{ review.id }}
              </div>
            </div>
          </div>
          <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">摘要<i class="material-icons right">close</i></span>
            <p>{{ item.abstract_ }}</p>
          </div>
        </div>
      </div>
      <div id="passed" class="col s12">
        <div class="card" v-for="(item, index) in passed_list" v-bind:key="index">
          <div class="card-content">
            <span class="card-title activator">{{ item.title }}<i class="material-icons right">more_vert</i></span>
            <div class="row">
              上传者 {{ item.uploader }}
            </div>
            <div class="row">
              <div class="col center-align" v-bind:class="'s'+(12/item.author.length)" v-for="author in item.author">
                <h5>{{ author.name }}</h5>
                <h6>{{ author.institution }}</h6>
                <h6>{{ author.email }}</h6>
              </div>
            </div>
            <div class="row">
              <div class="col center-align" v-bind:class="'s'+(12/item.review.length)" v-for="review in item.review">
                评审{{ review.id }}
              </div>
            </div>
          </div>
          <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">摘要<i class="material-icons right">close</i></span>
            <p>{{ item.abstract_ }}</p>
          </div>
        </div>
      </div>
      <div id="pending" class="col s12">
        <div class="card" v-for="(item, index) in pending_list" v-bind:key="index">
          <div class="card-content">
            <span class="card-title activator">{{ item.title }}<i class="material-icons right">more_vert</i></span>
            <div class="row">
              上传者 {{ item.uploader }}
            </div>
            <div class="row">
              <div class="col center-align" v-bind:class="'s'+(12/item.author.length)" v-for="author in item.author">
                <h5>{{ author.name }}</h5>
                <h6>{{ author.institution }}</h6>
                <h6>{{ author.email }}</h6>
              </div>
            </div>
            <div class="row">
              <div class="col center-align" v-bind:class="'s'+(12/item.review.length)" v-for="review in item.review">
                评审{{ review.id }}
              </div>
            </div>
          </div>
          <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">摘要<i class="material-icons right">close</i></span>
            <p>{{ item.abstract_ }}</p>
          </div>
        </div>
      </div>
      <div id="fixing" class="col s12">
        <div class="card" v-for="(item, index) in fixing_list" v-bind:key="index">
          <div class="card-content">
            <span class="card-title activator">{{ item.title }}<i class="material-icons right">more_vert</i></span>
            <div class="row">
              上传者 {{ item.uploader }}
            </div>
            <div class="row">
              <div class="col center-align" v-bind:class="'s'+(12/item.author.length)" v-for="author in item.author">
                <h5>{{ author.name }}</h5>
                <h6>{{ author.institution }}</h6>
                <h6>{{ author.email }}</h6>
              </div>
            </div>
            <div class="row">
              <div class="col center-align" v-bind:class="'s'+(12/item.review.length)" v-for="review in item.review">
                评审{{ review.id }}
              </div>
            </div>
          </div>
          <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">摘要<i class="material-icons right">close</i></span>
            <p>{{ item.abstract_ }}</p>
          </div>
        </div>
      </div>
      <div id="rejected" class="col s12">
        <div class="card" v-for="(item, index) in rejected_list" v-bind:key="index">
          <div class="card-content">
            <span class="card-title activator">{{ item.title }}<i class="material-icons right">more_vert</i></span>
            <div class="row">
              上传者 {{ item.uploader }}
            </div>
            <div class="row">
              <div class="col center-align" v-bind:class="'s'+(12/item.author.length)" v-for="author in item.author">
                <h5>{{ author.name }}</h5>
                <h6>{{ author.institution }}</h6>
                <h6>{{ author.email }}</h6>
              </div>
            </div>
            <div class="row">
              <div class="col center-align" v-bind:class="'s'+(12/item.review.length)" v-for="review in item.review">
                评审{{ review.id }}
              </div>
            </div>
          </div>
          <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">摘要<i class="material-icons right">close</i></span>
            <p>{{ item.abstract_ }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import pagination from '@/include/Pagination';
  export default {
    name: "Contributions",
    components: { pagination },
    data: function () {
      return {
        conference_id: 1,
        passed_list: [],
        pending_list: [],
        fixing_list: [],
        rejected_list: [],
        all_list: [],
        number: 1,
        current: 1,
        per_page: 10,
        filter: 'all'
      }
    },
    created: function () {
      this.conference_id = parseInt(this.$route.params.id);
    },
    mounted: function () {
      $(document).ready(function () {
        $('.tabs').tabs();
      });
      this.refresh();
    },
    methods: {
      refresh: function () {
        this.$axios.post('/api/manage/conference/' + this.conference_id + '/contributions', {
          index: this.current,
          size: this.per_page,
          type: this.filter
        }).then(rsp => {
          if (this.filter === 'all')
            this.all_list = rsp.data.data.contributions;
          else if (this.filter === 'pending')
            this.pending_list = rsp.data.data.contributions;
          else if (this.filter === 'passed')
            this.passed_list = rsp.data.data.contributions;
          else if (this.filter === 'fixing')
            this.fixing_list = rsp.data.data.contributions;
          else if (this.filter === 'rejected')
            this.rejected_list = rsp.data.data.contributions;
        });
      }
    }
  }
</script>

<style scoped>

</style>
