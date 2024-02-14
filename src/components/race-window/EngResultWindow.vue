<template>
  <div :class="[race.country]" class="flag_div">
    <div class="row no-gutters">
      <div class="col-md-9 track h4">{{ `${race.track} ${race.id}` }}</div>
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
             <tr class="data">
              <td style="border: 15px solid; padding: 0px" class="number">1<sup>st</sup></td>
              <td class="competitor">{{ first.name }}</td>
              <td class="win">{{first.odd}}</td>
            </tr>
              <tr class="data">
              <td style="border: 15px solid; padding: 0px" class="number">2<sup>nd</sup></td>
              <td class="competitor">{{ second.name }}</td>
              <td class="win">{{second.odd}}</td>
            </tr>
              <tr class="data">
              <td style="border: 15px solid; padding: 0px" class="number">3<sup>rd</sup></td>
              <td class="competitor">{{ third.name }}</td>
              <td class="win">{{third.odd}}</td>
             </tr>
              <tr class="data">
              <td style="border: 15px solid; padding: 0px" class="number">F/C</td>
              <td class="competitor"></td>            
             </tr>
              <tr class="data">
              <td style="border: 15px solid; padding: 0px" class="number">T/C</td>
              <td class="competitor"></td>             
            </tr>
          </tbody>
        </table>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EngRaceWindow',
  props: {
    race: Object,
    length: Number,
  },
  data: function () {
    return {
      index: 0,
    };
  },
  computed: {
    
    first() {
      let firstwinner = this.race.result[0].name;
      let firstodd = this.race.result[0].sp;
      return {name:firstwinner,odd:firstodd};
    },
    second() {
      let secondwinner = this.race.result[1].name;
      let secondodd = this.race.result[1].sp;
      return {name:secondwinner,odd:secondodd};
    },
    third() {
      let thirdwinner = this.race.result[2].name;
      let thirdodd = this.race.result[2].sp;
      return {name:thirdwinner,odd:thirdodd};
    },
  },
  methods: {
    paginate() {
      this.index = (this.index + 1) % this.pageCount;
    },
  },
  mounted() {
   console.log('eng-result-rendered',this.race.id);
  },
};
</script>

<style scoped>
.FR {
  background-image: url('../../assets/flags/FR.png');
  background-repeat: no-repeat;
  background-size: 100px auto;
}

.VR {
  background-image: url('../../assets/flags/VR.png');
  background-repeat: no-repeat;
  background-size: 100px auto;
}

.UK {
  background-image: url('../../assets/flags/UK.png');
  background-repeat: no-repeat;
  background-size: 100px auto;
}

.ZA {
  background-image: url('../../assets/flags/ZA.png');
  background-repeat: no-repeat;
  background-size: 100px auto;
}

.flag_div {
  /* margin: 15px; */
  margin-top: 0px;
  margin-left: 15px;
  margin-right: 15px;
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

.odd {
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
</style>
