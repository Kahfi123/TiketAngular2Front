import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers/index';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService } from './_services/index';
import { HomeComponent } from './home/index';
import { RegisterComponent } from './register/index';
import { KonfirmasiComponent} from './konfirmasi/index';
import { KodeComponent} from './kode/index';
import { HasilKodeComponent} from './hasilKode/index';
import { KonfirmasiPembayaranComponent} from './konfirmasiPembayaran/index';
import { ReservationComponent }   from './reservation/reservation.component';
import { DaftarKeretaComponent }   from './daftarKereta/daftarKereta.component';
import { BookingComponent }   from './booking/booking.component';
import { BerandaComponent }   from './beranda/beranda.component';



@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        RegisterComponent,
        KonfirmasiComponent,
        KodeComponent,
        HasilKodeComponent,
        KonfirmasiPembayaranComponent,
        ReservationComponent,
        DaftarKeretaComponent,
        BookingComponent,
        BerandaComponent
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,

        // providers used to create fake backend
        fakeBackendProvider,
        MockBackend,
        BaseRequestOptions
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
