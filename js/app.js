$("#calc-form").submit((e) => {
  e.preventDefault();
  const octals = {
    1: $("#one").val(),
    2: $("#two").val(),
    3: $("#three").val(),
    4: $("#four").val()
  }
  const cidr = $("#cidr").val();
  const result = getNW(octals, cidr);
  $(".results").append(`<h1>${result[0][0]}.${result[0][1]}.${result[0][2]}.${result[0][3]}`)
  $(".results").append(`<h1>${result[1][0]}.${result[1][1]}.${result[1][2]}.${result[1][3]}`)
})