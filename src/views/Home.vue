<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-4">
        <table class='table table-striped table-dark'>
          <thead>
            <tr>
              <th colspan="4">English Races</th>
            </tr>
            <tr>
              <th>Race ID</th>
              <th>Start Time</th>
              <th>Off Time</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="race in englishRaces" :key="race.id">
              <td>{{ race.id }}</td>
              <td>{{ race.time }}</td>
              <td>{{ race.offTime }}</td>
              <td>{{ race.type }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-lg-4">
        <table class='table table-striped table-dark'>
          <thead>
            <tr>
              <th colspan="4">Horse Races</th>
            </tr>
            <tr>
              <th>Race ID</th>
              <th>Start Time</th>
              <th>Status</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="race in horseRaces" :key="race.id">
              <td>{{ race.id }}</td>
              <td>{{ race.start }}</td>
              <td>{{ race.status }}</td>
              <td>{{ race.dataAvailable }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-lg-4">
        <table class='table table-striped table-dark'>
          <thead>
            <tr>
              <th colspan="4">Dog Races</th>
            </tr>
            <tr>
              <th>Race ID</th>
              <th>Start Time</th>
              <th>Status</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="race in dogRaces" :key="race.id">
              <td>{{ race.id }}</td>
              <td>{{ race.start }}</td>
              <td>{{ race.status }}</td>
              <td>{{ race.dataAvailable }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Home',
  computed: mapGetters({
    races: 'raceData',
    dogRaces: 'runningDogRaces',
    horseRaces: 'runningHorseRaces',
    englishRaces: 'upComingEnglishRaces'
  })
};
</script>

<style scoped>
.container-fluid,
.container-lg,
.container-md,
.container-sm,
.container-xl {
  width: 100%;
  /* padding-right: 45px; */
  /* padding-left: 45px; */
  margin-right: auto;
  margin-left: auto;
  padding: 40px;
}
</style>
