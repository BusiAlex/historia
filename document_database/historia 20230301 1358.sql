--
-- Script was generated by Devart dbForge Studio 2019 for MySQL, Version 8.2.23.0
-- Product home page: http://www.devart.com/dbforge/mysql/studio
-- Script date 2023. 03. 01. 13:58:16
-- Server version: 5.5.5-10.4.21-MariaDB
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
CHARACTER SET utf8,
COLLATE utf8_hungarian_ci;

--
-- Create table `events`
--
CREATE TABLE IF NOT EXISTS events (
  id INT(11) NOT NULL AUTO_INCREMENT,
  eventName VARCHAR(255) DEFAULT NULL,
  description LONGTEXT DEFAULT NULL,
  dateFrom DATE DEFAULT NULL,
  dateTo DATE DEFAULT NULL,
  countryId INT(11) DEFAULT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
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
CHARACTER SET utf8,
COLLATE utf8_hungarian_ci;

-- 
-- Dumping data for table countries
--
-- Table historia.countries does not contain any data (it is empty)

-- 
-- Dumping data for table events
--
-- Table historia.events does not contain any data (it is empty)

-- 
-- Dumping data for table users
--
-- Table historia.users does not contain any data (it is empty)

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