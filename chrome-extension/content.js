console.log("content.js loaded");

let overDiv = document.getElementById("ember53")
overDiv.innerHTML=`<a href="http://perhr.herokuapp.com/5d31413cacad5e0017331dff/"><button class="pv-s-profile-actions pv-s-profile-actions--connect ml2 artdeco-button artdeco-button--2 artdeco-button--primary ember-view">$125 per.hr</button></a>`;

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse){
  if (message.txt === "perhr user"){
    let overDiv = document.getElementById("ember53");
    if (overDiv.innerHTML === 'perhr') {
      let overDiv = document.getElementById("ember53");

      overDiv.style.display='block';
    } else {
      overDiv.innerHTML=`<a href="http://perhr.herokuapp.com/5d31413cacad5e0017331dff/"><button class="pv-s-profile-actions pv-s-profile-actions--connect ml2 artdeco-button artdeco-button--2 artdeco-button--primary ember-view">$125 per.hr</button></a>`;
    }
  }
}