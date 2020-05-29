<template>
  <div style="padding-left: 20px; padding-right: 20px">
    <br>
    <label >Pilih Satuan Kerja </label>
    <select class="form-control" @change="load()">
      <option v-for="fk in filterSatker" :key="fk.id" type="string">{{ fk.name }}</option>
    </select>
    <div class="span4">
      <img src="https://upload.wikimedia.org/wikipedia/id/c/c4/Badge_ITS.png" class="img-fluid" style="max-width: 75px; float: left">
      <h1 style="padding-left: 90px">
        Indikator Kontrak Kinerja 2020
        <br>
        <small>
          Kepala Departemen
        </small>
      </h1>
    </div>
    <br>
    <table class="table table-striped">
      <thead class="thead-dark">
        <tr role="row">
          <th>No</th>
          <th>Aspek</th>
          <th>Komponen</th>
          <th>Indikator</th>
          <th>Bobot</th>
          <th>Target</th>
          <th>Capaian</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="insatker in indikatorData" :key="(insatker.num, insatker.Aspek, insatker.Komponen, insatker.Indikator, insatker.Bobot, insatker.Target, insatker.Capaian, insatker.Persen)" role="row">
          <td>{{ insatker.num }}</td>
          <td>{{ insatker.Aspek }}</td>
          <td>{{ insatker.Komponen }}</td>
          <td>{{ insatker.Indikator }}</td>
          <td>{{ insatker.Bobot }}</td>
          <td>{{ insatker.Target }}</td>
          <td>{{ insatker.Capaian }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import 'webdatarocks/webdatarocks.min.css'
import axios from 'axios'

var host = 'http://10.199.14.46:8022/'
// var host = 'http://localhost:8022/'

export default {
  name: 'App',
  data() {
    return {
      indikatorData: [],
      filterSatker: [{'id': 'AEA8C02A-6902-461F-9E5E-121964B46494', 'name': 'Departemen Aktuaria'}, {'id': '067F74F3-1D3D-4AE5-99A5-BE7DC5794346', 'name': 'Departemen Arsitektur'}, {'id': '99F05421-F893-4226-A415-3A8E17EADE38', 'name': 'Departemen Biologi'}, {'id': '747B77BD-9098-447A-9AF6-E2994BE53645', 'name': 'Departemen Desain Interior'}, {'id': '9955FC2D-3203-4B08-AEFC-31DC69B01F19', 'name': 'Departemen Desain Komunikasi Visual'}, {'id': '1F95AF34-4842-4591-B5C3-DCDC3D79B0BF', 'name': 'Departemen Desain Produk'}, {'id': '30059081-ACD9-475D-92BA-F5CB3DF14C83', 'name': 'Fakultas Desain Kreatif dan Bisnis Digital'}, {'id': 'FAC23AC4-8A7E-482D-98CB-8F8177E86832', 'name': 'Fakultas Sains dan Analitika Data'}, {'id': '4AE0BA8F-4CE5-4427-AC1D-326CB977A908', 'name': 'Fakultas Teknik Sipil, Perencanaan, dan Kebumian'}, {'id': '8ECEFD71-51CD-4FE8-BF20-CBAF6925C08F', 'name': 'Fakultas Teknologi Elektro dan Informatika Cerdas'}, {'id': '21ADBDA5-DDEA-4FE0-B6CA-0BA72C91A064', 'name': 'Fakultas Teknologi Industri dan Rekayasa Sistem'}, {'id': 'FF742A2B-5B08-4454-B4AD-B05F4213ADC8', 'name': 'Fakultas Teknologi Kelautan'}, {'id': '77B47F90-EA1A-474C-9B66-F9A3E7904894', 'name': 'Fakultas Vokasi'}, {'id': '399F1740-C3B3-4B17-9CC8-A6530656F41B', 'name': 'Departemen Fisika'}, {'id': 'E473B3F3-A86B-45C3-8041-1ED11A37D63F', 'name': 'Departemen Kimia'}, {'id': '56F09E6A-9351-4BEE-9A5A-47189DA05DB7', 'name': 'Departemen Manajemen Bisnis'}, {'id': 'DE7AB2C6-D399-42A8-8F4A-FFB381D15E1B', 'name': 'Departemen Manajemen Teknologi'}, {'id': '21F5FACF-2500-42D0-A67A-B1F631AC92C2', 'name': 'Departemen Matematika'}, {'id': '0D0AE0A1-574F-4EFF-93C4-346FEEB1B56F', 'name': 'Departemen Perencanaan Wilayah dan Kota'}, {'id': '98836514-9A35-4007-8433-D2C0899E967F', 'name': 'Departemen Sistem Informasi'}, {'id': 'FAB0153C-8B30-4659-B50F-9081DCFB0BC6', 'name': 'Departemen Statistika Bisnis'}, {'id': 'AE9D1371-CF41-40A7-93E3-7D7D495F6F7C', 'name': 'Departemen Statistika'}, {'id': 'A68DF11A-08D4-42E7-B878-5730B1B5B4E9', 'name': 'Departemen Studi Pembangunan'}, {'id': 'D12AE12C-BB63-40CF-A7DF-8E831F30A621', 'name': 'Departemen Teknik Biomedik'}, {'id': '583057BB-7885-469E-A908-8734472EC3C5', 'name': 'Departemen Teknik Elektro Otomasi'}, {'id': 'BFC13DC1-950A-452B-AF8A-2E8DD3548CE0', 'name': 'Departemen Teknik Elektro'}, {'id': '61704DE5-2E33-41DD-BC93-27622D9F5DD6', 'name': 'Departemen Teknik Fisika'}, {'id': '71E9F019-B4FD-446C-B0C9-4CE4F8532BAF', 'name': 'Departemen Teknik Geofisika'}, {'id': '6B36C546-C953-44FC-B148-04AD0F103A72', 'name': 'Departemen Teknik Geomatika'}, {'id': '1D0C94CD-68B8-4DB4-9AAE-2D01F0C70066', 'name': 'Departemen Teknik Informatika'}, {'id': '5D802CC3-C03E-43C9-A831-F241E560B78A', 'name': 'Departemen Teknik Infrastruktur Sipil'}, {'id': 'A0364179-6B3F-415E-9050-75EBE66F14EC', 'name': 'Departemen Teknik Instrumentasi'}, {'id': '5922B132-4BC2-4C8A-836E-55F53842C26B', 'name': 'Departemen Teknik Kelautan'}, {'id': 'ECF8FCA1-1B39-46A8-A57B-4941458C6E82', 'name': 'Departemen Teknik Kimia Industri'}, {'id': '2590B1DF-D6EC-4968-BF05-37F8F69377C8', 'name': 'Departemen Teknik Kimia'}, {'id': 'F1928183-3E3E-40BF-B6A3-71C4299F06E1', 'name': 'Departemen Teknik Komputer'}, {'id': '48914A29-488B-47CE-944B-9F5792ADBF61', 'name': 'Departemen Teknik Lingkungan'}, {'id': 'D04E9EC3-620D-401E-977E-5E9213DC48BC', 'name': 'Departemen Teknik Material dan Metalurgi'}, {'id': '25AC5DE6-1EB9-4D7D-9DAD-13F5018A0010', 'name': 'Departemen Teknik Mesin Industri'}, {'id': '9961DA5F-8287-423F-BC78-64084CAE09F8', 'name': 'Departemen Teknik Mesin'}, {'id': 'C0150805-8A5E-4645-986C-8B6B0266509B', 'name': 'Departemen Teknik Perkapalan'}, {'id': '9E2ACF0E-D1A2-432A-861F-D170A1BB3A14', 'name': 'Departemen Teknik Sipil'}, {'id': '1FC2B474-14B2-4344-86F4-75DCB387F600', 'name': 'Departemen Teknik Sistem dan Industri'}, {'id': '88211E05-DE13-4131-8082-7594ADA2C244', 'name': 'Departemen Teknik Sistem Perkapalan'}, {'id': 'D2C96085-B033-48E6-B9F8-4F283DE8696E', 'name': 'Departemen Teknik Transportasi Laut'}, {'id': '3E9E8626-0C05-4336-8FB7-357626327A4A', 'name': 'Departemen Teknologi Informasi'}]
      //fk_satker: []
    }
  },
  mounted() {
    //this.getSatker()
    this.load()
  },
  methods: {
    load() {
      axios.get(host + 'api/indikator-satuan-kerja/' + 'AEA8C02A-6902-461F-9E5E-121964B46494').then(res => {
        console.log(res.data.length)
        this.indikatorData = Object.values(res.data)
        this.indikatorData.Persen = ((this.indikatorData.Capaian)*100) / ((this.indikatorData.Target)*100)
      })
    }
    // getSatker() {
    //   axios.get(host + 'api/satuan-kerja/dropdown').then(res => {
    //     this.fk_satker = res.data
    //   })
    // }
  }
}
</script>

