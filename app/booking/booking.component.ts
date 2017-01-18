import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Train,LayananKereta } from '../_models/index';
import { UserService,AuthenticationService, } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'booking.component.html',
    styleUrls: ['booking.component.css']
})

export class BookingComponent implements OnInit {
  selectedLayanan : LayananKereta;
  jumlahPenumpang : number;
  loading = false;
  setuju : boolean = false;

    constructor(private userService: UserService,private authenticationService: AuthenticationService,private router: Router) {
      this.selectedLayanan = JSON.parse(localStorage.getItem('selected_layanan'));
      this.jumlahPenumpang = JSON.parse(localStorage.getItem('jumlahPenumpang'));
    }

    ngOnInit() {

    }

    addProp1(e) {

       if(e.target.checked){
          this.setuju = true;
       }
       else
       {
         this.setuju = false;
       }
    }
    goToRegister(): void {
      this.loading = true;
      if(this.setuju == false)
      {
        window.alert("Anda harus menyetujui persyaratan reservasi untuk melanjutkan");
      }
      else
      {
        this.authenticationService.buatKodeBooking(this.jumlahPenumpang,this.selectedLayanan.id_layanan_kereta)
            .subscribe(
                data => {
                    this.router.navigate(['register']);
                },
            );

      }


    }

}
