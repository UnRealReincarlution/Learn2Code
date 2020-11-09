firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        db.collection(`users`).doc(user.uid).get().then((querySnapshot) => {
            doc.user_info = querySnapshot.data();
            
            if(doc.user_info.account_type == 'student') document.location = './';

            doc.user = user;
            doc.loggedIn = true;
            console.log(`${user.displayName} is logged in.`);

            if(doc.user_info.account_type == 'student'){
                if(doc.user_info.teacher.id !== 'null') localStorage.setItem('firstAuth', 'false')
                else localStorage.setItem('firstAuth', 'true')  
            }
            
            $("#welcome_overlay").css('display', (doc.user_info.account_type == 'teacher') ? 'none' : 'flex');
            $("#teacher_welcome_overlay").css('display', (doc.user_info.account_type == 'teacher') ? 'flex' : 'none');
            $("#account_logged_in").css('display', 'none');


            $("#welcome_msg").html(`Hello, ${doc.user.displayName}`)
            $("#user_info").html(`<h4 id='user_name'>${doc.user.displayName}</h4>`);
            $("#account_info_card_name").html(`${doc.user.displayName} • <strong>${doc.user_info.account_type}</strong>`)
            $("#username_display").html(`Good ${(new Date().getHours() > 19) ? 'Evening' : (new Date().getHours() > 12) ? 'Afternoon' : 'Morning'}, ${user.displayName}`)

            $("#loading_overlay").css('display', 'none');

            db.collection("courses").where("author", "==", doc.user.uid).get().then((querySnapshot) =>{
                querySnapshot.forEach((doc_) => {
                    doc.ownedCourses.push({
                        data: doc_.data(),
                        id: doc_.id
                    });
                });
        
                renderCourses();
            });
        });
    }else {
        window.location = "./auth";
        console.log(`No Users are logged in.`);

        $("#user_info").html("<a href='./auth' class='button'>Sign In</a>");
    }
});

let course_number = 1;

$("#add_course").on('click', (e) => {
    $("#course_select_overlay").css('display', 'flex');

    course_number = 1;

    $(`div[course_create='${course_number}']`).css('display', 'block');
    $(`.course_creator`).not(`[course_create='${course_number}']`).css('display', 'none');
    
    console.log("overlay shown")
});

$("#rem_course").on('click', (e) => {
    e.preventDefault();
    course_number--;

    if(course_number == 0) {
        $("#course_select_overlay").css('display', 'none');
        console.log("overlay hidden")
    }else{
        $(`div[course_create='${course_number}']`).css('display', 'block');
        $(`.course_creator`).not(`[course_create='${course_number}']`).css('display', 'none');
    }
});

$("#next_course").on('click', (e) => {
    e.preventDefault();
    course_number++;

    if(course_number <= 2) {
        $(`div[course_create='${course_number}']`).css('display', 'block');
        $(`.course_creator`).not(`[course_create='${course_number}']`).css('display', 'none'); 
    }else if(course_number == 3){
        $(`div[course_create='${course_number}']`).css('display', 'block');
        $(`.course_creator`).not(`[course_create='${course_number}']`).css('display', 'none');   

        $("#next_course").text("Finish");
    }else{ 
        $(`div[course_create='${course_number}']`).css('display', 'block');
        $(`.course_creator`).not(`[course_create='${course_number}']`).css('display', 'none');  

        $("#course_create_buttons").css('display', 'none'); 

        let language = $(".course_creator[course_create='2']").find(".active").text();
        let dificulty = $(".course_creator[course_create='3']").find(".active").text();

        // Title, Nick, Language, Dificulty
        doc.createCourse($("#course_create_title").val(), $("#course_create_nick").val(), language, dificulty);
        
        sleep(200).then(() => {
            $("#course_select_overlay").css('display', 'none');
        });
    }
});

$(".course_creator div h3").on('click', function() {
    $(this).parent().find("h3").removeClass("active");
    $(this).addClass("active");
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

function renderCourses() {
    doc.ownedCourses.forEach((element) => {
        $(".courses").eq(0).prepend(`<div class="course selectable_course ${element.data.language.toLowerCase()}" course-id="${element.id}">
            <h3>${element.data.course}</h3>
            <div class="package">
                <div class="lang">${element.data.language}</div>
                <a class="resume">Edit -&gt;</a>
            </div>
        </div>`);
    });
}

$(document).on('click', '.selectable_course', function(event) {
    let cid = $(this).attr('course-id');

    document.location = `./edit?c=${cid}`;
}); 