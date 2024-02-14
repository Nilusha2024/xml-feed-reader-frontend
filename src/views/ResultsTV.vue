<template>

  <div class="container-fluid">
    <div class="row no-gutters">
      <div  class="result_label col-md-5">Latest Result</div>
      <div class="result_label col-md-1"></div>
    </div>
    <div class="row no-gutters">
      <div v-for="result in row1" :key="result.id" class="col-lg-6" style="padding: 10px;">
        <RaceResult :result="result" :race="result.race"/>
      </div>
    </div>
    <div class="row no-gutters">
      <div v-for="result in row2" :key="result.id" class="col-lg-3" style="padding: 10px;">
        <RaceResult :result="result" :race="result.race" />
      </div>
    </div>
    <div class="row no-gutters">
      <div v-for="result in row3" :key="result.id" class="col-lg-2" style="padding: 10px;">
        <RaceResult :result="result" :race="result.race" />
      </div>
    </div>
  </div>
</template>

<script>
import RaceResult from '@/components/RaceResult.vue';
export default {
  name: 'ResultsTV',
  components: {
    RaceResult
  },
  computed: {
    row1() {
      return this.$store.getters.latestResults.slice(0, 2).map(
        race =>
          new Object({
            id: race.id,
            raceName: race.description,
            type: race.type,
            track: race.track,
            result: race.results,
            race: race
          })
      );
    },
    row2() {
      return this.$store.getters.latestResults.slice(2, 6).map(
        race =>
          new Object({
            id: race.id,
            raceName: race.description,
            type: race.type,
            track: race.track,
            result: race.results,
            race: race
          })
      );
    },
    row3() {
      return this.$store.getters.latestResults.slice(6).map(
        race =>
          new Object({
            id: race.id,
            raceName: race.description,
            type: race.type,
            track: race.track,
            result: race.results,
            race: race
          })
      );
    }
  }
};

 
</script>

<style scoped>
.result_label {
  color: white;
  font-size: 30px;
  text-align: left;
}
</style>