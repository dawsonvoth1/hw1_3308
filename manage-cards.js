
var counter=4;

function addCard(c){
    var cardId=document.getElementById(c.toString());
    var temp="card"+counter.toString();
    var temp2="'"+temp+"'";
    var newCard="<div class='card'><div class='card-body' id='card"+counter.toString()+"'><img class='card-img-top' src='IMG_6648.jpeg' alt='' height='auto' width='auto'><h5 class='card-title'>Skiing</h5><p class='card-text'>I love skiing because it gets I can just zone out and focus on nothing else.</p><button type='button' class='btn btn-danger btn-sm' onclick="+'"'+"deleteCard("+temp2.toString()+")"+'"'+">Del</button></div></div>";
    cardId.innerHTML=cardId.innerHTML+newCard.toString();
    counter++;
}

function deleteCard(c){
    console.log(c.toString());
    var childId=document.getElementById(c.toString());
    childId.remove();
}