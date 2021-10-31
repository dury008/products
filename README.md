# 제품 판매 웹페이지 (Vue.js, node.js, mariaDB, bootstrap)
> vue.js 로 구현한 간단한 제품판매 웹페이지 입니다


## 설치 방법
1. mariadb설치후 dev 데이터베이스 생성
2. 테이블생성
```sh
CREATE TABLE `t_category` (
	`id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`category1` VARCHAR(100) NOT NULL COLLATE 'utf8_general_ci',
	`category2` VARCHAR(100) NOT NULL COLLATE 'utf8_general_ci',
	`category3` VARCHAR(100) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=7
;
```
```sh
CREATE TABLE `t_seller` (
	`id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(100) NOT NULL COLLATE 'utf8_general_ci',
	`email` VARCHAR(100) NOT NULL COLLATE 'utf8_general_ci',
	`phone` VARCHAR(20) NOT NULL COLLATE 'utf8_general_ci',
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=3
;
```

```sh
CREATE TABLE `t_user` (
	`email` VARCHAR(50) NOT NULL COLLATE 'utf8_general_ci',
	`type` INT(1) NOT NULL DEFAULT '1' COMMENT '1-buyer , 2-seller',
	`nickname` VARCHAR(50) NOT NULL COLLATE 'utf8_general_ci',
	PRIMARY KEY (`email`) USING BTREE
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;
```

```sh
CREATE TABLE `t_product` (
	`id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`product_name` VARCHAR(200) NOT NULL COLLATE 'utf8_general_ci',
	`product_price` INT(11) NOT NULL DEFAULT '0',
	`delivery_price` INT(11) NOT NULL DEFAULT '0',
	`add_delivery_price` INT(11) NOT NULL DEFAULT '0',
	`tags` VARCHAR(100) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`outbound_days` INT(2) NOT NULL DEFAULT '5',
	`active_yn` ENUM('Y','N') NOT NULL DEFAULT 'Y' COLLATE 'utf8_general_ci',
	`seller_id` INT(11) UNSIGNED NOT NULL,
	`category_id` INT(11) UNSIGNED NOT NULL,
	`created_date` DATETIME NOT NULL DEFAULT current_timestamp(),
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `FK_t_product_t_seller` (`seller_id`) USING BTREE,
	INDEX `FK_t_product_t_category` (`category_id`) USING BTREE,
	CONSTRAINT `FK_t_product_t_category` FOREIGN KEY (`category_id`) REFERENCES `dev`.`t_category` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT `FK_t_product_t_seller` FOREIGN KEY (`seller_id`) REFERENCES `dev`.`t_seller` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=12
;

```

```sh
CREATE TABLE `t_image` (
	`id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`product_id` INT(11) UNSIGNED NOT NULL,
	`type` INT(1) NOT NULL DEFAULT '1' COMMENT '1-썸네일, 2-제품이미지,3-제품설명이미지',
	`path` VARCHAR(150) NOT NULL COLLATE 'utf8_general_ci',
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `FK__t_product` (`product_id`) USING BTREE,
	CONSTRAINT `FK__t_product` FOREIGN KEY (`product_id`) REFERENCES `dev`.`t_product` (`id`) ON UPDATE NO ACTION ON DELETE CASCADE
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=52
;
```

```sh
INSERT INTO `t_category` (`id`, `category1`, `category2`, `category3`) VALUES (1, '전자제품', '컴퓨터', '악세서리');
INSERT INTO `t_category` (`id`, `category1`, `category2`, `category3`) VALUES (2, '전자제품', '컴퓨터', '노트북');
INSERT INTO `t_category` (`id`, `category1`, `category2`, `category3`) VALUES (3, '전자제품', '컴퓨터', '조립식');
INSERT INTO `t_category` (`id`, `category1`, `category2`, `category3`) VALUES (4, '전자제품', '가전제품', '텔레비젼');
INSERT INTO `t_category` (`id`, `category1`, `category2`, `category3`) VALUES (5, '전자제품', '가전제품', '냉장고');
INSERT INTO `t_category` (`id`, `category1`, `category2`, `category3`) VALUES (6, '생필품', '주방용품', '조리도구');
```
3. /server/app.js db연결정보 설정
```sh
const db = {
    database: "dev",
    connectionLimit: 10,
    host: "db주소",
    user: "접속아이디",
    password: "접속비밀번호"
}; 
```
4. /server 에서 npm install -> node app.js
5. /client 에서 npm install -> npm run serve

ec2배포 ->  http://ec2-3-37-189-231.ap-northeast-2.compute.amazonaws.com:8080
### 참조 
-> https://www.youtube.com/watch?v=J2lLkpc79n0&list=PLqbWuGdVBJd1TzOA-ozYSlYRQio1F5t02
