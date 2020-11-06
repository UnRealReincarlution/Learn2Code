let doc;

// IIFE
(() => {
    console.log("Loaded Content");
    doc = new Document(document, {});

    var firebaseConfig = {
        apiKey: "AIzaSyB7alTf1WYDY8vBC5kJ8U1tmSi7dg6gxD8",
        authDomain: "learn-to-code-nz.firebaseapp.com",
        databaseURL: "https://learn-to-code-nz.firebaseio.com",
        projectId: "learn-to-code-nz",
        storageBucket: "learn-to-code-nz.appspot.com",
        messagingSenderId: "299048324789",
        appId: "1:299048324789:web:ca0ceca1c5d9cf8598b8fc",
        measurementId: "G-04BXSRYWNC"
    };
    
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            window.location = "./index.html";
            
            doc.user = user;
            doc.loggedIn = true;
            console.log(`${user.displayName} is logged in.`);

            $("#user_info").html(`<h4 id='user_name'>${user.displayName}</h4>`);
        }else {
            console.log(`No Users are logged in.`);

            $("#user_info").html("<a href='./auth.html' class='button'>Sign In</a>");
        }
    });
})();

const auth = firebase.auth();
const db = firebase.firestore();

$("#add_course").on('click', (e) => {
    $("#overlay").css('display', 'flex');
    console.log("overlay shown")
});

$("#rem_course").on('click', (e) => {
    e.preventDefault();
    $("#overlay").css('display', 'none');
    console.log("overlay hidden")
});

function showSignup() {
    $("#signup_form").css('display', 'flex');
    $("#login_form").css('display', 'none');

    $("#student_toggle").css('display', 'flex');
}

function showLogin() {
    $("#signup_form").css('display', 'none');
    $("#login_form").css('display', 'flex');

    $("#student_toggle").css('display', 'none');
}