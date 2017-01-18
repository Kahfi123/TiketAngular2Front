import (Kereta, Perjalanan) from ./index 

export class LayananKereta {
  id_layanan_kereta : number;
  kereta : Kereta;
  sisa_kursi : number;
  asal : Perjalanan;
  tujuan : Perjalanan;
  kapasitas : number;
  harga_tiket : number;
}
