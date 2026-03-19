
const button = document.getElementById("bar")

var flag = false
const changeIcon = ()=>{
    
   

if(flag === false){
    
 button.innerHTML = `
   <i class="fa-solid fa-xmark"></i>
    `
flag = true;

}

else{
    button.innerHTML=`
    <i class="fa-solid fa-bars"></i>
    `
    flag = false;
}

}

button.addEventListener("click",changeIcon)