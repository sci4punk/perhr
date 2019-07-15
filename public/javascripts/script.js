document.addEventListener('DOMContentLoaded', () => {

  console.log('ready to go');

}, false);


function copyToClipboard() {
  var copyText = document.getElementById("clipboard-btn");
  copyText.select();
  document.execCommand("copy");
}


function valueChanged()
{
    if($('check-email').is(":checked"))   
        $(".email").hide();
    else
        $(".email");
}
</script>