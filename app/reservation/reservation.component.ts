import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Day,Station, Train } from '../_models/index';
import { UserService,AuthenticationService,AlertService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'reservation.component.html'
})

export class ReservationComponent implements OnInit {
    days: Day[] = [];
    stations : Station[] = [];
    loading = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    ngOnInit() {
        // get days from secure api end point
        this.userService.getDays()
            .subscribe(days => {
                this.days = days;

            });
        this.userService.getStations()
            .subscribe(stations => {
                this.stations = stations;

            });

    }
    tampilkanKereta(date: number,departure: number,arrive: number,slot: number){
      this.loading = true;
      localStorage.setItem('jumlahPenumpang', slot);
      this.authenticationService.tampilkanKereta(date,departure,arrive,slot)
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
