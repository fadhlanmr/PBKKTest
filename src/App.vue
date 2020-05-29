<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="FP PBKK"/> --> 
    <h1>
      <router-link to="/login"> Login </router-link>
    </h1>
    <br>
    <h3>
      <router-link to='/periode'> Indikator Periode //</router-link>
      <router-link to='/master'> Master Indikator //</router-link>
      <router-link to='/jenis'> Jenis Satuan Kerja //</router-link>
      <router-link to='/satker'> Satuan Kerja //</router-link>
      <router-link to='/data'> Data Dasar //</router-link>
      <router-link to='/capaian'> Capaian Unit //</router-link>
      <router-link to='/dosen'> Dosen //</router-link>
      <router-link to='/penelitian'> Penelitian //</router-link>
      <router-link to='/publikasi'> Publikasi //</router-link>
      <router-link to='/konker'> Kontrak Kerja //</router-link>
    </h3>
    <hr>
    <router-view> </router-view>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  
  components: {
    
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
