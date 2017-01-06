import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService,AuthenticationService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'konfirmasiPembayaran.component.html'
})

export class KonfirmasiPembayaranComponent {
    model: any = {};
    loading = false;
    returnUrl:string;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    konfirmasiPembayaran() {

        this.loading = true;
        this.authenticationService.konfirmasiPembayaran(this.model.kodePembayaran)
            .subscribe(
                data => {
                    this.alertService.success('Berhasil Menyelesaikan Pembayaran', true);
                    this.router.navigate(['cekKodeBooking']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });


    }
}
