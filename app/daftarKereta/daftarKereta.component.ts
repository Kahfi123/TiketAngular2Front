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
    gotoBooking(selectedLayanan: LayananKereta): void {

      localStorage.setItem('selected_layanan', JSON.stringify(selectedLayanan));
      this.router.navigate(['booking']);

    }


}
