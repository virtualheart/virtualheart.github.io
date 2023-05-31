	var firebaseConfig = {
	    apiKey: "AIzaSyAxs-fkQV4ceyHYGE3B64TjSPE91nyHNPw",
	    authDomain: "anumgs-1ad57.firebaseapp.com",
	    databaseURL: "https://anumgs-1ad57-default-rtdb.asia-southeast1.firebasedatabase.app",
	    projectId: "anumgs-1ad57",
	    storageBucket: "anumgs-1ad57.appspot.com",
	    messagingSenderId: "81359180498",
	    appId: "1:81359180498:web:ec6bdd598af3b2a947d30b",
	    measurementId: "G-GQ255FY4N0"
	  };
	

  firebase.initializeApp(firebaseConfig);
	var min = 1;
	var max = 10000000000000;
	var randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  var database = firebase.database();
    
  function storeData() {

      var name = document.getElementById("name").value;
      var email = document.getElementById("email").value;
      var phone = document.getElementById("phone").value;
      var message = document.getElementById("message").value;

      if (name === "" || email === "" || phone === "" || message === "") {
          return alert("Enter valid information");
      }

      // Get a reference to the root of the database
      var database = firebase.database();
      
      // Set the value of a node in the database
      database.ref('portfilo/'+ name + '_' + randomNum).set({
        name: name,
        email: email,
        phone: phone,
        message: message
      }).then(function() {
        console.log("Data stored successfully!");
        return alert("Connect with ASAP");
      }).catch(function(error) {
        console.log("Error storing data: " + error);
        return alert("Failed");
      });
    }
