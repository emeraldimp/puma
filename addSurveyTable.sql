create table survey (
    id int unsigned primary key not null auto_increment,
    userid int unsigned NOT NULL references user(id),
    surveyDate datetime,
    surveyResult text);
