create table if not exists students (
    students_id serial primary key,
    full_name varchar(50) not null,
    email varchar(50),
    students_address varchar(100),
    students_gender varchar(7),
    birth_date date
);

create table if not exists teachers (
    teachers_id serial primary key,
    teacher_name varchar(50) not null,
    email varchar(50) not null,
    gender varchar(7),
    teachers_expertise varchar(50) not null
);

create table if not exists subjects (
    subjects_id serial primary key,
    subjects_name varchar(50) not null
);

create table if not exists class (
    class_id serial primary key,
    class_date date,
    class_time varchar(10),
    room varchar(10),
    subjects_id serial references subjects(subjects_id),
    teachers_id serial references teachers(teachers_id)
);

create table if not exists class_in_sessions (
    sessions_id serial primary key,
    class_id serial references class(class_id),
    students_id serial references students(students_id)
);