$("#calc-form").submit((e) => {
  e.preventDefault();
  const octals = {
    1: $("#one").val(),
    2: $("#two").val(),
    3: $("#three").val(),
    4: $("#four").val()
  }
  const cidr = $("#cidr").val();
  

  console.log(getNW(octals, cidr));
})