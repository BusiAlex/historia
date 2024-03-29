﻿--
-- Script was generated by Devart dbForge Studio 2019 for MySQL, Version 8.2.23.0
-- Product home page: http://www.devart.com/dbforge/mysql/studio
-- Script date 2023. 05. 02. 12:21:17
-- Server version: 5.5.5-10.1.38-MariaDB
-- Client version: 4.1
--

-- 
-- Disable foreign keys
-- 
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;

-- 
-- Set SQL mode
-- 
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- 
-- Set character set the client will use to send SQL statements to the server
--
SET NAMES 'utf8';

DROP DATABASE IF EXISTS historia;

CREATE DATABASE IF NOT EXISTS historia
	CHARACTER SET utf8
	COLLATE utf8_hungarian_ci;

--
-- Set default database
--
USE historia;

--
-- Create table `countries`
--
CREATE TABLE IF NOT EXISTS countries (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) DEFAULT NULL,
  region VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 2778,
AVG_ROW_LENGTH = 4096,
CHARACTER SET utf8,
COLLATE utf8_hungarian_ci;

DELIMITER $$

--
-- Create procedure `historiagen`
--
CREATE DEFINER = 'root'@'localhost'
PROCEDURE historiagen()
BEGIN

DELETE
  FROM events;
DELETE
  FROM countries;
INSERT INTO countries (id, name, region)
  VALUES (1, 'Magyarország', 'Európa'),
  (2, 'Németország', 'Európa'),
  (3, 'Oroszország', 'Európa'),
  (4, 'Amerikai Egyesült Államok', 'Amerika');

SELECT
  *
FROM countries;

INSERT events (id, eventName, description, datefrom, dateTo, link, countryId)
  VALUES (1, '2. Miklós cár uralkodása', '1888-ban megkoronázzák 2. Miklós cárt, végül a kommunisták családjával együtt brutálisan kivégzik.', 1888, 1920, 'https://hu.wikipedia.org/wiki/II._Mikl%C3%B3s_orosz_c%C3%A1r', 3),
  (2, '56-os forradalom', '1956-ban kitör a forradalom, de a kommunisták leverik', 1956, 1956, 'https://hu.wikipedia.org/wiki/1956-os_forradalom', 1),
  (3, 'Nemzetiszocializmus', '1934-ben Adolf Hitler hatalomra kerül, és megkezdődik Németországban a nemzetiszocializmus kora', 1934, 1945, 'https://hu.wikipedia.org/wiki/Nemzetiszocialista_N%C3%A9metorsz%C3%A1g', 2),
  (4, 'Osztrák-Magyar Monarchia megalakulása', '1886-ban Ferenc József osztrák császárt magyar királlyá koronázzák meg megalakul a dualista állam', 1886, 1920, 'https://hu.wikipedia.org/wiki/Osztr%C3%A1k%E2%80%93Magyar_Monarchia', 1)
;
END
$$

DELIMITER ;

--
-- Create table `events`
--
CREATE TABLE IF NOT EXISTS events (
  id INT(11) NOT NULL AUTO_INCREMENT,
  eventName VARCHAR(255) DEFAULT NULL,
  description LONGTEXT DEFAULT NULL,
  link VARCHAR(255) DEFAULT NULL,
  dateFrom INT(11) DEFAULT NULL,
  dateTo INT(11) DEFAULT NULL,
  countryId INT(11) DEFAULT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 12,
AVG_ROW_LENGTH = 4096,
CHARACTER SET utf8,
COLLATE utf8_hungarian_ci;

--
-- Create foreign key
--
ALTER TABLE events 
  ADD CONSTRAINT FK_events_countries_id FOREIGN KEY (countryId)
    REFERENCES countries(id);

--
-- Create table `sources`
--
CREATE TABLE IF NOT EXISTS sources (
  id INT(11) NOT NULL AUTO_INCREMENT,
  eventid INT(11) NOT NULL,
  link VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8,
COLLATE utf8_hungarian_ci;

--
-- Create foreign key
--
ALTER TABLE sources 
  ADD CONSTRAINT FK_sources_events_id FOREIGN KEY (eventid)
    REFERENCES events(id);

--
-- Create table `users`
--
CREATE TABLE IF NOT EXISTS users (
  id INT(11) NOT NULL AUTO_INCREMENT,
  firstName VARCHAR(255) DEFAULT NULL,
  lastName VARCHAR(255) DEFAULT NULL,
  gender VARCHAR(255) DEFAULT NULL,
  userName VARCHAR(255) DEFAULT NULL,
  email VARCHAR(50) DEFAULT NULL,
  password VARCHAR(255) DEFAULT NULL,
  number INT(11) DEFAULT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 2,
CHARACTER SET utf8,
COLLATE utf8_hungarian_ci;

-- 
-- Dumping data for table countries
--
INSERT INTO countries VALUES
(1, 'Magyarország', 'Európa'),
(2, 'Németország', 'Európa'),
(3, 'Oroszország', 'Európa'),
(4, 'Amerikai Egyesült Államok', 'Amerika');

-- 
-- Dumping data for table events
--
INSERT INTO events VALUES
(1, '2. Miklós cár uralkodása', '1888-ban megkoronázzák 2. Miklós cárt, végül a kommunisták családjával együtt brutálisan kivégzik.', 'https://hu.wikipedia.org/wiki/II._Mikl%C3%B3s_orosz_c%C3%A1r', 1888, 1920, 3),
(2, '56-os forradalom', '1956-ban kitör a forradalom, de a kommunisták leverik', 'https://hu.wikipedia.org/wiki/1956-os_forradalom', 1956, 1956, 1),
(3, 'Nemzetiszocializmus', '1934-ben Adolf Hitler hatalomra kerül, és megkezdődik Németországban a nemzetiszocializmus kora', 'https://hu.wikipedia.org/wiki/Nemzetiszocialista_N%C3%A9metorsz%C3%A1g', 1934, 1945, 2),
(4, 'Osztrák-Magyar Monarchia megalakulása', '1886-ban Ferenc József osztrák császárt magyar királlyá koronázzák meg megalakul a dualista állam', 'https://hu.wikipedia.org/wiki/Osztr%C3%A1k%E2%80%93Magyar_Monarchia', 1886, 1920, 1);

-- 
-- Dumping data for table users
--
INSERT INTO users VALUES
(1, 'Vati', 'Arnold', 'férfi', 'vatiarnold', 'vatiarnold@gmail.com', '$2b$10$mwImEZl393Ty.moOlyqR3OmW4Hx7/yTLWP7qYhEmU3T5vRiekcTUa', 33333333);

-- 
-- Dumping data for table sources
--
-- Table historia.sources does not contain any data (it is empty)

-- 
-- Restore previous SQL mode
-- 
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;

-- 
-- Enable foreign keys
-- 
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;