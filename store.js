buttons=document.getElementsByClassName('btn')
for(var i=0;i<buttons.length ;i++){
    buttons[i].addEventListener('click',putIn)
}
function putIn(e){
    if(localStorage.getItem(localStorage.key(localStorage.length-1))!==null){
alert("thanks for buying");
item=document.getElementById(e.target.id).parentElement.parentElement.innerHTML;
var storedNames = JSON.parse(localStorage.getItem(localStorage.key(localStorage.length-1))) 
storedNames.push(item);
localStorage.setItem(localStorage.key(localStorage.length-1), JSON.stringify( storedNames)); }
//  var storedNames = JSON.parse(localStorage.getItem(localStorage.key(localStorage.length-1))) 
}  

 function myfunction(){   one=document.getElementById("fname").value
if(localStorage.getItem(one)==null ||localStorage.getItem(one)== "[]"){
localStorage.setItem(one,"[]")
adding =document.getElementById("show");
adding.innerHTML="<P> you did not bought any thing yet<P>"
}
else if(localStorage.getItem(one)!==null){
adding =document.getElementById("show");
array=JSON.parse(localStorage.getItem(one));
adding.innerHTML = array;
for(var j=1;j<=array.length;j++){ 
document.getElementsByTagName("button")[j].style.display="none"
}

}
}