<template>
  <div :class="[race.country]" class="flag_div">
    <div class="row no-gutters">
      <div class="col-md-9 track h4">{{ `${race.racedescription}` }}</div>
      <div class="col-md-3 mtp pt-1 text-dark">RESULT</div>
    </div>
    <div class="row">
      <div class="table-responsive col-md-12">
        <table :class="[race.type]" class="table table-dark">
          <thead>
            <tr>
              <td colspan="5" class="container pt-0 pb-1">
                <div class="row justify-content-between">
                  <span class="col-md-9 description">{{ race.description }}</span>
                  <span class="col-md-3 runners">{{ `Run ${race.currentRunners}` }}</span>
                </div>
              </td>
            </tr>
          </thead>
          <tbody :class="[race.type]">
            <tr>
              <td colspan="2"></td>
              <td class="win_header">WIN</td>
              <td class="plc_header">PLC</td>
            </tr>
            <tr class="data">
              <td style="border: 15px solid; padding: 0px" class="number">1<sup>st</sup></td>
              <td class="competitor">{{ winner.name }}</td>
              <td class="win">{{ winner.win }}</td>
              <td class="plc">{{ winner.plc }}</td>
            </tr>
            <tr v-for="place in places" :key="place.number" class="data">
              <td style="border: 15px solid; padding: 0px" class="number" v-if="place.instance == 2">2<sup>nd</sup></td>
              <td style="border: 15px solid; padding: 0px" class="number" v-if="place.instance == 3">3<sup>rd</sup></td>
              <td style="border: 15px solid; padding: 0px" class="number" v-if="place.instance == 4">4<sup>th</sup></td>
              <td class="competitor">{{ place.name }}</td>
              <td></td>
              <td class="plc" v-if="place.instance == 2">{{ place.plc }}</td>
            </tr>
          </tbody>
        </table>
        <table :class="[race.type]" class="table table-dark-result" width="50%">
          <tbody :class="[race.type]">
            <tr class="data">
              <td class="competitor" colspan="1">Quinella</td>
              <td class="win">{{ quinella }}</td>
              <td colspan="1"></td>
            </tr>
            <tr class="data">
              <td class="competitor" colspan="1">Exacta</td>
              <td class="win">{{ exacta }}</td>
              <td colspan="1"></td>
            </tr>
            <tr class="data">
              <td class="competitor" colspan="1">Trifecta</td>
              <td class="win">{{ trifecta }}</td>
              <td colspan="1"></td>
            </tr>
            <tr class="data" v-if="first4">
              <td class="competitor" colspan="1">Forth 4</td>
              <td class="win">{{ first4 }}</td>
              <td colspan="1"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AusResultWindow',
  props: {
    race: Object,
    length: Number,
  },
  computed: {
    winner() {
      let winnerIndex = this.race.results.dividend.map((d) => d['-dividendtype']).indexOf('WIN');
      let winner = this.race.results.dividend[winnerIndex];
      let competitorIndex = this.race.competitors.map((c) => c.number).indexOf(parseInt(winner['-runnernumbers']));
      let competitor = this.race.competitors[competitorIndex];
      return {
        name: competitor.name,
        win: competitor.WIN,
        plc: competitor.PLC,
        type: winner['-dividendtype'],
        instance: parseInt(winner['-instance']),
        number: competitor.number,
        silk: '',
      };
    },
    places() {
      return this.race.results.dividend
        .filter((d) => d['-dividendtype'] == 'PLC' && parseInt(d['-instance']) > 1)
        .sort((e1, e2) => parseInt(e1['-instance']) - parseInt(e2['-instance']))
        .map((place) => {
          let competitorIndex = this.race.competitors.map((c) => c.number).indexOf(parseInt(place['-runnernumbers']));
          let competitor = this.race.competitors[competitorIndex];
          return {
            name: competitor.name,
            win: competitor.WIN,
            plc: competitor.PLC,
            type: place['-dividendtype'],
            instance: parseInt(place['-instance']),
            number: competitor.number,
          };
        });
    },
    quinella() {
      let quinellaIndex = this.race.results.dividend.map((d) => d['-dividendtype']).indexOf('QIN');
      let quinella = this.race.results.dividend[quinellaIndex];
      return quinella['-dividendamount'];
    },
    exacta() {
      let exactaIndex = this.race.results.dividend.map((d) => d['-dividendtype']).indexOf('EXA');
      let exacta = this.race.results.dividend[exactaIndex];
      return exacta['-dividendamount'];
    },
    trifecta() {
      let trifectaIndex = this.race.results.dividend.map((d) => d['-dividendtype']).indexOf('TRF');
      let trifecta = this.race.results.dividend[trifectaIndex];
      return trifecta['-dividendamount'];
    },
    first4() {
      let first4Index = this.race.results.dividend.map((d) => d['-dividendtype']).indexOf('FirstFour');
      if (first4Index) {
        let first4 = this.race.results.dividend[first4Index];
        return first4['-dividendamount'];
      } else return null;
    },
  },
  mounted(){
    console.log('aus-result-rendered',this.race.id);
  }
};
</script>

<style scoped>
.AU,
.NZ {
  background-image: url('../../assets/flags/AU.png');
  background-repeat: no-repeat;
  background-size: 100px auto;
}

.flag_div {
  margin-top: 0px;
  margin-left: 15px;
  margin-right: 15px;
  /* margin: 15px; */
}

.flag {
  width: 100px;
  height: 100px;
}

.mtp {
  text-align: center;
  vertical-align: middle;
  background: #e5dc17;
  font-weight: 600;
  font-size: 35px;
}

.number {
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

.competitor {
  width: 60%;
  text-align: left;
  font-size: 40px;
}

.win_header {
  text-align: center;
  font-size: 36px;
}

.plc_header {
  text-align: center;
  font-size: 36px;
}

.win {
  text-align: center;
  font-size: 36px;
}

.plc {
  text-align: center;
  font-size: 36px;
}

.DG,
.HR {
  font-weight: 600;
}

.DG {
  border: 5px solid #1f461f;
}

.HR {
  border: 5px solid #c82208;
}

.DG thead,
.DG tfoot {
  background-color: #1f461f;
  line-height: 2;
}

.HR thead,
.HR tfoot {
  background-color: #c82208;
  line-height: 2;
}

.non-runners,
.description {
  text-align: left;
  font-size: 2em;
  color: #e5dc17;
  font-weight: 500;
}

.weather,
.runners {
  text-align: right;
  font-size: 2em;
  color: #e5dc17;
  font-weight: 500;
}

.track {
  color: white;
  text-align: center;
  vertical-align: middle;
  font-weight: 600;
  font-size: 35px;
}

.transparent {
  color: transparent;
}

.img-cell {
  vertical-align: middle;
}

.img-cell > img {
  max-height: 60px;
  width: auto;
  margin: 10px;
}

.no-gutters {
  height: 100%;
  font-size: 50px;
}

tbody > tr > td {
  font-size: 25px;
  vertical-align: middle;
}

.container-fluid,
.container-lg,
.container-md,
.container-sm,
.container-xl {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding: 40px;
}

.off {
  width: 100%;
  min-width: 600px;
  min-height: 600px;
  text-align: center;
  background-image: url('../../assets/off.png');
  background-repeat: no-repeat;
  background-position: center center;
  border: 1px solid black;
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

.DG tbody {
  line-height: 2.2;
}

sup {
  vertical-align: super;
  font-size: smaller;
}

.table-dark-result td {
  padding: 0px;
  border: 0;
}

.table-dark-result tr {
  padding: 0px;
  border: 0;
}
.table-dark-result {
  background-color: #000;
  width: 50%;
  color: white;
}
.DG table-responsive {
  background-color: green;
}
.HR table-responsive {
  background-color: orangered;
}
</style>