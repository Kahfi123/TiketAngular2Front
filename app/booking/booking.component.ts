import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Train } from '../_models/index';
import { UserService,AuthenticationService, } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'booking.component.html',
    styleUrls: ['booking.component.css']
})

export class BookingComponent implements OnInit {
  currentTrain: Train[] = [];
  id_layanan_kereta: number;
  nama_kereta :string;
  id_kereta:number;
  jumlah_penumpang:number;
  berangkat : date;
  stasiun_asal: string;
  stasiun_tujuan: string;
  datang : date;
  harga: number;
  trains: Train[] = [];
  jumlahPenumpang:number;
  loading = false;
  setuju : boolean = false;

    constructor(private userService: UserService,private authenticationService: AuthenticationService,private router: Router) {
      this.nama_kereta = localStorage.getItem('nama_kereta');
      this.id_layanan_kereta = localStorage.getItem('id_layanan_kereta');
      this.id_kereta = localStorage.getItem('id_kereta');
      this.berangkat = new Date(localStorage.getItem('berangkat'));
      this.stasiun_asal = localStorage.getItem('stasiun_asal');
      this.stasiun_tujuan = localStorage.getItem('stasiun_tujuan');
      this.datang = new Date(localStorage.getItem('datang'));
      this.jumlahPenumpang = JSON.parse(localStorage.getItem('jumlahPenumpang'));
      this.harga = localStorage.getItem('harga_tiket');
    }

    ngOnInit() {

    }

    addProp1(e) {

       if(e.target.checked){
          this.setuju = true;
       }
       else
       {
         this.setuju = false;
       }
    }
    goToRegister(): void {
      this.loading = true;
      if(this.setuju == false)
      {
        window.alert("Anda harus menyetujui persyaratan reservasi untuk melanjutkan");
      }
      else
      {
        this.authenticationService.buatKodeBooking(this.jumlahPenumpang,this.id_layanan_kereta)
            .subscribe(
                data => {

                    this.router.navigate(['register']);
                },
            );

      }


    }

}
