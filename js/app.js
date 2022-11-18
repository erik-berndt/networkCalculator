$("#calc-form").submit((e) => {
  e.preventDefault();
  const octals = {
    1: parseInt($("#one").val()),
    2: parseInt($("#two").val()),
    3: parseInt($("#three").val()),
    4: parseInt($("#four").val())
  }
  const cidr = $("#cidr").val();
  let a = Math.floor(cidr /8) 
  const result = getNW(octals, cidr);
  const nw = result[0];
  const bc = result[1];
  $(".results").append(`<h1>Netzwerkadresse: ${nw[0]}.${nw[1]}.${nw[2]}.${nw[3]}`)
  $(".results").append(`<h1>Broadcastadress: ${bc[0]}.${bc[1]}.${bc[2]}.${bc[3]}`)
  
  const nx = nw;
  
  if (bc[a] != 255) {
    nx[a] = bc[a] + 1;
    for (let i = a + 1; i < 4; i++) {
      nx[i] = 0;
    }
  } else {
    nx[a - 1] = bc[a - 1] + 1;
    for (let i = a; i < 4; i++) {
      nx[i] = 0;
    }
  }
  $(".results").append(`<hr><h1>Nächstes Netz : ${nx[0]}.${nx[1]}.${nx[2]}.${nx[3]}`)
})
