import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, Train,CaraBayar } from '../_models/index';
import { UserService,AuthenticationService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit {
    currentUser: User;
    cara_bayar : CaraBayar[] = [];
    train: Train;
    id_layanan_kereta: number;
    nama_kereta :string;
    id_kereta:number;
    jumlah_penumpang:number;
    berangkat : date;
    stasiun_asal: string;
    stasiun_tujuan: string;
    datang : date;
    harga: number;
    total_harga: number;
    jumlahPenumpang:number;
    cara_bayar: string;
    selected_cara_bayar: CaraBayar[] = [];
    penumpang : Array<Penumpang> = new Array(JSON.parse(localStorage.getItem('jumlahPenumpang')));
    Booking : Booking[];
    constructor(private userService: UserService, private authenticationService : AuthenticationService,private router: Router) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.nama_kereta = localStorage.getItem('nama_kereta');
        this.id_layanan_kereta = localStorage.getItem('id_layanan_kereta');
        this.id_kereta = localStorage.getItem('id_kereta');
        this.berangkat = new Date(localStorage.getItem('berangkat'));
        this.stasiun_asal = localStorage.getItem('stasiun_asal');
        this.stasiun_tujuan = localStorage.getItem('stasiun_tujuan');
        this.datang = new Date(localStorage.getItem('datang'));
        this.jumlahPenumpang = JSON.parse(localStorage.getItem('jumlahPenumpang'));
        this.harga = localStorage.getItem('harga_tiket');
        this.total_harga = this.harga*this.jumlahPenumpang;
        this.Booking = JSON.parse(localStorage.getItem('kode_booking'));
        this.penumpang = JSON.parse(localStorage.getItem('penumpang'));
      


    }

    ngOnInit() {

        $('#time').text(localStorage.getItem('time'));
        var res = localStorage.getItem('time').split(":");
        res[0] = parseInt(res[0]);
        res[1] = parseInt(res[1]);
        var tenMinutes = res[0]*60+res[1]-1,
        display = document.querySelector('#time');
        this.startTimer(tenMinutes, display);
        this.userService.getCaraBayar()
            .subscribe(response => {
                this.cara_bayar = response;


            });

    }
    onSelectionChange(cara_bayar) {
        this.selected_cara_bayar = cara_bayar;

        localStorage.setItem('cara_bayar', cara_bayar.detil_cara_bayar);
    }
    startTimer(duration, display) {
        var timer = duration, minutes, seconds;
        setInterval(function () {
            minutes = parseInt(timer / 60, 10)
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = minutes + ":" + seconds;

            if (--timer < 0) {
                timer = duration;
                window.location.href='/reservation';
                window.alert("Waktu habis! anda akan dikembalikan ke halaman reservasi");

            }
        }, 1000);
    }
    gotoFinish(){
      this.authenticationService.buatDataPembayaran(this.selected_cara_bayar,this.Booking.kode_booking)
          .subscribe(
              data => {
                  this.router.navigate(['konfirmasi']);
              },
      );
    }




}
