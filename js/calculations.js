const hex = {
  10: "A",
  11: "B",
  12: "C",
  13: "D",
  14: "E",
  15: "F"
}


function get_bin(x) {
  let xBin = "";
  for (let i = 7; i >= 0; i--) {
    if (2 ** i <= x) {
      xBin += "1";
      x -= 2 ** i;
    } else {
      xBin += "0";
    }
  }
  return xBin;
}

function get_hex(x) {
  let xHex = "";
  if (x > 15) {
    const div = Math.floor(x / 16)
    div > 9 ? xHex += hex[div]: xHex += div.toString();
    x -= 16 * div;
  }
  x > 9 ? xHex += hex[x]: xHex += x.toString();
  return xHex;
}

function binToDec(bin) {
    let dec = 0;
    for (let i=0; i < bin.length; i++){
        if (bin[i] == '1') {
            dec += 2 ** (bin.length - (i+1));
        }
    }
    return dec;
}

function getNW(octals, cidr) {
  const nw = [];
  const bc = [];
  const oct = Math.floor(cidr / 8);
  const overhead = cidr % 8;
  for (let i = 1; i <= oct; i++) {
    nw.push(octals[i])
    bc.push(octals[i])
  }
  if (overhead != 0) {
    let interestingOct = get_bin(octals[oct + 1]);
    let net = "";
    let br = "";
    for (let i = 0; i < 8; i++) {
      if (i < overhead) {
        net += interestingOct[i];
        br += interestingOct[i];
      } else {
        net += "0";
        br += "1";
      }
    }
    nw.push(binToDec(net));
    bc.push(binToDec(br));
  }
  for (let k = nw.length; k < 4; k++) {
    nw.push(0);
    bc.push(255);
  }
  return [nw, bc];
}

function getMask(cidr) {
  let binMask = [];
  let dezMask = [];
  let k = 0;
  for (let i = 0; i < 4; i++) {
    let oct = "";
    for (let j = 0; j < 8; j++) {
      k < cidr ? oct += "1" : oct += "0";
      k++
    }
    binMask.push(oct);
    dezMask.push(binToDec(oct));
  }
  return [binMask, dezMask];
}