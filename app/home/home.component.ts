import { Component, OnInit } from '@angular/core';

import { User, Train } from '../_models/index';
import { UserService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    train: Train;
    id_layanan_kereta: number;
    nama_kereta :string;
    id_kereta:number;
    jumlah_penumpang:number;
    berangkat : date;
    stasiun_asal: string;
    stasiun_tujuan: string;
    datang : date;
    harga: number;
    total_harga: number;
    jumlahPenumpang:number;
    penumpang : Array<Penumpang> = new Array(3);
    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.nama_kereta = localStorage.getItem('nama_kereta');
        this.id_layanan_kereta = localStorage.getItem('id_layanan_kereta');
        this.id_kereta = localStorage.getItem('id_kereta');
        this.berangkat = new Date(localStorage.getItem('berangkat'));
        this.stasiun_asal = localStorage.getItem('stasiun_asal');
        this.stasiun_tujuan = localStorage.getItem('stasiun_tujuan');
        this.datang = new Date(localStorage.getItem('datang'));
        this.jumlahPenumpang = JSON.parse(localStorage.getItem('jumlahPenumpang'));
        this.harga = localStorage.getItem('harga_tiket');
        this.total_harga = this.harga*this.jumlahPenumpang;
        console.log(this.train);

    }

    ngOnInit() {
        this.loadAllUsers();
        $('#time').text(localStorage.getItem('time'));
        var res = localStorage.getItem('time').split(":");
        res[0] = parseInt(res[0]);
        res[1] = parseInt(res[1]);
        var tenMinutes = res[0]*60+res[1]-1,
        display = document.querySelector('#time');
        this.startTimer(tenMinutes, display);
    }
    startTimer(duration, display) {
        var timer = duration, minutes, seconds;
        setInterval(function () {
            minutes = parseInt(timer / 60, 10)
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = minutes + ":" + seconds;

            if (--timer < 0) {
                timer = duration;
                window.location.href='/reservation';
                window.alert("Waktu habis! anda akan dikembalikan ke halaman reservasi");

            }
        }, 1000);
    }

    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }
}
