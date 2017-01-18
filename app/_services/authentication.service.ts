import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Penumpang,Booking,Pemesan,CaraBooking,LayananKereta } from '../_models/index';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    _layananKereta : LayananKereta [];
    constructor(private http: Http) { }

    cekKodeBooking(kode_pembayaran: number) {
        return this.http.get('http://localhost:8000/booking/'+kode_pembayaran+'/')
            .map((response: Response) => {

                let booking = response.json();
                if (booking) {


                    localStorage.setItem('book', JSON.stringify(booking));
                }
            });
    }

    konfirmasiPembayaran(kode_pembayaran: number) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var currentTime = new Date();
        return this.http.patch('http://localhost:8000/pembayaran/'+kode_pembayaran+'/', JSON.stringify({ 'kode_pembayaran': kode_pembayaran,'waktu_pembayaran':currentTime}),options)

    }
    tampilkanKereta(tahun: number,hari: number, bulan: number,departure: string,arrive: string,slot: number)
    {

        return this.http.get('http://localhost:8000/layanan/'+tahun+'/'+bulan+'/'+hari+'/'+departure+'/'+arrive+'/')
            .map((response: Response) => {
                let trains = response.json();

                if (trains) {

                    this._layananKereta = trains;

                }
            });
    }
    buatKodeBooking(jumlahPenumpang : string, id_layanan_kereta: number)
    {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('http://localhost:8000/booking/', JSON.stringify({ 'jumlah_penumpang': jumlahPenumpang,'layanan_kereta':id_layanan_kereta}),options)
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
        let kode_booking  = parseInt(JSON.parse(localStorage.getItem('kode_booking')).kode_booking);
        return this.http.post('http://localhost:8000/booking/'+kode_booking+'/penumpang', JSON.stringify({ 'nomor_identitas':penumpang.nomor_identitas,'nama_penumpang':penumpang.nama_penumpang}),options)
        .map((response: Response) => {
            let penumpang = response.json();
            let array_penumpang: any[] = JSON.parse(localStorage.getItem('penumpang')) || [];

            if(penumpang)
            {
              array_penumpang.push(penumpang);
              localStorage.setItem('penumpang',JSON.stringify(array_penumpang));
            }




        });
    }
    buatDataPemesan(pemesan: Pemesan)
    {

      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this.http.post('http://localhost:8000/pemesan/', JSON.stringify({ 'kode_booking':pemesan.kode_booking,'nama_pemesan' : pemesan.nama_pemesan, 'email_pemesan':pemesan.email_pemesan, 'nomor_telepon_pemesan': pemesan.nomor_telepon_pemesan,'alamat_pemesan': pemesan.alamat_pemesan }),options)
      .map((response: Response) => {
          let pemesan = response.json();

      });
    }
    buatDataPembayaran(cara_bayar: CaraBayar,kode_booking: number)
    {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this.http.post('http://localhost:8000/pembayaran/', JSON.stringify({ 'kode_booking':kode_booking,'id_cara_bayar' : cara_bayar.id_cara_bayar}),options)
      .map((response: Response) => {
            let pembayaran = response.json();
            if(pembayaran)
            {
              localStorage.setItem('pembayaran',JSON.stringify(pembayaran));

            }
      });
    }


}
