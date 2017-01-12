import { Component, OnInit } from '@angular/core';

import { User, Pembayaran } from '../_models/index';
import { UserService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'konfirmasi.component.html',
    styleUrls: ['konfirmasi.component.css']
})

export class KonfirmasiComponent implements OnInit {
    currentUser: User;
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

    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
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


}
