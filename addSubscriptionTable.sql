create table subscription (
    id int unsigned primary key not null auto_increment,
    userid int unsigned NOT NULL references user(id),
    paypalSubscriptionId varchar(50) NOT NULL,
    paypalPeriod varchar(15) NOT NULL,
    subscriptionStartDate date,
    subscriptionEndDate date);
