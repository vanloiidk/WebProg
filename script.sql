use webDesign;

create table semesters(
	semester_id varchar(6) primary key,
    semester_name varchar(30)
);
#drop table semesters;

insert into semesters values("s1","first semester");
insert into semesters values("s2","second semester");
insert into semesters values("s3","summer semester");

create table branchs(
	branch_id varchar(6) primary key,
    branch_name varchar(50) not null,
    branch_description text
);
#drop table branchs;

insert into branchs values("cse","Computer Science and Engineering","");
insert into branchs values("ee","Electrical and Electronic Engineering","");

create table classes(
	class_id varchar(6) primary key,
    class_name varchar(30) not null,
    class_year int(4) not null,
    teacher_id varchar(6) references teachers(teacher_id) on update cascade on delete no action,
    branch_id varchar(3) references branchs(branch_id) on update cascade on delete no action,
    semester_id varchar(2) references semesters(semester_id) on update cascade on delete no action,
    class_strength int(10),
    class_code varchar(10)
);
#drop table classes;

insert into classes values("A0001","cse A1",2016,"gv01","cse","s1",70,"");
insert into classes values("A0002","cse A2",2016,"gv02","ee","s1",70,"");


create table teachers(
	teacher_id varchar(6) primary key,
    teacher_name varchar(30),
    teacher_gmail varchar(30),
    teacher_password varchar(20)
);
insert into teachers values("gv01","Pham Nguyen Khang","pnk@gmail.com","1234");
insert into teachers values("gv02","Pham The Phi","ptp@gmail.com","1234");

#drop table teachers ;

create table students(
	student_id varchar(6) primary key,
    student_name varchar(30),
    student_gmail varchar(30),
    student_password varchar(20),
    class_id varchar(6) references classes(class_id) on update cascade on delete no action
);
#drop table students;
insert into students values("sv01","Nguyen Van Loi","vanloiidk@gmail.com","1234","A0001");
insert into students values("sv02","Tran Minh Khang","tmk@gmail.com","1234","A002");
insert into students values("sv03","Nguyen Van Tan","nvt@gmail.com","1234","A0001");
insert into students values("sv04","Nguyen Hoai Nam","nhn@gmail.com","1234","A0001");
insert into students values("sv05","Nguyen Van Loi","vanloiidk@gmail.com","1234",null);
insert into students values("sv06","Nguyen Van Loi","vanloiidk@gmail.com","1234",null);
insert into students values("sv07","Nguyen Van Loi","vanloiidk@gmail.com","1234",null);

#SELECT student_id,student_name,student_gmail FROM students WHERE student_id LIKE '%%' AND student_name LIKE '%Ngu%' AND student_gmail LIKE '%%' AND isnull(class_id);




create table subjects(
	subject_id varchar(6) primary key,
    subject_name varchar(30)
);
#select subject_id from subjects where subject_name = "toan";
#drop table subjects
#select * from subjects;
insert into subjects values("t01","toan");
insert into subjects values("v01","van");


create table sections(
	section_id varchar(6) primary key,
    day_id integer(6) references days(day_id) on update cascade on delete no action,
    time_id integer(6) references times(time_id) on update cascade on delete no action
);

#drop table sections;

insert into sections values("mom",2,1);
insert into sections values("mof",2,2);
insert into sections values("tum",3,1);
insert into sections values("tuf",3,2);
insert into sections values("wem",4,1);
insert into sections values("wef",4,2);
insert into sections values("thm",5,1);
insert into sections values("thf",5,2);
insert into sections values("frm",6,1);
insert into sections values("frf",6,2);
insert into sections values("sam",7,1);
insert into sections values("saf",7,2);
insert into sections values("sum",0,1);
insert into sections values("suf",0,2);

create table days(
	day_id integer(6) primary key,
    day_name varchar(30)
);
#drop table days;

insert into days values(2,"monday");
insert into days values(3,"tuesday");
insert into days values(4,"thursday");
insert into days values(5,"wednesday");
insert into days values(6,"friday");
insert into days values(7,"saturday");
insert into days values(0,"sunday");

create table times(
	time_id integer(6) primary key,
    time_name varchar(20)
);
#drop table times;
insert into times values(1,"morning");
insert into times values(2,"afternoon");
insert into times values(3,"evening");

create table schedules(
	schedule_id varchar(6) primary key,
    subject_id varchar(6) references subjects(subject_id) on update cascade on delete no action,
    day_id integer(6) references days(day_id) on update cascade on delete no action,
    time_id integer(6) references times(time_id) on update cascade on delete no action,
    class_id varchar(6) references classes(class_id) on update cascade on delete no action
);
#drop table schedules;
#SELECT schedule_id FROM schedules ORDER BY schedule_id DESC LIMIT 1;
#select * from schedules order by schedule_id desc;
#delete from schedules where schedule_id = "sch05";

insert into schedules values("sch01","v01",2,1,"A0001");
insert into schedules values("sch02","v01",2,1,"A0002");
insert into schedules values("sch03","t01",3,1,"A0001");
insert into schedules values("sch04","t01",3,2,"A0002");


create table attendances(
	attendance_id varchar(6) primary key,
    student_id varchar(6) references students(student_id) on update cascade on delete no action,
    schedule_id varchar(6) references schedules(schedule_id) on update cascade on delete no action,
    attendance_date date
);


#drop table attendances;
insert into attendances values("atd001","sv01","sch01","1997-12-10");
insert into attendances values("atd002","sv01","sch01","1997-12-15");
insert into attendances values("atd003","sv01","sch01","1997-12-20");
insert into attendances values("atd004","sv02","sch01","1997-12-20");
insert into attendances values("atd005","sv01","sch02","1997-12-20");
insert into attendances values("atd006","sv03","sch02","1997-12-20");
insert into attendances values("atd007","sv04","sch02","1997-12-20");
insert into attendances values("atd008","sv04","sch03","1997-12-20");




delimiter //
create procedure getCount(in var_class_id varchar(6), var_mydate date)
	begin
		create table table1 as select att.attendance_id, att.student_id, att.schedule_id, att.attendance_date, sch.time_id from attendances as att join schedules as sch on att.schedule_id=sch.schedule_id where att.schedule_id in (select schedule_id from schedules where class_id = var_class_id);
		select count(attendance_id) as numberCol,attendance_date, time_id from table1 where attendance_date = var_mydate group by attendance_date, time_id;
        drop table table1;
    end//
delimiter ;



#select * from students;
#function
#update schedules set class_id="A0001" where schedule_id = "sch01";
#delete from students where student_id = gsdfsfs;
#update students set class_id="A0001" where student_id="sv04";
#select schedule_id,subject_name,day_id,time_id from schedules as s join subjects as su on s.subject_id=su.subject_id where s.class_id="A0001";
#SELECT schedule_id,s.subject_id,subject_name,day_id,time_id FROM schedules AS s JOIN subjects as su on s.subject_id=su.subject_id WHERE s.class_id="A0001";
#UPDATE schedules SET subject_id="t01", day_id=2,time_id=3 WHERE schedule_id="sch04";

#select count(*) from schedules where day_id<4 and day_id>0 and class_id = "A0001";











