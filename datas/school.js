var sql = `create table if not exists students (
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

insert into students (full_name, email, students_address, students_gender, birth_date) values ('Kandace Gueste', 'kgueste0@go.com', '0168 Leroy Parkway', 'Female', '18/03/1991');
insert into students (full_name, email, students_address, students_gender, birth_date) values ('Heriberto Train', 'htrain1@nsw.gov.au', '438 Stuart Crossing', 'Male', '23/01/1998');
insert into students (full_name, email, students_address, students_gender, birth_date) values ('Sim Elvy', 'selvy2@amazon.de', '1 Declaration Avenue', 'Male', '31/03/1999');
insert into students (full_name, email, students_address, students_gender, birth_date) values ('Anatole Wixey', 'awixey3@stanford.edu', '7 Coolidge Lane', 'Male', '06/06/1998');
insert into students (full_name, email, students_address, students_gender, birth_date) values ('Catharina Cradoc', 'ccradoc4@mysql.com', '62066 Vermont Junction', 'Female', '10/07/1992');
insert into students (full_name, email, students_address, students_gender, birth_date) values ('Rudd Pascho', 'rpascho5@de.vu', '5 Dapin Alley', 'Male', '22/08/1999');
insert into students (full_name, email, students_address, students_gender, birth_date) values ('Carlita Deneve', 'cdeneve6@examiner.com', '788 Eagle Crest Parkway', 'Female', '10/09/1990');
insert into students (full_name, email, students_address, students_gender, birth_date) values ('Katine Zipsell', 'kzipsell7@tripod.com', '744 Pearson Center', 'Female', '29/04/1999');
insert into students (full_name, email, students_address, students_gender, birth_date) values ('Jake Rossiter', 'jrossiter8@geocities.com', '82 Clove Lane', 'Male', '31/10/1992');
insert into students (full_name, email, students_address, students_gender, birth_date) values ('Cy Dermot', 'cdermot9@mtv.com', '62543 Everett Park', 'Male', '15/01/1994');
insert into students (full_name, email, students_address, students_gender, birth_date) values ('Shelden Powner', 'spownera@unc.edu', '328 Northview Drive', 'Male', '23/04/1997');
insert into students (full_name, email, students_address, students_gender, birth_date) values ('Toddy Glacken', 'tglackenb@eventbrite.com', '705 Grover Way', 'Male', '31/05/1999');
insert into students (full_name, email, students_address, students_gender, birth_date) values ('Wendi Neenan', 'wneenanc@yale.edu', '27899 Cherokee Circle', 'Female', '09/05/1993');
insert into students (full_name, email, students_address, students_gender, birth_date) values ('Alard Munehay', 'amunehayd@bloglovin.com', '437 Bartillon Drive', 'Male', '15/11/1992');
insert into students (full_name, email, students_address, students_gender, birth_date) values ('Kylynn Johannesson', 'kjohannessone@salon.com', '17 Westerfield Pass', 'Female', '11/12/1990');
insert into students (full_name, email, students_address, students_gender, birth_date) values ('Curran Liggins', 'cligginsf@usnews.com', '5 Moland Point', 'Male', '01/05/1994');
insert into students (full_name, email, students_address, students_gender, birth_date) values ('Corina Deplacido', 'cdeplacidog@pinterest.com', '33 Marcy Court', 'Female', '03/08/1995');
insert into students (full_name, email, students_address, students_gender, birth_date) values ('Sonja Shevlane', 'sshevlaneh@ed.gov', '6536 Ryan Circle', 'Female', '26/09/1990');
insert into students (full_name, email, students_address, students_gender, birth_date) values ('Mirilla Sappson', 'msappsoni@columbia.edu', '93 Twin Pines Parkway', 'Female', '04/08/1996');
insert into students (full_name, email, students_address, students_gender, birth_date) values ('Annamarie Scipsey', 'ascipseyj@spiegel.de', '7730 Melby Parkway', 'Female', '18/08/1995');

insert into teachers (teacher_name, email, gender, teachers_expertise) values ('Weidar Deedes', 'wdeedes0@usatoday.com', 'Male', 'Zathin');
insert into teachers (teacher_name, email, gender, teachers_expertise) values ('Pen Cerman', 'pcerman1@about.me', 'Female', 'Cookley');
insert into teachers (teacher_name, email, gender, teachers_expertise) values ('Franky Sames', 'fsames2@multiply.com', 'Female', 'Transcof');
insert into teachers (teacher_name, email, gender, teachers_expertise) values ('Dale Barensky', 'dbarensky3@addthis.com', 'Male', 'Aerified');
insert into teachers (teacher_name, email, gender, teachers_expertise) values ('Cleo Welham', 'cwelham4@vinaora.com', 'Female', 'Rank');
insert into teachers (teacher_name, email, gender, teachers_expertise) values ('Leigh Pyson', 'lpyson5@oaic.gov.au', 'Male', 'Tin');
insert into teachers (teacher_name, email, gender, teachers_expertise) values ('Katee Byrnes', 'kbyrnes6@toplist.cz', 'Female', 'Biodex');
insert into teachers (teacher_name, email, gender, teachers_expertise) values ('Lyndell Pool', 'lpool7@shop-pro.jp', 'Female', 'Stim');
insert into teachers (teacher_name, email, gender, teachers_expertise) values ('Leona Wardrop', 'lwardrop8@deliciousdays.com', 'Female', 'Vagram');
insert into teachers (teacher_name, email, gender, teachers_expertise) values ('Kathye Camock', 'kcamock9@about.com', 'Female', 'Lotlux');
insert into teachers (teacher_name, email, gender, teachers_expertise) values ('Shermie Threlfall', 'sthrelfalla@goo.gl', 'Male', 'Greenlam');
insert into teachers (teacher_name, email, gender, teachers_expertise) values ('Ingra Fodden', 'ifoddenb@huffingtonpost.com', 'Male', 'Tin');
insert into teachers (teacher_name, email, gender, teachers_expertise) values ('Millard Cheater', 'mcheaterc@csmonitor.com', 'Male', 'Y-find');
insert into teachers (teacher_name, email, gender, teachers_expertise) values ('Sissie Addlestone', 'saddlestoned@bloomberg.com', 'Female', 'Subin');
insert into teachers (teacher_name, email, gender, teachers_expertise) values ('Evangelia Crandon', 'ecrandone@illinois.edu', 'Female', 'Sonsing');
insert into teachers (teacher_name, email, gender, teachers_expertise) values ('Yovonnda Bewshea', 'ybewsheaf@exblog.jp', 'Female', 'Duobam');
insert into teachers (teacher_name, email, gender, teachers_expertise) values ('Augustine Dwelley', 'adwelleyg@hostgator.com', 'Female', 'Prodder');
insert into teachers (teacher_name, email, gender, teachers_expertise) values ('Tersina Neasam', 'tneasamh@jimdo.com', 'Female', 'Matsoft');
insert into teachers (teacher_name, email, gender, teachers_expertise) values ('Erminie Bubbings', 'ebubbingsi@csmonitor.com', 'Female', 'Quo Lux');
insert into teachers (teacher_name, email, gender, teachers_expertise) values ('Kyrstin Rusling', 'kruslingj@chron.com', 'Female', 'Cardify');

insert into subjects (subjects_name) values ('Javascript Basic');
insert into subjects (subjects_name) values ('SQL - How To');
insert into subjects (subjects_name) values ('Deep Learning');
insert into subjects (subjects_name) values ('Optimizing Varnish Cache');
insert into subjects (subjects_name) values ('Javascript - Modular Function');
insert into subjects (subjects_name) values ('Go Lang');
insert into subjects (subjects_name) values ('How To Java');
insert into subjects (subjects_name) values ('HTML5 & CSS3');
insert into subjects (subjects_name) values ('Bootstraping');
insert into subjects (subjects_name) values ('Snake with C++');
insert into subjects (subjects_name) values ('ORM - Sequelize');
insert into subjects (subjects_name) values ('Understanding Javascript Promise');
insert into subjects (subjects_name) values ('Using JS Framework');
insert into subjects (subjects_name) values ('How To Express');
insert into subjects (subjects_name) values ('Intro - Postgres');
insert into subjects (subjects_name) values ('Intro - MySQL');
insert into subjects (subjects_name) values ('Intro - MongoDB');
insert into subjects (subjects_name) values ('Optimizing Database');
insert into subjects (subjects_name) values ('Final Project');
insert into subjects (subjects_name) values ('Digital Marketing');`;

module.exports = sql;