class Course {
    constructor(title, id, public, lessons) {
        this.course = title;
        this.course_id = id;
        this.public = public;
        this.lessons = (lessons) ? lessons : [];
        this.lesson_count = (lessons) ? lessons.size() : 0;
    }

    addLesson(lesson) {
        this.lesson_count++;
        lesson.order = this.lesson_count - 1;
        this.lessons.push(lesson);
    }
}

module.exports = Course;