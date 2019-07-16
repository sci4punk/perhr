
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems);
});


function copyToClipboard() {
  var copyText = document.getElementById("clipboard-btn");
  copyText.select();
  document.execCommand("copy");
}

// AXIOS API

document.addEventListener('DOMContentLoaded', () => {

  function getAllTheFoliosAndPutThemOnThePage(){
    let list = document.getElementById('folio-list');
    axios.get('http://localhost:3000/portfolios/new-folio/api')
    .then((response)=>{
      let arrayOfStuff = response.data.reverse();
      list.innerHTML = "";
      arrayOfStuff.forEach((theFolio)=>{
        let newDiv = document.createElement('div');
        newDiv.innerHTML = `
        <h4> ${theFolio.siteName} </h4>
        <h6> ${theFolio.siteDomain} </h6>
        <p> ${theFolio.siteIcon} </p>
        `
        list.appendChild(newDiv);
      })
    })
    .catch((err)=>{
    })
  }

  setTimeout(getAllTheFoliosAndPutThemOnThePage, 10000);

  let folioButton = document.getElementById('new-folio-button');

  folioButton.onclick = ()=>{
    let siteName = document.getElementById('siteName');
    let siteDomain = document.getElementById('siteDomain');
    let siteIcon = document.getElementById('siteIcon');
    axios.post('http://localhost:3000/portfolios/new-folio/api', {siteName: siteName.value, siteDomain: siteDomain.value, siteIcon: siteIcon.value})
    .then((res)=>{
        getAllTheFoliosAndPutThemOnThePage();
    })
    .catch((err)=>{
    })

    siteName.value = "";
    siteDomain.value = "";
    siteIcon.value = ""; 

  }

}, false);