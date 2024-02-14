<template>
  <div id="app">
    <img id="ico-humburger" :src="require('@/assets/hamburger.svg')" alt="Hamburger" @click="onClickBurger" />
    <TheNavigation v-show="navToggle" />
    <router-view v-bind:class="{ 'mt-3': !navToggle }" :key="$route.path" />
  </div>
</template>
<script>
import TheNavigation from '@/components/TheNavigation.vue';
import io from 'socket.io-client';
import ResultsTVVue from './views/ResultsTV.vue';

export default {
  data: function () {
    return {
      navToggle: true,
    };
  },
  components: {
    TheNavigation,
  },
  methods: {
    onClickBurger() {
      this.navToggle = !this.navToggle;
    },
  },
  created() {
    const socket = io('http://172.16.10.49:4000');

    socket.on('connection', (data) => {
      console.log(data);
    });

    socket.on('races', (raceList) => {
      this.$store.dispatch('onRaceList', raceList);
    });

    socket.on('open', (raceEvent) => {
      this.$store.dispatch('onRaceOpen', raceEvent);
    });

    socket.on('closed', (raceEvent) => {
      this.$store.dispatch('onRaceClosed', raceEvent);
    });

    socket.on('result', (raceEvent) => {
      this.$store.dispatch('onRaceResult', raceEvent);
    });

    socket.on('eng-nilusha',(data) => {
      if(data['-name'] == 'event_index'){
        let races = data.meeting.event.map(e=>{
          return {
            id:e['-id'],
            time:e['-time'],
            offTime:e['-offTime']
          };
        });
        let type = data['-category'];
        this.$store.dispatch('onEnglishRaceList', {races, type});
      }
    });

    socket.on('aus-result', (raceEvent) => {
      raceEvent.source = 'aus-result';
      this.$store.dispatch('onRaceResult', raceEvent);
    }, 2 * 1000);
    

    socket.on('eng-result', (result) => {
      console.log('eng2-result', result.type, result);
      this.$store.dispatch('onEngResult', result);
    });

    setInterval(() => {
      this.$store.dispatch('clearResults');
    }, 2 * 1000);
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#ico-humburger {
  position: absolute;
  right: 0px;
  top: 0px;
  z-index: 1;
}
</style>
