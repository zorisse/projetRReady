document.addEventListener('DOMContentLoaded', () => {

  console.log('qcmchecker!');
  let _id = document.getElementById('_id').textContent
  console.log(_id)
  $('input').on('click', function (e) {
    console.log(e.target.parentElement.parentElement)
    $(this).parent().parent().css("background-color", "red")
  })

  axios.get(`http://localhost:3000/qcm/${_id}/axios`)
    .then(qcm => {
      console.log(qcm.data)
    })
}, false);
