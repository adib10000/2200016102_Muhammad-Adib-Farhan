function validasiInput(input) {
    if (input === undefined || input === null) {
        throw new Error('Input Salah');
      }
    for (let i = 0; i < input.length; i++) {
      const kodeAscii = input.charCodeAt(i);
      if (kodeAscii >= 48 && kodeAscii <= 57) {
        continue;
      }
      throw new Error('Input Salah');
    }
    var hasil = parseInt(input);
    return hasil;
  }
  
  export { validasiInput }
  