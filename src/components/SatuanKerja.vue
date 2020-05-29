<!--<template>
//   <div>
//     <div id="app" ref="spreadsheet"></div>
//     <div>
//         <input type="button" value="Add New Row" @click="() => spreadsheet.insertRow()" />
//         <input type="button" value="Delete Selected Row" @click="() => spreadsheet.deleteRow()" />
//     </div>
//   </div>
// </template> -->
<template>
  <section class="content">
    <div class="container">
      <div class="row">
        <div>
          <div id="app" ref="spreadsheet"></div>
          <div class="col-md-11">
            <input type="button" class="btn btn-primary" value="Tambah Data Satker" @click="() => spreadsheet.insertRow()" />
            <input type="button" class="btn btn-danger float-right" value="Delete Satker" @click="() => spreadsheet.deleteRow()" />
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
// var host = 'http://localhost:8022/'

export default {
  // name: 'App',
  data() {
    return {
      satuanKerja: [],
      form: {
        id: '',
        id_jns_satker: '',
        id_induk_satker: null,
        nama: '',
        email: '',
        expired_date: '2021-04-18T19:12:14.463Z'
      }
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      axios.get(host + 'api/satuan-kerja/').then(res => {
        console.log(res.data)
        var jexcelOptions = {
          data: res.data,
          allowToolbar: true,
          onchange: this.updateRow,
          oninsertrow: this.newRow,
          ondeleterow: this.deleteRow,
          responsive: true,
          columns: [
            { type: 'hidden', title: 'ID', width: '300px' },
            { type: 'dropdown', title: 'Jenis', url: host + 'api/jenis-satker/nama', width: '200px' },
            { type: 'dropdown', title: 'Induk', url: host + 'api/satuan-kerja/induk', width: '200px' },
            { type: 'text', title: 'Nama', width: '120px' },
            { type: 'text', title: 'email', width: '120px' },
            { type: 'text', title: 'Create Date', width: '120px', readOnly: true },
            { type: 'text', title: 'Last Updated', width: '120px', readOnly: true },
            { type: 'text', title: 'Expired Date', width: '120px' }
          ]
        }
        let spreadsheet = jexcel(this.$el, jexcelOptions)
        Object.assign(this, { spreadsheet })
      })
    },
    newRow() {
      axios.post(host + 'api/satuan-kerja/', this.form).then(res => {
        console.log(res.data)
      })
    },
    updateRow(instance, cell, columns, row, value) {
      axios.get(host + 'api/satuan-kerja/').then(res => {
        var index = Object.values(res.data[row])
        index[columns] = value
        console.log(index)
        axios.put(host + 'api/satuan-kerja/' + index[0], {
          id: index[0],
          id_jns_satker: index[1],
          id_induk_satker: index[2],
          nama: index[3],
          email: index[4],
          expired_date: index[7]
        }).then(res => {
          console.log(res.data)
        })
      })
    },
    deleteRow(instance, row) {
      axios.get(host + 'api/satuan-kerja/').then(res => {
        var index = Object.values(res.data[row])
        // console.log(index)
        console.log(row)
        axios.delete(host + 'api/satuan-kerja/' + index[0])
      })
    }
  }
}
</script>
