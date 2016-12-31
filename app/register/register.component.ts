import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Penumpang } from '../_models/index';
import { AlertService, UserService,AuthenticationService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css']
})

export class RegisterComponent {
    model: any = {};
    loading = false;
    returnUrl:string;
    jumlahPenumpang:number;
    penumpang : Penumpang[] = [];
    numbers: any[] = [];
    jumlahInputPenumpang = new Array(JSON.parse(localStorage.getItem('jumlahPenumpang')));
    constructor(
        private router: Router,
        private userService: UserService,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) {
          this.jumlahPenumpang = JSON.parse(localStorage.getItem('jumlahPenumpang'));



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
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    //this.alertService.success('Data Berh', true);
                    this.router.navigate(['home']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });


    }
}
