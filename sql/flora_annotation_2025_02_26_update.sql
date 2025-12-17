use flora_annotation;
alter table user_chatgpt_log add hidden varchar(255) default '0' ;
alter table user_chatgpt_log add question_version int default 0 null ;
alter table user_chatgpt_topic add thread_showing varchar(255) default 'newTopic';
alter table user_chatgpt_topic  add course_id varchar(255) default '0';