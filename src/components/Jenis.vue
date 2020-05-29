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

var host = 'http://10.199.14.46:8022/'
//var host = 'http://localhost:8022/'

export default {
  // name: 'App',
  data() {
    return {
      dataDasar: [],
      form: {
        id: '',
        nama: '',
        expired_date: '365'
      }
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      axios.get(host + 'api/jenis-satker/').then(res => {
        console.log(res.data)
        var jexcelOptions = {
          data: res.data,
          allowToolbar: true,
          onchange: this.updateRow,
          oninsertrow: this.newRow,
          ondeleterow: this.deleteRow,
          responsive: true,
          columns: [
            { type: 'hidden', title: 'ID', width: '30px' },
            { type: 'text', title: 'Nama', width: '120px' },
            { type: 'text', title: 'Create Date', width: '200px', readOnly: true },
            { type: 'text', title: 'Last Updated', width: '200px', readOnly: true },
            { type: 'text', title: 'Expired Date', width: '200px' }
          ]
        }
        let spreadsheet = jexcel(this.$el, jexcelOptions)
        Object.assign(this, { spreadsheet })
      })
    },
    newRow() {
      axios.post(host + 'api/jenis-satker/', this.form).then(res => {
        console.log(res.data)
      })
    },
    updateRow(instance, cell, columns, row, value) {
      axios.get(host + 'api/jenis-satker/').then(res => {
        var index = Object.values(res.data[row])
        index[columns] = value
        console.log(index)
        axios.put(host + 'api/jenis-satker/' + index[0], {
          id: index[0],
          nama: index[1],
          expired_date: index[4]
        }).then(res => {
          console.log(res.data)
        })
      })
    },
    deleteRow(instance, row) {
      axios.get(host + 'api/jenis-satker/').then(res => {
        var index = Object.values(res.data[row])
        // console.log(index)
        console.log(row)
        axios.delete(host + 'api/jenis-satker/' + index[0])
      })
    }
  }
}
</script>
