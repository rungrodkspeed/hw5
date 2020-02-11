// class Person{
//     constructor(name,gender){
//         this.name = name;
//         this.gender = gender;
//     }
//     getName = function(){
//         return `${this.name}`;
//     }
//     getGender = function(){
//         return `${this.gender}`;
//     }
// }

let firebaseConfig = {
    apiKey: "AIzaSyCxGgYvu4YOg8ZDrONxmA3JZBmtW5D0Fao",
    authDomain: "lab5-73612.firebaseapp.com",
    projectId: "lab5-73612",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();
let male = 0;
let female = 0;
let other = 0;
let email= '';

$('#reset').click(()=>{
        $('#name').val(''); 
        $('#gender').val('');
        $('#email').val('');
        $('#detail').val('');

});


$('#submit').click(()=>{
    db.collection('users')
        .add({
            name: $('#name').val(),
            // gender: $('#gender').val(()=>{
            //     if($('#gender').val('Male')){
            //         male++;
            //     }else{
            //         if($('#gender').val('Female')){
            //             female++;
            //         }else{
            //             other++;
            //         }
            // }console.log(male,female,other);}),
            gender: $('#gender').val(),
            email: $('#email').val(),
            detail: $('#detail').val()
        }
        )
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            $('#name').val('');
            $('#gender').val('');
            $('#email').val('');
            $('#detail').val('');
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
        $('button').click(()=>{
            console.log($('#name').val());
        });
});

db.collection('users').onSnapshot(doc =>{
    let table = $('tbody')[0];
    $("tbody tr").remove();
    male = 0;
    female = 0;
    other = 0 ;
    email = '';
    doc.forEach(item =>{
        let row = table.insertRow(-1);
        let firstCell   = row.insertCell(0);
        let secondCell  = row.insertCell(1);
        let thirdCell   = row.insertCell(2);
        firstCell.textContent = item.data().name;
        switch(item.data().gender){
            case "4": secondCell.textContent = 'Male';
                    male++;
                    break;
            case "3": secondCell.textContent = 'Female';
                    female++;
                    break;
            case "2": secondCell.textContent = 'Other..'; 
                    other++;
                    break;
            };
        
        email = ' ';
        email += item.data().email[0];
        for(let i = 1 ; i<item.data().email.length;i++){
            if(item.data().email[i] == '@'){email += '@';} 
            else if(item.data().email[i]=='.'){email+='.'}
            else if(item.data().email[i]) email += 'x'; 
        };
        thirdCell.textContent = email;
        // male += Number(item.data().male);
        // female += Number(item.data().female);
        // other += Number(item.data().other);
        console.log(male,female,other);
        });
    console.log(male / female);
    $('h4').text('Male'+(male/(male+female+other))*100+'%  Female'+(female/(male+female+other))*100+'%   Other'+(other/(male+female+other))*100+'%');
})

db.collection('users').where('grade','>',3).get().then(res => {
    res.forEach(item => console.log(item.data()))
})