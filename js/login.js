//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
    var email=document.getElementById("form2Example17").value;
    var pass=document.getElementById("form2Example27").value;
    var parrafo=document.getElementById("warnings");

document.addEventListener("DOMContentLoaded", function(e){

});

    function ingreso(){
    let warnings= " "
    parrafo.innerHTML= ""
    if((email.value== "") || (pass.value=="")) {
    warnings+= `Debe introducir los datos`
    parrafo.innerHTML=warnings
    } else{
        guardar(email,pass);
   
    } 
}
function guardar(email, pass){  

    if (email.value=="" || pass.value==""){ //Chequea que el dato recibido no esté vacío. 
    //El método trim elimina los espacios en blanco al inicio y al final del mismo.
        alert("El dato está vacío");
    }    else{
    localStorage.setItem("usuario", email.value); //setItem almacena el dato en la posición "usuario"
    localStorage.setItem("password", pass.value); // Almaceno la contraseña
    sessionStorage.setItem("usuario", email.value);
    alert (" Usuario : " + email + " Password : " + pass ); 
    
   
    location.href="index.html";
    
    //getItem obtiene el dato almacenado en la posición "usuario"
   
    }
}

