let random = Math.floor(Math.random()*100+1);
let count = 1 ;
document.getElementById("submitguess").onclick = function(){    
let guess_input = Number(document.getElementById("value_input").value); 
   if(count === 10){
    alert("YOU LOSE : press OK for restart.");
    window.location.reload();
   }
   if(guess_input === random){     
       alert("CONGRATULATIONS!!! YOU GUESSED IT RIGHT IN "
       + count + " GUESS : press OK for restart.");
       window.location.reload();
   }else{ 
       if(guess_input > random){     
            count++; 
            document.querySelector("#output").textContent = ("OOPS SORRY!! TRY A SMALLER "+guess_input); 
       }else{ 
            count++; 
            document.querySelector("#output").textContent = ("OOPS SORRY!! TRY A GREATER "+guess_input); 
   } 
}
} 