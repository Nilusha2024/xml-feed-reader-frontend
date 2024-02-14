<template>
  <div :class="[race.country]" class="flag_div">
    <div class="row no-gutters">
      <div class="col-md-9 track h4">{{ `${race.racedescription}` }} </div>
      <div class="col-md-3 mtp pt-1 text-dark" v-if="race.mtp <= 0">
        OFF 
      </div>
      <div class="col-md-3 mtp pt-1 text-dark" v-else>
        {{ `MTP ${race.mtp}` }}
      </div>
    </div>
    <div class="row">
      <div class="table-responsive col-md-12">
        <table :class="[race.type, { off: race.mtp <= 0 }]" class="table table-dark">
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
          <tbody :class="[race.type]" >
            <tr>
              <td colspan="3"></td>
              <td class="win_header">WIN</td>
              <td class="plc_header">PLC</td>
            </tr>
            <tr v-for="competitor in competitors" :key="competitor.number" :class="{ transparent: competitor.dummy }" class="data">
              <td :class="{ number: !competitor.dummy }" style="border: 5px solid;padding: 0px;">
                {{ competitor.number }}
              </td>
              <td class="p-0 img-cell">
                <img v-if="competitor.silk" :src="`http://172.16.10.49/AUSSilks/${competitor.silk}.jpg`" :alt="competitor.silk" />
              </td>
              <td class="competitor">{{ competitor.name }}</td>
              <td class="win">{{ parseFloat(competitor.WIN).toFixed(2) }}</td>
              <td class="plc">{{ parseFloat(competitor.PLC).toFixed(2) }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="5" class="container pt-1 pb-0">
                <div class="row justify-content-between">
                  <span class="col non-runners" :class="{ transparent: race.notRunners.length === 0 }">{{ `Non Runners: ${race.notRunners.join(', ')}` }}</span>
                  <span class="col weather">{{ `Going: ${race.weather}` }}</span>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AusRaceWindow',
  props: {
    race: Object,
    length: Number
  },
  data: function() {
    return {
      index: 0
    };
  },
  computed: {
    pageCount() {
      const data = this.race.competitors.filter(r => parseFloat(r.WIN) > 0 && parseFloat(r.PLC) > 0);
      return Math.ceil(data.length / this.length);
    },
    competitors() {
      const data = this.race.competitors
        .filter(r => parseFloat(r.WIN) > 0 || parseFloat(r.PLC) > 0)
        .slice(this.index * this.length, (this.index + 1) * this.length)
        .map(c => {
          c['dummy'] = false;
          return c;
        });

      if (data.length !== this.length) {
        for (let i = data.length; i < this.length; i++) {
          data.push({
            number: i * -1,
            silk: '',
            WIN: '',
            PLC: '',
            dummy: true
          });
        }
      }
      return data;
    },
    mtp() {
      let mtp = parseInt(this.race.mtp);
      if (mtp == -1) {
        return 'OFF';
      } else {
        return `MTP ${mtp}`;
      }
    }
  },
  methods: {
    paginate() {
      this.index = (this.index + 1) % this.pageCount;
    }
  },
  mounted() {
    setInterval(() => this.paginate(), 5000);
    console.log('aus-race-rendered',this.race.id);
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

.plc_header{
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
  font-size: 1.5em;
  color: #e5dc17;
}

.weather,
.runners {
  text-align: right;
  font-size: 1.5em;
  color: #e5dc17;
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

.table-dark.table-striped tbody tr:nth-of-type(2n+1) {
    background-color: rgba(17, 17, 17, 0.05);
}
</style>