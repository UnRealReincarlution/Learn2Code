class Document {
    constructor(document, user) {
        this.document = document;
        this.theme = (localStorage.getItem('theme') != undefined) ? localStorage.getItem('theme') : 'light';
        this.user = user;
        this.loggedIn = false;
        this.user_info = {};

        this.setTheme(this.theme);
    }

    setTheme(input) {
        if(input == 'dark'){
            localStorage.setItem("theme", 'dark');
            document.documentElement.setAttribute('theme', 'dark');
        }else{
            localStorage.setItem("theme", 'light');
            document.documentElement.setAttribute('theme', 'light');
        } 
    }

    signUp() {
        let email = $("#s_email").val();
        let password = $("#s_password").val();
        let username = $("#s_name").val();
        let teacher_code = $("#teacher_code_val").val();

        let account_type = login_type;
        profile_updating = true;

        console.log(email, password, username);

        firebase.auth().createUserWithEmailAndPassword(email, password).then((cred) => {
            console.log(cred);

            localStorage.setItem('firstAuth', 'true');
            
            // Set Username
            return cred.user.updateProfile({
                displayName: username,
            }).catch(function(error) {
                console.log(error);
            }).then(() => {
                if(account_type == 'teacher' && (parseInt(teacher_code, 24) % 27) == 0){
                    db.collection("users").doc(cred.user.uid).set({
                        name: username,
                        account_type: 'teacher',
                        students: []
                    }).then(() => {
                        profile_updating = false;
                        // Redirect to homepage after sign up is completed
                        window.location = "./index.html";
                    });
                }else {
                    db.collection("users").doc(cred.user.uid).set({
                        name: username,
                        account_type: 'student',
                        teacher: {
                            id: 'null',
                            name: 'null'
                        },
                        info: {
                            lesson_date: 'null',
                            due_work: []
                        },
                        courses: []
                    }).then(() => {
                        profile_updating = false;
                        // Redirect to homepage after sign up is completed
                        window.location = "./index.html";
                    });
                }
                
            });
        }).catch(function(error) {
            console.log(error);
        });
    }

    login() {
        let email = $("#i_email").val();
        let password = $("#i_password").val();
        
        firebase.auth().signInWithEmailAndPassword(email, password).then((cred) => {
            console.log(cred);
        }).catch(function(error) {
            console.log(error);
        });
    }

    signOut() {
        firebase.auth().signOut()
    }
}

let doc;

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
})();

const auth = firebase.auth();
const db = firebase.firestore();

let profile_updating = false;