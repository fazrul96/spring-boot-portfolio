CREATE TABLE `webtoons` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `alias` varchar(255) DEFAULT NULL,
  `artist` varchar(255) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `banner_image` varchar(255) DEFAULT NULL,
  `chapter_count` int(11) DEFAULT NULL,
  `cover_image` varchar(255) DEFAULT NULL,
  `created_date` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `genre` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `rating` double DEFAULT NULL,
  `source` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `updated_date` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE webtoon_suffixes (
    id bigint(20) NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) UNIQUE NOT NULL,
    suffix VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE webtoon_chapters (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    chapter INT,
    status VARCHAR(50), -- "PENDING", "IN_PROGRESS", "COMPLETED", or "FAILED"
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);