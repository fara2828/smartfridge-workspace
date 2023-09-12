select * from user;

drop table fridge;
CREATE TABLE fridge (
    fridge_no INT AUTO_INCREMENT,
    user_no INT,
    fridge_name VARCHAR(100),
    status CHAR(1) DEFAULT 'y',
    PRIMARY KEY (fridge_no),
    FOREIGN KEY (user_no) REFERENCES user(user_no)
);

select * from item;
drop table item;
create table `item` (
  `item_no` int auto_increment,	
  `user_no` int,
  `item_name` varchar(100) not null,
  `barcode` int default null,
  `price` varchar(30) default null,
  `condition` varchar(20) not null comment 'fridge / freezer / room',
  `exp_date` date not null comment '제품명+유통기한: 복합키 (unique)',
  `memo` varchar(20) default null,
  `item_photo` varchar(50) default null,
  `enroll_date` date default null,
  `status` char(1) default 'y',
  `item_category` varchar(20) not null,
  primary key (`item_no`),   
  foreign key (`user_no`) references `user`(`user_no`)
);


select * from fridge 
join user 
on (fridge.user_no = user.user_no); 
