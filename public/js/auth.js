firebase.auth().onAuthStateChanged(function(user) {
    if (user && !profile_updating) {
        doc.user = user;
        doc.loggedIn = true;
        console.log(`${user.displayName} is logged in.`);

        window.location = './index.html'

        $("#user_info").html(`<h4 id='user_name'>${user.displayName}</h4>`);
        $("#username_display").html(`Good ${(new Date().getHours() > 19) ? 'Evening' : (new Date().getHours() > 12) ? 'Afternoon' : 'Morning'}, ${user.displayName}`)
    }else {
        console.log(`No Users are logged in.`);

        $("#user_info").html("<a href='./auth.html' class='button'>Sign In</a>");
    }
});

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