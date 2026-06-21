create table dialogue_fairness_label
(
    id                 bigint auto_increment
        primary key,
    user_id            bigint        not null,
    course_id          varchar(255)  not null,
    dialogue_text      longtext      not null,
    justification_text longtext      not null,
    deleted            int default 0 not null
);

create index dialogue_fairness_label_user_id_course_id_index
    on dialogue_fairness_label (user_id, course_id);

