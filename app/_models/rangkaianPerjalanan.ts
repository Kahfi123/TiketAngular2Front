import { LayananKereta,Stasiun} from '../_models/index';
export class RangkaianPerjalanan {
  id_rangkaian_perjalanan : number;
  id_layanan_kereta : LayananKereta;
  id_stasiun   : Stasiun;
  jenis_perjalanan : string;
  waktu   : date;
}
