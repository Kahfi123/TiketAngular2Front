import { Component,onInit } from '@angular/core';
import { Router } from '@angular/router';
import { Penumpang,Booking,Pemesan } from '../_models/index';
import { AlertService, UserService,AuthenticationService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css']
})

export class RegisterComponent implements OnInit {
    model: any = {};
    pemesan: Pemesan[] = [];
    loading = false;
    returnUrl:string;
    jumlahPenumpang:number;
    //penumpang : Penumpang[] = [];
    Booking : Booking[];
    nama_penumpang: any[] = [];
    nomor_identitas: any[] = [];
    jumlahInputPenumpang = new Array(JSON.parse(localStorage.getItem('jumlahPenumpang')));
    penumpang : Array<Penumpang> = new Array(JSON.parse(localStorage.getItem('jumlahPenumpang')));
    pen : Penumpang[] = [];
    constructor(
        private router: Router,
        private userService: UserService,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) {
        this.jumlahPenumpang = JSON.parse(localStorage.getItem('jumlahPenumpang'));
        this.Booking = JSON.parse(localStorage.getItem('kode_booking'));



        }
        ngOnInit() {
                  var tenMinutes = 60 * 10,
              display = document.querySelector('#time');
          this.startTimer(tenMinutes, display);
        }
    createRange(number){
      this.items = [];
      for(var i = 1; i <= number; i++){
         this.items.push(i);
      }
      return this.items;
    }

    register() {
      //console.log(this.model);
      localStorage.setItem('time',$('#time').text());

        this.loading = true;

        for(var i = 0;i < this.nama_penumpang.length;i++)
        {
           this.pen = [];
           this.pen.nama_penumpang = this.nama_penumpang[i];
           this.pen.nomor_identitas = this.nomor_identitas[i];
           this.pen.kode_booking = this.Booking.kode_booking;
           this.authenticationService.buatDataPenumpang(this.pen)
               .subscribe(
                   data => {

                   },
           );
           //this.penumpang.push(this.pen);
        }
        this.pemesan.kode_booking = this.Booking.kode_booking;
        /*for(var i = 0 ; i < this.penumpang.length; i++)
        {

        }*/
        this.authenticationService.buatDataPemesan(this.pemesan)
            .subscribe(
                data => {


                       this.router.navigate(['home']);


                },
        );



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
}
