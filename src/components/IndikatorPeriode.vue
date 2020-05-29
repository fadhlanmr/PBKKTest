<template>
  <section class="content">
    <div class="container">
      <div class="row">
        <div>
          <div id="app" ref="spreadsheet"></div>
          <div class="col-md-11">
            <input type="button" class="btn btn-primary" value="Tambah Indikator Periode Unit" @click="() => spreadsheet.insertRow()" />
            <input type="button" class="btn btn-danger float-right" value="Delete Indikator Periode" @click="() => spreadsheet.deleteRow()" />
          </div>
          <hr>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import jexcel from 'jexcel'
import 'jexcel/dist/jexcel.css'
import axios from 'axios'
//var host = 'http://localhost:8022/api/capaian-unit/'
var host = 'http://10.199.14.46:8022/api/capaian_unit/'
var dropdownMaster = 'http://10.199.14.46:8022/api/master-indikator/'
var dropdownPeriode = 'http://10.199.14.46:8022/api/periode/'
export default {
  // name: 'App',
  data() {
    return {
      capaianUnit: [],
      form: {
        master_id: '',
        periode_id: '',
        bobot: 0.0
      }
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      axios.get(host).then(res => {
        console.log(res.data)
        var jexcelOptions = {
          data: res.data,
          allowToolbar: true,
          onchange: this.updateRow,
          oninsertrow: this.newRow,
          ondeleterow: this.deleteRow,
          responsive: true,
          columns: [
            { type: 'dropdown', title: 'Master Indikator', url: dropdownMaster, width: '120px' },
            { type: 'dropdown', title: 'Periode', url: dropdownPeriode, width: '120px' },
            { type: 'text', title: 'Capaian', width: '120px' }
          ]
        }
        let spreadsheet = jexcel(this.$el, jexcelOptions)
        Object.assign(this, { spreadsheet })
      })
    },
    newRow() {
      axios.post(host, this.form).then(res => {
        console.log(res.data)
      })
    },
    updateRow(instance, cell, columns, row, value) {
      axios.get(host).then(res => {
        var index = Object.values(res.data[row])
        var old = Object.values(res.data[row])
        index[columns] = value
        console.log(old[0] + ' ' + old[1])
        console.log(index[0] + ' ' + index[1])
        axios.put(host + old[0] + '&' + old[1], {
          master_id: index[0],
          periode_id: index[1],
          capaian: index[2]
        }).then(res => {
          console.log(res.data)
        })
      })
    },
    deleteRow(instance, row) {
      axios.get(host).then(res => {
        var index = Object.values(res.data[row])
        // console.log(index)
        console.log(row)
        axios.delete(host + index[0] + '&' + index[1])
      })
    },
    oldRow(instance, cell, columns, row, value) {
      console.log('old ' + value)
    }
  }
}
</script>
