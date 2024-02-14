<template>
  <div>
   
    <table class="table table-dark table-striped table-sm" :class="[result.type]">
      <thead>
        <tr>
          <th colspan="2" class="racename">{{ result['raceName'] }}</th>
           <td class="win_header">WIN</td>
           <td class="plc_header">PLC</td>
        </tr>
      </thead>
      <tbody :class="[result.type]">
        <tr class="data">
          <td class="first_number">1<sup>st</sup></td>
          <td class="first_competitor">{{ winner.name }}</td>
          <td class="first_win">{{ winner.win }}</td>
          <td class="first_plc">{{ winner.plc }}</td>
        </tr>
        <tr v-for="place in places" :key="place.number" class="data">
          <td  class="number" v-if="place.instance == 2">2<sup>nd</sup></td>
          <td  class="number" v-if="place.instance == 3">3<sup>rd</sup></td>
          <td  class="number" v-if="place.instance == 4">4<sup>th</sup></td>
          <td class="competitor">{{ place.name }}</td>
          <td></td>
          <td class="plc" v-if="place.instance == 2">{{ place.plc }}</td>
        </tr>
         <tr class="data">
              <td class="competitor" colspan="1">QUIN</td>
              <td class="win">{{ quinella }}</td>
               <td class="competitor" colspan="1">EXA</td>
              <td class="win">{{ exacta }}</td>
            </tr>
            <tr class="data">
              <td class="competitor" colspan="1">RTF</td>
              <td class="win">{{ trifecta }}</td>
              <td class="competitor" colspan="1">FTH</td>
              <td class="win">{{ first4 }}</td>
            </tr>
      </tbody>
    </table>
     
  </div>
</template>

<script>
export default {
  name: 'RaceResult',
  props: {
    result: Object,
    race: Object
  },
  computed: {
    winner() {
      let winnerIndex = this.race.results.dividend.map(d => d['-dividendtype']).indexOf('WIN');
      let winner = this.race.results.dividend[winnerIndex];
      let competitorIndex = this.race.competitors.map(c => c.number).indexOf(parseInt(winner['-runnernumbers']));
      let competitor = this.race.competitors[competitorIndex];
       console.log('latest-result - ',winnerIndex);
      return {
        name: competitor.name,
        win: competitor.WIN,
        plc: competitor.PLC,
        type: winner['-dividendtype'],
        instance: parseInt(winner['-instance']),
        number: competitor.number,
        silk: ''
      };
    },
    places() {
      return this.race.results.dividend
        .filter(d => d['-dividendtype'] == 'PLC' && parseInt(d['-instance']) > 1)
        .sort((e1, e2) => parseInt(e1['-instance']) - parseInt(e2['-instance']))
        .map(place => {
          let competitorIndex = this.race.competitors.map(c => c.number).indexOf(parseInt(place['-runnernumbers']));
          let competitor = this.race.competitors[competitorIndex];
          return {
            name: competitor.name,
            win: competitor.WIN,
            plc: competitor.PLC,
            type: place['-dividendtype'],
            instance: parseInt(place['-instance']),
            number: competitor.number
          };
        });
    },
    quinella() {
      let quinellaIndex = this.race.results.dividend.map(d => d['-dividendtype']).indexOf('QIN');
      let quinella = this.race.results.dividend[quinellaIndex];
      return quinella['-dividendamount'];
    },
    exacta() {
      let exactaIndex = this.race.results.dividend.map(d => d['-dividendtype']).indexOf('EXA');
      let exacta = this.race.results.dividend[exactaIndex];
      return exacta['-dividendamount'];
    },
    trifecta() {
      let trifectaIndex = this.race.results.dividend.map(d => d['-dividendtype']).indexOf('TRF');
      let trifecta = this.race.results.dividend[trifectaIndex];
      return trifecta['-dividendamount'];
    },
    first4() {
      let first4Index = this.race.results.dividend.map(d => d['-dividendtype']).indexOf('FirstFour');
      if (first4Index) {
        let first4 = this.race.results.dividend[first4Index];
        return first4['-dividendamount'];
      } else return null;
    }
  }
};
</script>

<style scoped>
.HR {
  border: 5px solid orangered;
}

.DG {
  border: 5px solid forestgreen;
}

.DG > thead {
  background-color: forestgreen;
}

.HR > thead {
  background-color: orangered;
}

table > tbody > tr > td:nth-child(1) {
  width: 50px;
}

.no-gutters {
  height: 100%;
  font-size: 20px;
}

.mtp {
  text-align: center;
  vertical-align: middle;
  background: #e5dc17;
  font-weight: 600;
  font-size: 20px;
}

.number {
  color: black;
  background-color: rgb(235 170 42);
  font-weight: 900;
  font-size: 20px;
  margin: 5px;
  width: auto;
  /* height: 10px; */
  max-height: 20px;
  min-height: 20px;
  border: 1px solid black;
}

.competitor {
  width: 60%;
  text-align: left;
  font-size: 20px;
}

.win_header {
  text-align: center;
  font-size: 20px;
}

.plc_header {
  text-align: center;
  font-size: 20px;
}

.win {
  text-align: center;
  font-size: 20px;
}

.plc {
  text-align: center;
  font-size: 20px;
}

.table-dark td {
  padding: 0px;
  border: 0;
}

.table-dark tr {
  padding: 0px;
  border: 0;
}
.table-dark {
  background-color: #000;
  
}

.racename {
  text-align: left;
}

.result_label {
  color: white;
  font-size: 30px;
  text-align: left;
}

.first_number {
  color: black;
  background-color: rgb(235 170 42);
  font-weight: 900;
  font-size: 30px;
  margin: 5px;
  width: auto;
  /* height: 10px; */
  max-height: 20px;
  min-height: 20px;
  border: 1px solid black;
}

.first_competitor {
  width: 60%;
  text-align: left;
  font-size: 30px;
}

.first_win {
  text-align: center;
  font-size: 30px;
}

.first_plc {
  text-align: center;
  font-size: 30px;
}
</style>
