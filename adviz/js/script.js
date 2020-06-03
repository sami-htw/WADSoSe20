/*
 * inside this function we have defined the username , but we will try to
 * improve this fuction using input_possibilities in javascript.
 * we have also to use getElementsByClassName instead of getElementById
 */


function userLoginFunction() {
    /*
        var firstUser="admin" , secondUser="normalo";
        var firstPass="admin" , secondPass="normalo";
    */


    let checkUserValue = document.querySelector("label.button['username']").value;
    let checkPassValue = document.querySelector("label.button['pass']").value;
    let message = prompt("Erro ,please enter eather 'admin or 'normalo' as username");


    if (checkUserValue === "admin" && checkPassValue === "admin") {
        location.href = "";

        /* 
         *if user and password are admin ,open the contact page where we can add members ,but
         *according to the instruction we don't need the window.open at all ,so 
         * I will try to do something else
         */
        window.open("http://127.0.0.1:8080/adviz/?username=admin&password=admin#maps");




    } else if (secondUser === "normalo" && checkPassValue === "normalo") {

        // here I am trying to apply open function ,but with disply.none for (add and update) possibility 

        document.querySelector("div.button").style.display = "none";

        /*
        document.querySelector("div .button['adds']").style.display = "none";
        */
    } else {

        window.close("http://127.0.0.1:8080/adviz/?username=admin&password=admin#maps");

        document.querySelector("section['map']").innerHTML = message;

    }


}