import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RangkaianPerjalanan,Train } from '../_models/index';
import { UserService,AuthenticationService } from '../_services/index';
import { LOCALE_ID } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: 'daftarKereta.component.html',
    styleUrls: ['daftarKereta.component.css']
})

export class DaftarKeretaComponent implements OnInit {

    rangkaianPerjalanan : RangkaianPerjalanan[] = [];
    trains : Train[] = [];
    train : Train[] = [];
    jumlahPenumpang:number;
    i:number ;


    constructor(private userService: UserService,private router: Router) {
        this.rangkaianPerjalanan = (JSON.parse(localStorage.getItem('currentTrains')));
        this.i = 0;

        for (var rangkaian of this.rangkaianPerjalanan) {

            if(this.i%2 == 0)
            {

              this.train.berangkat = rangkaian.waktu;
              this.train.stasiun_asal = rangkaian.id_stasiun.nama_stasiun;

            }
            else
            {
              this.train.datang = rangkaian.waktu;
              this.train.stasiun_tujuan = rangkaian.id_stasiun.nama_stasiun;
              this.train.id_layanan_kereta = rangkaian.id_layanan_kereta.id_layanan_kereta;
              this.train.id_kereta = rangkaian.id_layanan_kereta.id_kereta.id_kereta;
              this.train.nama_kereta = rangkaian.id_layanan_kereta.id_kereta.nama_kereta;
              this.train.kapasitas = rangkaian.id_layanan_kereta.kapasitas;
              this.train.harga = rangkaian.id_layanan_kereta.harga_tiket;

              this.trains.push(this.train);
              this.train = [];

            }


            this.i++;
        }


        this.jumlahPenumpang = JSON.parse(localStorage.getItem('jumlahPenumpang'));
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
