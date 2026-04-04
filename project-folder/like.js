function googleLogin(){

const provider = new firebase.auth.GoogleAuthProvider();

auth.signInWithPopup(provider)
.then(()=>{
alert("Google Login Successful");
});

}

function guestLogin(){

let guestId = "guest_"+Date.now();
localStorage.setItem("guestUser",guestId);

alert("Guest Mode ON");

}

function getUserId(){

if(auth.currentUser){
return auth.currentUser.uid;
}

let guest = localStorage.getItem("guestUser");

if(guest){
return guest;
}

return null;

}

function likeShayari(id){

let userId = getUserId();

if(!userId){
alert("Please login first");
return;
}

let ref = db.collection("likes").doc(id);

ref.get().then(doc=>{

if(!doc.exists){

ref.set({
count:1,
users:[userId]
});

}else{

let data = doc.data();

if(data.users.includes(userId)){
alert("Already liked");
return;
}

let newCount = data.count + 1;

ref.update({
count:newCount,
users:firebase.firestore.FieldValue.arrayUnion(userId)
});

}

});

}

function watchLikes(id){

db.collection("likes").doc(id)
.onSnapshot((doc)=>{

if(doc.exists){

let count = doc.data().count;

document.getElementById("like-"+id).innerText = count;

}

});

}