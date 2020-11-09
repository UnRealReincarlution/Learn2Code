const urlParams = new URLSearchParams(window.location.search);

db.collection(`courses`).doc(urlParams.get('c')).get().then((element) => {
    console.log(element.data());

    $("#loading_overlay").css('display', 'none');
    $("#display").text(element.data().course);
});