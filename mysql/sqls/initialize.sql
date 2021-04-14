ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '1234'
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '1234';
flush privileges;
DROP SCHEMA IF EXISTS `survey` ;

-- -----------------------------------------------------
-- Schema survey
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `survey`;
USE `survey` ;

-- -----------------------------------------------------
-- Table `survey`.`tgi_survey`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `survey`.`tgi_survey` ;

CREATE TABLE IF NOT EXISTS `survey`.`tgi_survey` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `survey_start_time` DATETIME NOT NULL,
  `survey_complete_time` DATETIME NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `time_save_score` SMALLINT NULL DEFAULT '-1',
  `data_integrity_score` SMALLINT NULL DEFAULT '-1',
  `reflect_opnion_score` SMALLINT NULL DEFAULT '-1',
  `response_time_score` SMALLINT NULL DEFAULT '-1',
  `satisfy_score` SMALLINT NULL DEFAULT '-1',
  `user_opinion` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`))


-- -----------------------------------------------------
-- Table `survey`.`tgi_figure_comment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `survey`.`tgi_figure_comment` ;

CREATE TABLE IF NOT EXISTS `survey`.`tgi_figure_comment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `figure_name` VARCHAR(200) NULL DEFAULT NULL,
  `figure_txt` TEXT NULL DEFAULT NULL,
  `tgi_survey_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_tgi_figure_comment_tgi_survey`
    FOREIGN KEY (`tgi_survey_id`)
    REFERENCES `survey`.`tgi_survey` (`id`))
