<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 h4">Racing Today</div>
      <div class="col-md-4">Date</div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <table class="table table-dark table-striped">
          <thead>
            <tr>
              <th>Race Code Name</th>
              <th>Next</th>
              <th>Last</th>
              <th>Going</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="race in dataset" :key="race.id">
              <td>{{ race.name }}</td>
              <td>{{ race.next }}</td>
              <td>{{ race.last }}</td>
              <td>{{ race.going }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row h6">
      <div class="col-md-12">Page 3 of 3</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RaceList',
  props: {},
  data: function() {
    return {
      index: 0,
    };
  },
  computed: {
    pageCount() {
      return 2;
    },
    dataset() {
      return [];
    },
  },
  methods: {
    paginate() {
      this.index = (this.index + 1) % this.pageCount;
    },
  },
  mounted() {
    setInterval(() => this.paginate(), 3000);
  },
};
</script>
