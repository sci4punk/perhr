
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems);
});


function copyToClipboard() {
  var copyText = document.getElementById("clipboard-btn");
  copyText.select();
  document.execCommand("copy");
}
