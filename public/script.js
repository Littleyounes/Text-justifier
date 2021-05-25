const changeStateCopy=(bool)=>{
if(bool){
 copybtn=document.querySelector("#copyIcon")
          copybtn.removeChild(copybtn.childNodes[0]);  
          copybtn.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-clipboard-check" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
  <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
</svg>`
}else{
   copybtn=document.querySelector("#copyIcon")
          copybtn.removeChild(copybtn.childNodes[0]);  
          copybtn.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-clipboard-minus" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M5.5 9.5A.5.5 0 0 1 6 9h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z"/>
  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
  <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
</svg>`
}
}
const fermerPopup=()=>{
overlay=document.getElementById('overlay')
  overlay.style.display='none'
    document.getElementById('overlayContent').removeChild(document.getElementById('overlayContent').firstChild);
    changeStateCopy(false);
}
const showOverlay=(text)=>{
  overlay=document.getElementById('overlay')
  overlay.style.display='block'
 
    justifiedText=document.createElement('p')
    justifiedText.id="justifiedText"
  justifiedText.innerHTML=text
  document.getElementById('overlayContent').appendChild(justifiedText)

}

$("#submitBtn").click(function(e) {
  
        var formText = document.querySelector("#form-justify > textArea");
        console.log(formText)
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/justify',
            data: formText.value,
            processData: false,
            contentType: "text/plain",
            
        }).then(msg=>{
          
          showOverlay(msg)
          

        });
})
$("#overlay").click(e=>{
  if(e.target !== e.currentTarget) return;
  fermerPopup();
})
$("button[aria-label=Close]").click(e=>{
  
  fermerPopup();
})

//////////////////////////////////////////
var btncopy = document.querySelector('#copyIcon');
if(btncopy) {
    btncopy.addEventListener('click', docopy);
}

function docopy() {

    // Cible de l'élément qui doit être copié
    var fromElement = document.querySelector('#justifiedText');
    if(!fromElement) return;

    // Sélection des caractères concernés
    var range = document.createRange();
    var selection = window.getSelection();
    range.selectNode(fromElement);
    selection.removeAllRanges();
    selection.addRange(range);

    try {
        // Exécution de la commande de copie
        var result = document.execCommand('copy');
        if (result) {
         changeStateCopy(true);
             
            //alert('Copié !');
        }
    }
    catch(err) {
        // Une erreur est surevnue lors de la tentative de copie
        alert(err);
    }

    // Fin de l'opération
    selection = window.getSelection();
    if (typeof selection.removeRange === 'function') {
        selection.removeRange(range);
    } else if (typeof selection.removeAllRanges === 'function') {
        selection.removeAllRanges();
    }
}