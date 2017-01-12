import { Component, OnInit } from '@angular/core';

import { User, Booking, Penumpang } from '../_models/index';
import { UserService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'hasilKode.component.html',
    styleUrls: ['hasilKode.component.css']
})

export class HasilKodeComponent implements OnInit {
    booking: any;
    kode_booking : number ;
    kode_pembayaran : number;
    nama_pemesan : string;
    array_penumpang : penumpang[] = [];


    constructor(private userService: UserService) {
        this.booking = JSON.parse(localStorage.getItem('book'));
        for (var b of this.booking)
        {
            this.kode_pembayaran = b.pembayaran[0].kode_pembayaran;
            this.nama_pemesan = b.pemesan[0].nama_pemesan;
            if(b.pembayaran[0].waktu_pembayaran == null)
            {
              this.kode_booking = "*********";
            }
            else
            {
              this.kode_booking = b.kode_booking;
            }
            for(var a of b.penumpang)
            {
              this.array_penumpang.push(a);

            }

        }
    }

    ngOnInit() {

    }


}
