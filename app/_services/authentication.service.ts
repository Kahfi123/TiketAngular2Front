import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Penumpang,Booking,Pemesan } from '../_models/index';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    cekKodeBooking(kodePembayaran: number) {
        return this.http.post('/api/cekKode', JSON.stringify({ kodePembayaran: kodePembayaran}))
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            });
    }
    konfirmasiPembayaran(kodePembayaran: number) {
        return this.http.post('/api/konfirmasiPembayaran', JSON.stringify({ kodePembayaran: kodePembayaran}))

    }
    tampilkanKereta(tahun: number,hari: number, bulan: number,departure: string,arrive: string,slot: number)
    {
        return this.http.get('http://localhost:8000/perjalanan/'+tahun+'/'+bulan+'/'+hari+'/'+departure+'/'+arrive+'/'+slot+'/')

            .map((response: Response) => {
                let trains = response.json();


                if (trains) {

                    localStorage.setItem('currentTrains', JSON.stringify(trains));

                }
            });
    }
    buatKodeBooking(jumlahPenumpang : string, id_layanan_kereta: string)
    {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('http://localhost:8000/booking/', JSON.stringify({ 'jumlah_penumpang': jumlahPenumpang,'id_layanan_kereta':id_layanan_kereta}),options)
        .map((response: Response) => {
            let kode_booking = response.json();


            if (kode_booking) {

                localStorage.setItem('kode_booking', JSON.stringify(kode_booking));


            }
        });
    }
    buatDataPenumpang(penumpang: Penumpang)
    {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('http://localhost:8000/penumpang/', JSON.stringify({ penumpang }),options)
        .map((response: Response) => {
            let penumpang = response.json();


            if (penumpang) {

                localStorage.setItem('kode_booking', JSON.stringify(kode_booking));


            }
        });
    }
    buatDataPemesan(pemesan: Pemesan)
    {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this.http.post('http://localhost:8000/pemesan/', JSON.stringify({ pemesan }),options)
      .map((response: Response) => {
          let pemesan = response.json();


          if (pemesan) {

              localStorage.setItem('kode_booking', JSON.stringify(kode_booking));


          }
      });
    }


}
