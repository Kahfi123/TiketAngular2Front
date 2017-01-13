import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { User,Penumpang} from '../_models/index';
import {Observable} from 'rxjs/Rx';
@Injectable()
export class UserService {

    constructor(private http: Http) { }

    getStations() {
        return this.http.get('http://127.0.0.1:8000/stasiun/').map((response: Response) => response.json());
    }

    getCaraBayar(){
        return this.http.get('http://127.0.0.1:8000/carabayar/').map((response: Response) => response.json());
    }

}
