document.addEventListener('DOMContentLoaded', () => {
  console.log('IronGenerator JS imported successfully kjb!');


  const whoIsChecked = () => {
    for (let index = 1; index < 5; index++) {
      let isChecked = $("#correct" + [index]).prop("checked")
      if (isChecked) {
        return index
      }
    }
  }

  const correctReponse = (index) => {
    let reponseIndex = $(`#reponse${index}`).val()
    $(`#reponse${index}`).css("background-color", "#acefb2")
    $('#reponse_correct').val(reponseIndex).css("background-color", "#acefb2")
  }

  $(".form-check-input").click(function () {
    var index = whoIsChecked()
    if (index === undefined) {
      $(`input`).css("background-color", "white")
      $('#reponse_correct').val("")
    }

    if (index > 0) {
      correctReponse(index)
    }
  })

}, false);
