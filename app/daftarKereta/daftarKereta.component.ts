import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Train } from '../_models/index';
import { UserService,AuthenticationService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'daftarKereta.component.html',
    styleUrls: ['daftarKereta.component.css']
})

export class DaftarKeretaComponent implements OnInit {
    currentTrains: Train;
    trains: Train[] = [];
    jumlahPenumpang:number;


    constructor(private userService: UserService,private router: Router) {
        this.trains = (JSON.parse(localStorage.getItem('currentTrains'))).filteredTrains;
        this.jumlahPenumpang = JSON.parse(localStorage.getItem('jumlahPenumpang'));
    }

    ngOnInit() {

    }
    gotoBooking(train: Train): void {
      localStorage.setItem('currentTrain', JSON.stringify(train));
      this.router.navigate(['booking']);

    }


}
