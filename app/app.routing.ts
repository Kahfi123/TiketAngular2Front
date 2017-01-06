import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { RegisterComponent } from './register/index';
import { KonfirmasiComponent} from './konfirmasi/index';
import { AuthGuard } from './_guards/index';
import { KodeComponent } from './kode/index';
import { HasilKodeComponent} from './hasilKode/index';
import { KonfirmasiPembayaranComponent} from './konfirmasiPembayaran/index';
import { ReservationComponent }   from './reservation/reservation.component';
import { DaftarKeretaComponent }   from './daftarKereta/daftarKereta.component';
import { BookingComponent }   from './booking/booking.component';
import { BerandaComponent }   from './beranda/beranda.component';

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'register', component: RegisterComponent },
    { path: 'konfirmasi', component: KonfirmasiComponent },
    { path:'cekKodeBooking', component: KodeComponent},
    { path:'hasilKode',component: HasilKodeComponent},
    { path:'konfirmasiPembayaran',component: KonfirmasiPembayaranComponent},
    { path: 'reservation',  component: ReservationComponent },
    { path:'daftarKereta', component:DaftarKeretaComponent},
    { path:'booking', component:BookingComponent},
    { path:'beranda', component:BerandaComponent},
    { path:'beranda#information', component:BerandaComponent},

    // otherwise redirect to home
    { path: '**', redirectTo: 'beranda' }
];

export const routing = RouterModule.forRoot(appRoutes);
