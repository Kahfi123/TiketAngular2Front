import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Train } from '../_models/index';
import { UserService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'booking.component.html',
    styleUrls: ['booking.component.css']
})

export class BookingComponent implements OnInit {
  currentTrain: Train;
  trains: Train[] = [];
  jumlahPenumpang:number;

    constructor(private userService: UserService,private router: Router) {
      this.currentTrain = JSON.parse(localStorage.getItem('currentTrain'));
      this.jumlahPenumpang = JSON.parse(localStorage.getItem('jumlahPenumpang'));
    }

    ngOnInit() {

    }
    goToRegister(): void {

      this.router.navigate(['register']);

    }

}
