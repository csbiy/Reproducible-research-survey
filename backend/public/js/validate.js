
function emailCheck(){
   const email =  document.querySelector("#email");
   const domain = document.querySelector("#domain");
   const err = document.querySelector("#emailError");
    if(email.value == "" || email.value == undefined || domain.value == "" || domain.value == undefined ){
        err.style.display="block";
        return true;
    }else{
        err.style.display = "none";
        return false;
    }
}

function nameCheck(){
    const err = document.querySelector("#nameError");
    const name = document.querySelector("#name");
    if(name.value == "" || name.value == undefined){
        err.style.display="block"
        return true;
    }else{
        err.style.display="none";
        return false;
    }

}

