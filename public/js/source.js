class Document {
    constructor(document, user) {
        this.document = document;
        this.theme = (localStorage.getItem('theme') != undefined) ? localStorage.getItem('theme') : 'light';
        this.user = user;
        this.loggedIn = false;

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

        console.log(email, password, username);

        firebase.auth().createUserWithEmailAndPassword(email, password).then((cred) => {
            console.log(cred);
            
            // Set Username
            return cred.user.updateProfile({
                displayName: username,
            }).catch(function(error) {
                console.log(error);
            }).then(() => {
                // Redirect to homepage after sign up is completed
                window.location = "./index.html";
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
}