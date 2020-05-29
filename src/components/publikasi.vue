<template>
  <div>
    <h1>Publikasi</h1>
    <div id="here"></div>
  </div>
</template>

<script>
import axios from 'axios'
import WebDataRocks from 'webdatarocks'
import 'webdatarocks/webdatarocks.min.css'
var host = 'http://10.199.14.46:8022/'
// var host = 'http://localhost:8022/'

  export default {
    mounted: function() {
      axios.get(host + 'api/publikasi/').then(res => {
        console.log(res.data)
        this.WebDataRocks = new WebDataRocks({
          container: "#here",
          toolbar: true,
          report: { 
            dataSource: { 
              data: res.data 
            },
            options: {
              grid: {
                title: 'Publikasi',
                type: 'flat',
                showTotals: false,
                showGrandTotals: false
              }
            }
          }
        })
      })
    }
  }
</script>

<style scoped></style>