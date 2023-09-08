use smart_fridge;
select * from user;
select database();

ALTER TABLE user 
MODIFY user_no INT AUTO_INCREMENT;
drop table user;



CREATE TABLE `user` (
  `user_no` int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(50) DEFAULT NULL,
  `id` varchar(100) NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `nickname` varchar(20) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `age_range` varchar(10) DEFAULT NULL,
  `registered_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  `user_status` char(1) DEFAULT 'Y' NOT NULL,
  `user_type` varchar(5) NOT NULL DEFAULT 'u',
  `email_verification` tinyint(1) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL
);

select * from user;