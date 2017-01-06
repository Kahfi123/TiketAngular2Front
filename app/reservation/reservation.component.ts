import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Day,Stasiun, Train } from '../_models/index';
import { UserService,AuthenticationService,AlertService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'reservation.component.html'
})

export class ReservationComponent implements OnInit {
    days: Day[] = [];
    stations : Stasiun[] = [];
    loading = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    ngOnInit() {
        // get days from secure api end point

      for (var i = 1; i <= 90; i++) {
          this.days.push({id: i, date: new Date(new Date().getTime()+(i*24*60*60*1000))});
      }
        this.userService.getStations()
            .subscribe(stations => {
                this.stations = stations;


            });

    }
    tampilkanKereta(date: Date,departure: string,arrive: string,slot: number){

      localStorage.setItem('jumlahPenumpang', slot);
      var d = new Date(date);
      var bulan = d.getMonth()+1;
      var hari = d.getDay()+1;
      var tahun = d.getFullYear();
      if(arrive == departure)
      {
        window.alert("Stasiun Asal dan Stasiun Tujuan tidak boleh sama");
      }
      else
      {
        this.loading = true;
        this.authenticationService.tampilkanKereta(tahun,hari,bulan,departure,arrive,slot)
            .subscribe(
                data => {
                    //this.alertService.success('Data Berh', true);
                    this.router.navigate(['daftarKereta']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
      }

    }

}
