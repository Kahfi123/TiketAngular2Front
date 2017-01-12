import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService,AuthenticationService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'kode.component.html'
})

export class KodeComponent {
    model: any = {};
    loading = false;
    returnUrl:string;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    cekKodeBooking() {

        this.loading = true;
        this.authenticationService.cekKodeBooking(this.model.kodePembayaran)
            .subscribe(
                data => {
                    this.alertService.success('Kode Booking ditemukan', true);
                    this.router.navigate(['hasilKode']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });


    }
}
