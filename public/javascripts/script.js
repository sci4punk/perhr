
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems);
});

// ADD NEW SITE ONCLICK

function addSiteForm() {
  document.getElementById("add-new-site").innerHTML = `
  <div class="new-folio-form">
    <div>
      <label>Site Name</label>
      <input class="input-field" id="siteName" type="text">
    </div>
    <div>
      <label>Site Domain</label>
      <input class="input-field" id="siteDomain" type="text">
    </div>
    <div>
      <label>Site Icon URL</label>
      <input class="input-field" id="siteIcon" type="text">
    </div>
      <button type="button" class="btn green white-text" id="new-folio-button">Add New Site</button>
  </div>
  `};

  // ADD NEW PORTFOLIO URL ONCLICK

function addPortfolioForm() {
  document.getElementById("add-new-url").innerHTML = `
  <div class="new-portfolio-url-form">
    <div>
      <label>Your Complete Profile URL</label>
      <input class="input-field" id="portfolioURL" type="text" value="https://">
    </div>
      <button type="button" class="btn green white-text" id="add-new-portfolio-url-button">Save</button>
  </div>
  `};


// PER.HR COPY URL FUNCTION - TOP RIGHT

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
      let arrayOfStuff = response.data;
      list.innerHTML = "";
      arrayOfStuff.forEach((theFolio)=>{
        let newDiv = document.createElement('div');
        newDiv.innerHTML = `
        <button class="btn portfolio-buttons white black-text" id="add-portfolio-url" onclick="addPortfolioForm()">
        <img class="portfolio-icons" src="${theFolio.siteIcon}" alt="${theFolio.siteName}"> ${theFolio.siteName}
        </button>`;
        list.appendChild(newDiv);
      })
    })
    .catch((err)=>{
    })
  }

    $(document).ready(getAllTheFoliosAndPutThemOnThePage());


  /////////////////////////////
  

  let folioButton = document.getElementById('new-folio-button');

  folioButton.onclick = ()=> {
    alert('BUTTON CLICKED');
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


