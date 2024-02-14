<template>
  <div class="container-fluid">
    <div class="row">
      <div class="race_div col-lg-6" v-for="race in races" :key="race.id">
        <AusRaceWindow :race="race" :length="10" v-if="race.source === 'aus-feed'" />
        <EngRaceWindow :race="race" :length="10" v-if="race.source === 'eng-feed'" />
        <AusResultWindow :race="race" v-if="race.source === 'aus-result'" />
        <EngResultWindow :race="race" v-if="race.source === 'eng-result'" />
      </div>
      <div class="col-lg-6" >
        <RaceList />
      </div>
    </div>
  </div>
</template>

<script>
import AusRaceWindow from '@/components/race-window/AusRaceWindow.vue';
import EngRaceWindow from '@/components/race-window/EngRaceWindow.vue';
import AusResultWindow from '@/components/race-window/AusResultWindow.vue';
import EngResultWindow from '@/components/race-window/EngResultWindow.vue';
import RaceList from '@/components/RaceList.vue';

export default {
  name: 'HybridTelevision',
  components: {
    AusRaceWindow,
    EngRaceWindow,
    AusResultWindow,
    EngResultWindow,
    RaceList
  },
  computed: {
    races() {
      return this.$store.getters.upcomingDogRaces.slice(2, 3);
    }
  }
};
</script>

<style scoped>

</style>
