import { validasiInput } from "./validate.js";

function tambah(a, b) {
  var x = validasiInput(a);
  var y = validasiInput(b);
  return x + y;
}

function kali(a, b) {
  var x = validasiInput(a);
  var y = validasiInput(b);
  return x * y;
}

function kurang(a, b) {
  var x = validasiInput(a);
  var y = validasiInput(b);
  return x - y;
}

function bagi(a, b) {
  var x = validasiInput(a);
  var y = validasiInput(b);
  if (y === 0) {
    throw new Error('Tidak bisa membagi dengan nol');
  }
  return x / y;
}

export { tambah, kali, kurang, bagi };
