create database assignment_submission_db;

create table assignment_submission_db._user
(
    id         bigint auto_increment
        primary key,
    email      varchar(100)                                              null,
    first_name varchar(50)                                               null,
    last_name  varchar(60)                                               null,
    password   varchar(255)                                              null,
    role       enum ('ROLE_ADMIN', 'ROLE_CODE_REVIEWER', 'ROLE_STUDENT') null
);

create table assignment_submission_db.assignment
(
    id                    bigint auto_increment
        primary key,
    branch                varchar(25)  null,
    code_review_video_url varchar(255) null,
    github_url            varchar(255) null,
    number                int          null,
    status                varchar(255) null,
    code_reviewer_id      bigint       null,
    user_id               bigint       not null,
    constraint FKbmv8df1ojl8adhphoqyvhntxw
        foreign key (code_reviewer_id) references _user (id),
    constraint FKbo0xioqrg01bdir77yx0n70a5
        foreign key (user_id) references _user (id)
);

create table assignment_submission_db.comments
(
    id            bigint auto_increment
        primary key,
    created_at    datetime(6) null,
    text          text        null,
    assignment_id bigint      null,
    user_id       bigint      null,
    constraint FKh042x715vy568v253momwgaf8
        foreign key (assignment_id) references assignment (id),
    constraint FKi5d1g4lt0mw88wnfqfexhae7e
        foreign key (user_id) references _user (id)
);