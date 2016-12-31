import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
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
    tampilkanKereta(date: number,departure: number,arrive: number,slot: number)
    {
        return this.http.post('/api/showTrains', JSON.stringify({ date: date,departure:departure,arrive:arrive,slot:slot}))
            .map((response: Response) => {

                let trains = response.json();
                if (trains) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentTrains', JSON.stringify(trains));
                    
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
