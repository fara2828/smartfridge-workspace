CREATE DATABASE  IF NOT EXISTS `smart_fridge` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `smart_fridge`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: smart_fridge
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `CATEGORY` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `file`
--

DROP TABLE IF EXISTS `file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `file` (
  `FILE_NO` int NOT NULL,
  `ORIGIN_NAME` varchar(100) DEFAULT NULL,
  `CHANGE_NAME` varchar(100) DEFAULT NULL,
  `UPLOAD_DATE` date DEFAULT NULL,
  `STATUS` char(1) DEFAULT 'Y',
  PRIMARY KEY (`FILE_NO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `file`
--

LOCK TABLES `file` WRITE;
/*!40000 ALTER TABLE `file` DISABLE KEYS */;
/*!40000 ALTER TABLE `file` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fridge`
--

DROP TABLE IF EXISTS `fridge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fridge` (
  `FRIDGE_NO` varchar(255) NOT NULL,
  `MEMBER_NO` int NOT NULL COMMENT 'SEQUENCE',
  `FRIDGE_NAME` varchar(30) NOT NULL COMMENT '회원번호+냉장고명 복합키(UNIQUE)',
  `STATUS` int DEFAULT NULL,
  PRIMARY KEY (`FRIDGE_NO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fridge`
--

LOCK TABLES `fridge` WRITE;
/*!40000 ALTER TABLE `fridge` DISABLE KEYS */;
/*!40000 ALTER TABLE `fridge` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item` (
  `ITME_NAME` varchar(100) NOT NULL,
  `BARCODE` int DEFAULT NULL,
  `PRICE` varchar(30) DEFAULT NULL,
  `CONDITION` varchar(20) NOT NULL COMMENT 'FRIDGE / FREEZER / ROOM',
  `EXP_DATE` date NOT NULL COMMENT '제품명+유통기한: 복합키 (UNIQUE)[',
  `MEMO` varchar(20) DEFAULT NULL,
  `ITEM_PHOTO` varchar(50) DEFAULT NULL,
  `ENROLL_DATE` date DEFAULT NULL,
  `STATUS` char(1) DEFAULT 'Y',
  `INT` float NOT NULL,
  `ITEM_CATEGORY` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item_photo`
--

DROP TABLE IF EXISTS `item_photo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item_photo` (
  `FILE_NO` int NOT NULL,
  `ITME_NAME` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_photo`
--

LOCK TABLES `item_photo` WRITE;
/*!40000 ALTER TABLE `item_photo` DISABLE KEYS */;
/*!40000 ALTER TABLE `item_photo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `my_recipe`
--

DROP TABLE IF EXISTS `my_recipe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `my_recipe` (
  `RECIPE_NO` int NOT NULL,
  `MEM_NO` int NOT NULL,
  `FARM_NAME` varchar(30) NOT NULL,
  `LOCAL_CODE` varchar(20) DEFAULT NULL,
  `ADDRESS` varchar(100) NOT NULL,
  `PHONE` varchar(20) NOT NULL,
  `ENROLL_DATE` date DEFAULT NULL,
  `STATUS` char(1) DEFAULT 'Y' COMMENT '농장삭제여부',
  `FARM_IMAGE` varchar(50) DEFAULT NULL,
  `CROP` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`RECIPE_NO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `my_recipe`
--

LOCK TABLES `my_recipe` WRITE;
/*!40000 ALTER TABLE `my_recipe` DISABLE KEYS */;
/*!40000 ALTER TABLE `my_recipe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_no` varchar(100) NOT NULL,
  `ID` varchar(20) NOT NULL,
  `NAME` varchar(20) DEFAULT NULL,
  `NICKNAME` varchar(20) DEFAULT NULL,
  `PHONE` varchar(20) DEFAULT NULL,
  `GENDER` char(1) DEFAULT NULL,
  `EMAIL` varchar(50) DEFAULT NULL,
  `ENROLL_DATE` date DEFAULT NULL,
  `MEMBER_STATUS` char(1) DEFAULT 'Y',
  `USER_TYPE` varchar(5) NOT NULL DEFAULT 'U',
  `verified_email` tinyint(1) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-06 23:04:27
-------------------------------------------------------------
대응되는 model들
const { Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize(/* your config here */);

// Category Model
class Category extends Model {}
Category.init({
  CATEGORY: {
    type: DataTypes.STRING(20),
    primaryKey: true
  },
}, {
  sequelize,
  modelName: 'Category',
  tableName: 'category',
  timestamps: false,
});

// File Model
class File extends Model {}
File.init({
  FILE_NO: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  ORIGIN_NAME: DataTypes.STRING(100),
  CHANGE_NAME: DataTypes.STRING(100),
  UPLOAD_DATE: DataTypes.DATE,
  STATUS: DataTypes.CHAR(1),
}, {
  sequelize,
  modelName: 'File',
  tableName: 'file',
  timestamps: false,
});

// Fridge Model
class Fridge extends Model {}
Fridge.init({
  FRIDGE_NO: {
    type: DataTypes.STRING(255),
    primaryKey: true
  },
  MEMBER_NO: DataTypes.INTEGER,
  FRIDGE_NAME: DataTypes.STRING(30),
  STATUS: DataTypes.INTEGER,
}, {
  sequelize,
  modelName: 'Fridge',
  tableName: 'fridge',
  timestamps: false,
});

// Item Model
class Item extends Model {}
Item.init({
  ITEM_NAME: {
    type: DataTypes.STRING(100),
    primaryKey: true
  },
  BARCODE: DataTypes.INTEGER,
  PRICE: DataTypes.STRING(30),
  CONDITION: DataTypes.STRING(20),
  EXP_DATE: DataTypes.DATE,
  MEMO: DataTypes.STRING(20),
  ITEM_PHOTO: DataTypes.STRING(50),
  ENROLL_DATE: DataTypes.DATE,
  STATUS: DataTypes.CHAR(1),
  INT: DataTypes.FLOAT,
  ITEM_CATEGORY: DataTypes.STRING(20),
}, {
  sequelize,
  modelName: 'Item',
  tableName: 'item',
  timestamps: false,
});

// ItemPhoto Model
class ItemPhoto extends Model {}
ItemPhoto.init({
  FILE_NO: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  ITEM_NAME: DataTypes.STRING(100),
}, {
  sequelize,
  modelName: 'ItemPhoto',
  tableName: 'item_photo',
  timestamps: false,
});

// MyRecipe Model
class MyRecipe extends Model {}
MyRecipe.init({
  RECIPE_NO: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  MEM_NO: DataTypes.INTEGER,
  FARM_NAME: DataTypes.STRING(30),
  LOCAL_CODE: DataTypes.STRING(20),
  ADDRESS: DataTypes.STRING(100),
  PHONE: DataTypes.STRING(20),
  ENROLL_DATE: DataTypes.DATE,
  STATUS: DataTypes.CHAR(1),
  FARM_IMAGE: DataTypes.STRING(50),
  CROP: DataTypes.STRING(30),
}, {
  sequelize,
  modelName: 'MyRecipe',
  tableName: 'my_recipe',
  timestamps: false,
});

// User Model
class User extends Model {}
User.init({
  user_no: {
    type: DataTypes.STRING(100),
    primaryKey: true
  },
  ID: DataTypes.STRING(20),
  NAME: DataTypes.STRING(20),
  NICKNAME: DataTypes.STRING(20),
  PHONE: DataTypes.STRING(20),
  GENDER: DataTypes.CHAR(1),
  EMAIL: DataTypes.STRING(50),
  ENROLL_DATE: DataTypes.DATE,
  MEMBER_STATUS: DataTypes.CHAR(1),
  USER_TYPE: DataTypes.STRING(5),
  verified_email: DataTypes.TINYINT,
  picture: DataTypes.STRING(255),
}, {
  sequelize,
  modelName: 'User',
  tableName: 'user',
  timestamps: false,
});
