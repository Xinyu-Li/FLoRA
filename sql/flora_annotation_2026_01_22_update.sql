create table quiz_confidence_rating
(
    id          int auto_increment
        primary key,
    rating_time bigint       null,
    user_id     bigint       null,
    course_id   bigint       null,
    quiz_name   varchar(500) null,
    quiz_id     bigint       null
);

create index quiz_confidence_rating_course_id_index
    on quiz_confidence_rating (course_id);

create index quiz_confidence_rating_user_id_index
    on quiz_confidence_rating (user_id);

alter table quiz_confidence_rating
    add rating_values varchar(500) not null;


create table quiz_meta_judgements
(
    id          bigint auto_increment
        primary key,
    user_id     bigint       null,
    course_id   bigint       null,
    quiz_name   varchar(500) null,
    quiz_answer varchar(500) null
);

alter table quiz_meta_judgements
    add save_time bigint null;


create index quiz_meta_judgements_course_id_index
    on quiz_meta_judgements (course_id);

create index quiz_meta_judgements_user_id_index
    on quiz_meta_judgements (user_id);

create index trace_data_course_id_index
    on trace_data (course_id);

create index trace_data_user_id_index
    on trace_data (user_id);
