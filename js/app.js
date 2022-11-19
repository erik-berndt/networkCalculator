$("#calc-form").submit((e) => {
  e.preventDefault();
  const one = Math.abs(parseInt($("#one").val()))
  const two = Math.abs(parseInt($("#two").val()))
  const three = Math.abs(parseInt($("#three").val()))
  const four = Math.abs(parseInt($("#four").val()))
  const cidr = $("#cidr").val();
  if ((one > 255 || two > 255 || three > 255 || four > 255) || cidr > 32) {
    $(".warning").text("Oktette: 0-255 CIDR: 0-32");
  } else {
    $(".warning").empty();
    $(".results").empty();
    $("#decBin").show();
    $("#binDec").hide();
    $("#binHex").hide();
    $("#calc").hide();
    $("#new").show();
    const octals = {
      1: one,
      2: two,
      3: three,
      4: four
    }
    const mask = getMask(cidr);
    const binMask = mask[0];
    const dezMask = mask[1];
    let a = Math.floor(cidr / 8)
    const result = getNW(octals, cidr);
    const nw = result[0];
    const bc = result[1];
    const nx = [...nw];
  
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
    $(".hosts").text(`Anzahl möglicher Hosts: ${2 ** (32 - cidr) - 2}`);
    // $(".decResults").show();
    $(".decResults").append(`
  <table>
    <tr class="t-row">
      <th class="t-head">Adresse</th>
      <th class="t-head">1.Oktett…</th>
      <th class="t-head">2.Oktett…</th>
      <th class="t-head">3.Oktett…</th>
      <th class="t-head">4.Oktett…</th>
      <th class="t-head">CIDR</th>
    </tr>
    <tr class="t-row">
      <td class="t-desc">IP-Adresse</td>
      <td class="t-data">${one}.</td>
      <td class="t-data">${two}.</td>
      <td class="t-data">${three}.</td>
      <td class="t-data">${four}</td>
      <td class="t-data">/${cidr}</td>
    </tr>
    <tr class="t-row">
      <td class="t-desc">Subnetzmaske</td>
      <td class="t-data">${dezMask[0]}.</td>
      <td class="t-data">${dezMask[1]}.</td>
      <td class="t-data">${dezMask[2]}.</td>
      <td class="t-data">${dezMask[3]}</td>
      <td class="t-data">/${cidr}</td>
    </tr>
    <tr class="t-row">
      <td class="t-desc">Netzwerk</td>
      <td class="t-data">${nw[0]}.</td>
      <td class="t-data">${nw[1]}.</td>
      <td class="t-data">${nw[2]}.</td>
      <td class="t-data">${nw[3]}</td>
      <td class="t-data">/${cidr}</td>
    </tr>
    <tr class="t-row">
      <td class="t-desc">Broadcast</td>
      <td class="t-data">${bc[0]}.</td>
      <td class="t-data">${bc[1]}.</td>
      <td class="t-data">${bc[2]}.</td>
      <td class="t-data">${bc[3]}</td>
      <td class="t-data">/${cidr}</td>
    </tr>
    <tr class="t-row">
      <td class="t-desc">Next</td>
      <td class="t-data">${nx[0]}.</td>
      <td class="t-data">${nx[1]}.</td>
      <td class="t-data">${nx[2]}.</td>
      <td class="t-data">${nx[3]}</td>
      <td class="t-data">/--</td>
    </tr>
  </table>
  `)
  $(".binResults").append(`
  <table>
    <tr class="t-row">
      <th class="t-head">Adresse</th>
      <th class="t-head">1.Oktett…</th>
      <th class="t-head">2.Oktett…</th>
      <th class="t-head">3.Oktett…</th>
      <th class="t-head">4.Oktett…</th>
      <th class="t-head">CIDR</th>
    </tr>
    <tr class="t-row">
      <td class="t-desc">IP-Adresse</td>
      <td class="t-data">${get_bin(one)}.</td>
      <td class="t-data">${get_bin(two)}.</td>
      <td class="t-data">${get_bin(three)}.</td>
      <td class="t-data">${get_bin(four)}</td>
      <td class="t-data">/${cidr}</td>
    </tr>
    <tr class="t-row">
      <td class="t-desc">Subnetzmaske</td>
      <td class="t-data">${binMask[0]}.</td>
      <td class="t-data">${binMask[1]}.</td>
      <td class="t-data">${binMask[2]}.</td>
      <td class="t-data">${binMask[3]}</td>
      <td class="t-data">/${cidr}</td>
    </tr>
    <tr class="t-row">
      <td class="t-desc">Netzwerk</td>
      <td class="t-data">${get_bin(nw[0])}.</td>
      <td class="t-data">${get_bin(nw[1])}.</td>
      <td class="t-data">${get_bin(nw[2])}.</td>
      <td class="t-data">${get_bin(nw[3])}</td>
      <td class="t-data">/${cidr}</td>
    </tr>
    <tr class="t-row">
      <td class="t-desc">Broadcast</td>
      <td class="t-data">${get_bin(bc[0])}.</td>
      <td class="t-data">${get_bin(bc[1])}.</td>
      <td class="t-data">${get_bin(bc[2])}.</td>
      <td class="t-data">${get_bin(bc[3])}</td>
      <td class="t-data">/${cidr}</td>
    </tr>
    <tr class="t-row">
      <td class="t-desc">Next</td>
      <td class="t-data">${get_bin(nx[0])}.</td>
      <td class="t-data">${get_bin(nx[1])}.</td>
      <td class="t-data">${get_bin(nx[2])}.</td>
      <td class="t-data">${get_bin(nx[3])}</td>
      <td class="t-data">/--</td>
    </tr>
  </table>
  `)
  $(".hexResults").append(`
  <table>
    <tr class="t-row">
      <th class="t-head">Adresse</th>
      <th class="t-head">1.Oktett…</th>
      <th class="t-head">2.Oktett…</th>
      <th class="t-head">3.Oktett…</th>
      <th class="t-head">4.Oktett…</th>
      <th class="t-head">CIDR</th>
    </tr>
    <tr class="t-row">
      <td class="t-desc">IP-Adresse</td>
      <td class="t-data">${get_hex(one)}.</td>
      <td class="t-data">${get_hex(two)}.</td>
      <td class="t-data">${get_hex(three)}.</td>
      <td class="t-data">${get_hex(four)}</td>
      <td class="t-data">/${cidr}</td>
    </tr>
    <tr class="t-row">
      <td class="t-desc">Subnetzmaske</td>
      <td class="t-data">${get_hex(dezMask[0])}.</td>
      <td class="t-data">${get_hex(dezMask[1])}.</td>
      <td class="t-data">${get_hex(dezMask[2])}.</td>
      <td class="t-data">${get_hex(dezMask[3])}</td>
      <td class="t-data">/${cidr}</td>
    </tr>
    <tr class="t-row">
      <td class="t-desc">Netzwerk</td>
      <td class="t-data">${get_hex(nw[0])}.</td>
      <td class="t-data">${get_hex(nw[1])}.</td>
      <td class="t-data">${get_hex(nw[2])}.</td>
      <td class="t-data">${get_hex(nw[3])}</td>
      <td class="t-data">/${cidr}</td>
    </tr>
    <tr class="t-row">
      <td class="t-desc">Broadcast</td>
      <td class="t-data">${get_hex(bc[0])}.</td>
      <td class="t-data">${get_hex(bc[1])}.</td>
      <td class="t-data">${get_hex(bc[2])}.</td>
      <td class="t-data">${get_hex(bc[3])}</td>
      <td class="t-data">/${cidr}</td>
    </tr>
    <tr class="t-row">
      <td class="t-desc">Next</td>
      <td class="t-data">${get_hex(nx[0])}.</td>
      <td class="t-data">${get_hex(nx[1])}.</td>
      <td class="t-data">${get_hex(nx[2])}.</td>
      <td class="t-data">${get_hex(nx[3])}</td>
      <td class="t-data">/--</td>
    </tr>
  </table>
  `)
    $("#decBin").click(() => {
      $(".decResults").hide();
      $(".hexResults").hide();
      $(".binResults").show();
      $("#decBin").hide();
      $("#binHex").hide();
      $("#binHex").show();
    })
    $("#binDec").click(() => {
      $(".binResults").hide();
      $(".hexResults").hide();
      $(".decResults").show();
      $("#binDec").hide();
      $("#binHex").hide();
      $("#decBin").show();
    })
    $("#binHex").click(() => {
      $(".binResults").hide();
      $(".decResults").hide();
      $(".hexResults").show();
      $("#decBin").hide();
      $("#binHex").hide();
      $("#binDec").show();
    })
    $("#new").click(() => location.reload());
  }
})