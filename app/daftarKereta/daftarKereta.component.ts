import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RangkaianPerjalanan,Train,LayananKereta } from '../_models/index';
import { UserService,AuthenticationService } from '../_services/index';
import { LOCALE_ID } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: 'daftarKereta.component.html',
    styleUrls: ['daftarKereta.component.css']
})

export class DaftarKeretaComponent implements OnInit {
    jumlahPenumpang : number;
    layananKereta : LayananKereta [];


    constructor(private userService: UserService,private authService: AuthenticationService, private router: Router) {
        this.jumlahPenumpang = JSON.parse(localStorage.getItem('jumlahPenumpang'));
        this.layananKereta = authService._layananKereta;
    }

    ngOnInit() {

    }
    gotoBooking(train: Train): void {

      localStorage.setItem('nama_kereta', train.nama_kereta);
      localStorage.setItem('id_kereta',train.id_kereta);
      localStorage.setItem('stasiun_asal', train.stasiun_asal);
      localStorage.setItem('stasiun_tujuan',train.stasiun_tujuan);
      localStorage.setItem('berangkat', train.berangkat);
      localStorage.setItem('datang',train.datang);
      localStorage.setItem('harga_tiket',train.harga);
      localStorage.setItem('id_layanan_kereta',train.id_layanan_kereta);

      this.router.navigate(['booking']);

    }


}
