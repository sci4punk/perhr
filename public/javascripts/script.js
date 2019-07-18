
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems);
  var ports = $('#ports');
  ports.change(getval);
  
});


function getval(e) {
  
  let currentlySelected = $(this).val();
  let somethingElse = $(`option[value=${currentlySelected}]`).data('url');
  $('#dataUrl').val(somethingElse);

  if (somethingElse){
    $('#personalUrl').addClass('active');
  } else {
    $('#personalUrl').removeClass('active');
  }
};

// PER.HR COPY URL FUNCTION - TOP RIGHT

function copyToClipboard() {
  var copyText = document.getElementById("clipboard-btn");
  copyText.select();
  document.execCommand("copy");
}

// AXIOS API

// document.addEventListener('DOMContentLoaded', () => {

//   function getAllTheFoliosAndPutThemOnThePage(){
//     let list = document.getElementById('folio-list');
//     axios.get('/portfolios/new-folio/api')
//     .then((response)=>{
//       let arrayOfStuff = response.data;
//       list.innerHTML = "";
//       arrayOfStuff.forEach((theFolio)=>{
//         let newDiv = document.createElement('div');
//         newDiv.innerHTML = `
//         <button class="btn portfolio-buttons white black-text" id="add-portfolio-url" onclick="addPortfolioForm()">
//         <img class="portfolio-icons" src="${theFolio.siteIcon}" alt="${theFolio.siteName}"> ${theFolio.siteName}
//         </button>`;
//         list.appendChild(newDiv);
//       })
//     })
//     .catch((err)=>{
//     })
//   }

//     $(document).ready(getAllTheFoliosAndPutThemOnThePage());


  /////////////////////////////
  

//   let folioButton = document.getElementById('new-folio-button');

//   folioButton.onclick = ()=> {
//     alert('BUTTON CLICKED');
//     let siteName = document.getElementById('siteName');
//     let siteDomain = document.getElementById('siteDomain');
//     let siteIcon = document.getElementById('siteIcon');
//     axios.post('/portfolios/new-folio/api', {siteName: siteName.value, siteDomain: siteDomain.value, siteIcon: siteIcon.value})
//     .then((res)=>{
//         getAllTheFoliosAndPutThemOnThePage();
//     })
//     .catch((err)=>{
//     })

//     siteName.value = "";
//     siteDomain.value = "";
//     siteIcon.value = ""; 

//   }


// }, false);


