import Vue from 'vue'
import VueRouter from 'vue-router'

import abmas from './components/abmas'
import dosen from './components/dosen'
import publikasi from './components/publikasi'
import penelitian from './components/penelitian'
import konker from './components/konker'
import periode from './components/IndikatorPeriode'
import master from './components/MasterIndikator'
import jenis from './components/Jenis'
import satker from './components/SatuanKerja'
import data from './components/Data'
import capaian from './components/Capaian'
import login from './components/Login'

Vue.use(VueRouter)

export const router = new VueRouter({
    routes: [
        { path: '/abmas', component: abmas },
        { path: '/dosen', component: dosen },
        { path: '/publikasi', component: publikasi },
        { path: '/penelitian', component: penelitian },
        { path: '/konker', component: konker },
        { path: '/periode', component: periode },
        { path: '/master', component: master },
        { path: '/jenis', component: jenis },
        { path: '/satker', component: satker },
        { path: '/data', component: data },
        { path: '/capaian', component: capaian },
        { path: '/login', component: login }
    ]
})
