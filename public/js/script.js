firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        db.collection(`users`).doc(user.uid).get().then((querySnapshot) => {
            doc.user_info = querySnapshot.data();
            
            if(doc.user_info.account_type == 'teacher') document.location = './teacher';

            doc.user = user;
            doc.loggedIn = true;
            console.log(`${user.displayName} is logged in.`);

            if(doc.user_info.account_type == 'student'){
                if(doc.user_info.teacher.id !== 'null') localStorage.setItem('firstAuth', 'false')
                else localStorage.setItem('firstAuth', 'true')  
            }
            
            if(localStorage.getItem('firstAuth') == 'true') {
                $("#welcome_overlay").css('display', (doc.user_info.account_type == 'teacher') ? 'none' : 'flex');
                $("#teacher_welcome_overlay").css('display', (doc.user_info.account_type == 'teacher') ? 'flex' : 'none');
                $("#account_logged_in").css('display', 'none')
            }else {
                $("#welcome_overlay").css('display', 'none');
                $("#teacher_welcome_overlay").css('display', 'none');
                $("#account_logged_in").css('display', 'flex');
            }

            $("#user_info").html(`<h4 id='user_name'>${doc.user.displayName}</h4>`);
            $("#account_info_card_name").html(`${doc.user.displayName} • <strong>${doc.user_info.account_type}</strong>`)
            $("#username_display").html(`Good ${(new Date().getHours() > 19) ? 'Evening' : (new Date().getHours() > 12) ? 'Afternoon' : 'Morning'}, ${user.displayName}`)

            $("#loading_overlay").css('display', 'none');
        });
    }else {
        window.location = "./auth.html";
        console.log(`No Users are logged in.`);

        $("#user_info").html("<a href='./auth.html' class='button'>Sign In</a>");
    }
});

$("#add_course").on('click', (e) => {
    $("#course_select_overlay").css('display', 'flex');
    console.log("overlay shown")
});

$("#rem_course").on('click', (e) => {
    e.preventDefault();
    $("#course_select_overlay").css('display', 'none');
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