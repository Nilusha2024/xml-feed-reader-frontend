<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <label class="success" style="font-size:2em; color: white;">{{ number }}</label>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6" v-for="race in races" :key="race.id">
        <AusRaceWindow :race="race" :length="10" v-if="race.source === 'aus-feed'" />
        <EngRaceWindow :race="race" :length="10" v-if="race.source === 'eng-feed'" />
        <AusResultWindow :race="race" v-if="race.source === 'aus-result'" />
        <EngResultWindow :race="race" v-if="race.source === 'eng-result'" />
      </div>
    </div>
  </div>
</template>

<script>
import AusRaceWindow from '@/components/race-window/AusRaceWindow.vue';
import EngRaceWindow from '@/components/race-window/EngRaceWindow.vue';
import AusResultWindow from '@/components/race-window/AusResultWindow.vue';
import EngResultWindow from '@/components/race-window/EngResultWindow.vue';

export default {
  name: 'Television',
  props: ['number'],
  components: {
    AusRaceWindow,
    EngRaceWindow,
    AusResultWindow,
    EngResultWindow,
  },
  computed: {
    races() {
      if (this.number == 1) {
        return this.$store.getters.upcomingHorseRaces.slice(0, 2);
      } else if (this.number == 2) {
        return this.$store.getters.upcomingHorseRaces.slice(2, 4);
      } else if (this.number == 3) {
        return this.$store.getters.upcomingHorseRaces.slice(4, 6);
      } else if (this.number == 4) {
        return this.$store.getters.upcomingDogRaces.slice(0, 2);
      } else {
        return null;
      }
    },
  },
};
</script>
