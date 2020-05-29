<template>
  <section class="content">
    <div class="container">
      <div class="row">
        <div>
          <div id="app" ref="spreadsheet"></div>
          <div class="col-md-11">
            <input type="button" class="btn btn-primary" value="Tambah Data Capaian Unit" @click="() => spreadsheet.insertRow()" />
            <input type="button" class="btn btn-danger float-right" value="Delete Capaian" @click="() => spreadsheet.deleteRow()" />
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
// var host = 'http://localhost:8022/api/capaian-unit/'
var host = 'http://10.199.14.46:8022/api/capaian_unit/'
var dropdownSatuanKerja = 'http://10.199.14.46:8022/api/satuan-kerja/'
var dropdownDataDasar = 'http://10.199.14.46:8022/api/data-dasar/'
export default {
  // name: 'App',
  data() {
    return {
      capaianUnit: [],
      form: {
        satker_id: 1,
        data_id: 1,
        capaian: 0.0
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
            { type: 'dropdown', title: 'Satuan Kerja', url: dropdownSatuanKerja, width: '120px' },
            { type: 'dropdown', title: 'Data Dasar', url: dropdownDataDasar, width: '120px' },
            { type: 'text', title: 'Waktu', width: '200px', readOnly: true },
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
          satker_id: index[0],
          data_id: index[1],
          waktu: index[2],
          capaian: index[3]
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
