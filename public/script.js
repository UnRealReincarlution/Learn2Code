class Document {
    constructor(document, user) {
        this.document = document;
        this.theme = (localStorage.getItem('theme') != undefined) ? localStorage.getItem('theme') : 'light';
        this.user = user;

        this.setTheme(this.theme);
    }

    setTheme(input) {
        switch (input){
            case 'dark':
                localStorage.setItem("theme", 'dark');
                document.documentElement.setAttribute('theme', 'dark');
                break;
            case 'light':
                localStorage.setItem("theme", 'light');
                document.documentElement.setAttribute('theme', 'light');
                break;
            default:
                localStorage.setItem("theme", 'light');
                document.documentElement.setAttribute('theme', 'light');
                break;
        }      
    }
}

let doc;

// IIFE
(() => {
    console.log("Loaded Content");
    doc = new Document(document, {});
})()

$("#add_course").on('click', (e) => {
    $("#overlay").css('display', 'flex');
    console.log("overlay shown")
});



//document.documentElement.removeAttribute('theme');