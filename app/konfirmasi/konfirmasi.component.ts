import { Component, OnInit, OnDestroy } from '@angular/core';

import { Pembayaran } from '../_models/index';
import { UserService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'konfirmasi.component.html',
    styleUrls: ['konfirmasi.component.css']
})

export class KonfirmasiComponent implements OnInit,OnDestroy {
    users: User[] = [];
    cara_bayar: string;
    pembayaran: Pembayaran[] = [];
    batas_waktu_pembayaran : date;
    nama_kereta :string;
    id_kereta:number;
    jumlah_penumpang:number;
    berangkat : date;
    stasiun_asal: string;
    stasiun_tujuan: string;
    datang : date;
    harga: number;
    total_harga :number;
    penumpang : Array<Penumpang> = new Array(JSON.parse(localStorage.getItem('jumlahPenumpang')));
    trains: Train[] = [];
    setuju : boolean = false;

    constructor(private userService: UserService) {

        this.cara_bayar = localStorage.getItem('cara_bayar');
        this.pembayaran  = JSON.parse(localStorage.getItem('pembayaran'));
        var d = new Date(this.pembayaran.waktu_penagihan);
        d.setHours(d.getHours() + 2);
        this.batas_waktu_pembayaran = d;
        this.nama_kereta = localStorage.getItem('nama_kereta');
        this.id_layanan_kereta = localStorage.getItem('id_layanan_kereta');
        this.id_kereta = localStorage.getItem('id_kereta');
        this.berangkat = new Date(localStorage.getItem('berangkat'));
        this.stasiun_asal = localStorage.getItem('stasiun_asal');
        this.stasiun_tujuan = localStorage.getItem('stasiun_tujuan');
        this.datang = new Date(localStorage.getItem('datang'));
        this.jumlah_penumpang = JSON.parse(localStorage.getItem('jumlahPenumpang'));
        this.harga = localStorage.getItem('harga_tiket');
        this.total_harga = this.harga*this.jumlah_penumpang;
        this.penumpang = JSON.parse(localStorage.getItem('penumpang'));


    }

    ngOnInit() {

    }


    ngOnDestroy(): void {
            localStorage.removeItem('cara_bayar');
            localStorage.removeItem('penumpang');
            localStorage.removeItem('booking');
            localStorage.removeItem('nama_kereta');
            localStorage.removeItem('id_layanan_kereta');
            localStorage.removeItem('id_kereta');
            localStorage.removeItem('berangkat');
            localStorage.removeItem('stasiun_asal');
            localStorage.removeItem('stasiun_tujuan');
            localStorage.removeItem('datang');
            localStorage.removeItem('berangkat');
            localStorage.removeItem('jumlahPenumpang');
            localStorage.removeItem('harga_tiket');
            localStorage.removeItem('currentTrains');
            localStorage.removeItem('train');

    }


}
