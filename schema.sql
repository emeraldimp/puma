set foreign_key_checks = 0;
drop table if exists entry;
drop table if exists module_versions;

drop table if exists page;
create table page (
    id int unsigned primary key not null auto_increment,
    parent int unsigned references page(id),
    position double default 0, 
    title varchar(255) NOT NULL,
    current_version int unsigned,
    read_perm tinyint default 3,
    write_perm tinyint not null default 2,
    page_type varchar(255) not null default "html"
) ENGINE=InnoDB COMMENT='Primary place-holder for pages. Other fields, such as the name of this page, its contents, and its permissions, are versioned.';

drop table if exists user;
CREATE TABLE user (
  id int(10) unsigned primary key NOT NULL auto_increment,
  name varchar(255) unique NOT NULL,
  password char(40) NOT NULL comment 'One way hash by SHA-1 for security',
  permission tinyint(3) unsigned NOT NULL default '2' comment '0 admin, 1 power user, 2 user, 3 anonymous',
    preferences tinytext not null comment "A serialized PHP array of preferences",
  email varchar(255) NOT NULL,
  validated smallint(5) unsigned NOT NULL default '1' comment 'really a boolean, indicates whether registration was completed',
  confirmation int(10) unsigned NOT NULL default '0' comment 'confirmation key generated during registration'
) ENGINE=InnoDB COMMENT='User information';

insert into user (name, password, permission)
       values ('admin', sha1('password'), 0),
              ('anonymous', '', 3);
update user set id=0 where name='anonymous';

drop table if exists resource;
CREATE TABLE resource (
  id int(10) unsigned primary key NOT NULL auto_increment,
  nickname varchar(32) NOT NULL comment "the short name given by the user on upload",
  filename varchar(255) NOT NULL comment "the file's original name useful for setting the download file name suggestion",
  page int(10) unsigned NOT NULL comment 'which page is this resource attached to' references page (id),
  date timestamp NOT NULL,
  description tinytext NOT NULL,
  data longblob NOT NULL,
  owner int(10) unsigned NOT NULL references user (id),
  mime varchar(32) NOT NULL comment 'mime type as reported by php upload info'
) ENGINE=InnoDB COMMENT='Binary resource attachments';

drop table if exists version;
CREATE TABLE version (
  id int(10) unsigned primary key NOT NULL auto_increment,
  page int unsigned NOT NULL references page (id),
  user int unsigned NOT NULL comment "who edited the page" references user (id),
  time timestamp NOT NULL,
  content text NOT NULL
) ENGINE=InnoDB COMMENT='For archiving page versions';
set foreign_key_checks = 1;

insert into page (parent, title) values (NULL, "Home Page");
insert into version (page, user, content) values (1, 1, "");
update page set current_version = 1;

