import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    raceData: new Map(),
    raceList: new Array(),
    latestResults: new Array(),
    dogPool: new Array(),
    horsePool: new Array(),
    todoDelete: new Array(),
    upcomingRaces: new Array(),
    englishRaces: new Array()
  },
  mutations: {
    UPDATE_EVENT: (state, raceEvent) => {
      const raceSnap = new Map(state.raceData.entries());
      raceSnap.set(raceEvent.id, raceEvent);
      state.raceData = raceSnap;
    },
    PUBLISH_RESULT: (state, result) => {
      const raceSnap = new Map(state.raceData.entries());
      raceSnap.set(result.id, result);
      /*if (state.todoDelete.indexOf(result.id) == -1) {
        state.todoDelete.push(result.id);
      }
      const results = [...state.latestResults];
      results.push(result);
      if (results.length > 12) {
        results.shift();
      }*/
      state.raceData = raceSnap;
      //state.latestResults = results;
    },
    UPDATE_RACE_LIST: (state, races) => {
      state.raceList = races;
      let raceIds = races.map(r => r['-id']);
      const raceSnap = new Map(state.raceData.entries());
      raceSnap.forEach((_, id, snap) => {
        if (raceIds.indexOf(id) == -1) {
          snap.delete(id);
        }
      });
      state.raceData = raceSnap;
    },
    REMOVE_RESULTS: state => {
      /*const raceSnap = new Map(state.raceData.entries());
      state.todoDelete.forEach(raceId => {
        raceSnap.delete(raceId);
      });
      state.todoDelete = new Array();
      state.raceData = raceSnap;*/
      console.log('nilusha','races', state.raceList.length, 'data', state.raceData.size);
    },
    ENGLISH_RACE_LIST: (state, payload) => {
      const raceListSnap = new Map(state.englishRaces.entries());
      payload.races.forEach(r => {
        r.type = payload.type;
        raceListSnap.set(r.id, r);
      });
      console.log('english-race-size',raceListSnap.size);
     state.englishRaces = raceListSnap;
    },
    PUBLISH_ENG_RESULT: (state, raceEvent) => {
      const raceSnap = new Map(state.raceData.entries());
      state.todoDelete.push({
        id: raceEvent.id,
        time: new Date
      });
      raceSnap.set(raceEvent.id, raceEvent);
      state.raceData = raceSnap;
    }
  },
  getters: {
    upComingEnglishRaces: state => {
      return [...state.englishRaces.values()]
        .sort((r1, r2) => r1.time - r2.time);
    },
    upcomingRaces: state => {
      return state.raceList.slice(0, 7);
    },

    latestResults: state => {
      return state.latestResults.reverse();
    },

    raceData: state => {
      return [...state.raceData.values()].sort((r1, r2) => r1.mtp - r2.mtp);
    },

    upcomingDogRaces: state => {
      /*return [...state.raceData.values()]
        .filter(r => r.type == 'DG')
        .sort((r1, r2) => r1.mtp - r2.mtp)
        .slice(pos1, pos2);*/
      let eventStatus = ['interim', 'closed', 'normal'];
      return state.raceList
        .filter(r => r['-racetype'] == 'G' && state.raceData.has(r['-id']))
        .sort((r1, r2) => eventStatus.indexOf(r1['-eventstatus']) - eventStatus.indexOf(r2['-eventstatus']))
        .sort((r1, r2) => r1['-starttime'] - r2['-starttime'])
        .slice(0, 4)
        .map(r => {
          return state.raceData.get(r['-id']);
        });
    },

    upcomingHorseRaces: state => {
      /*return [...state.raceData.values()]
        .filter(r => r.type == 'HR')
        .sort((r1, r2) => r1.mtp - r2.mtp)
        .slice(pos1, pos2);*/
      let eventStatus = ['interim', 'closed', 'normal'];
      return state.raceList
        .filter(r => r['-racetype'] != 'G' && state.raceData.has(r['-id']))
        .sort((r1, r2) => eventStatus.indexOf(r1['-eventstatus']) - eventStatus.indexOf(r2['-eventstatus']))
        .sort((r1, r2) => r1['-starttime'] - r2['-starttime'])
        .slice(0,6)
        .map(r => {
          return state.raceData.get(r['-id']);
        });
    },
    runningHorseRaces: state => {
      let eventStatus = ['interim', 'closed', 'normal'];
      return state.raceList
        .filter(r => r['-racetype'] != 'G')
        .sort((r1, r2) => eventStatus.indexOf(r1['-eventstatus']) - eventStatus.indexOf(r2['-eventstatus']))
        .sort((r1, r2) => r1['-starttime'] - r2['-starttime'])
        .slice(0, 6)
        .map(r => {
          return {
            id: r['-id'],
            start: r['-starttime'],
            status: r['-eventstatus'],
            dataAvailable: state.raceData.has(r['-id'])
          };
        });
    },
    runningDogRaces: state => {
      let eventStatus = ['interim', 'closed', 'normal'];
      return state.raceList
        .filter(r => r['-racetype'] == 'G')
        .sort((r1, r2) => eventStatus.indexOf(r1['-eventstatus']) - eventStatus.indexOf(r2['-eventstatus']))
        .sort((r1, r2) => r1['-starttime'] - r2['-starttime'])
        .slice(0, 6)
        .map(r => {
          return {
            id: r['-id'],
            start: r['-starttime'],
            status: r['-eventstatus'],
            dataAvailable: state.raceData.has(r['-id'])
          };
        });
    }
  },
  actions: {
    onRaceOpen: ({ commit }, payload) => {
      commit('UPDATE_EVENT', payload);
    },
    onEngResult:({ commit }, payload) => {
      commit('PUBLISH_ENG_RESULT', payload);
    },
    onRaceClosed: ({ commit }, payload) => {
      commit('UPDATE_EVENT', payload);
    },
    onRaceResult: ({ commit }, payload) => {
      commit('PUBLISH_RESULT', payload);
    },
    onRaceList: ({ commit }, payload) => {
      commit('UPDATE_RACE_LIST', payload);
    },
    clearResults: ({ commit }) => {
      commit('REMOVE_RESULTS');
    },
    onEnglishRaceList:({commit}, payload) => {
      commit('ENGLISH_RACE_LIST', payload);
    }
  }
});
