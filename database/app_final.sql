-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2023-12-18 04:47:21
-- 伺服器版本： 10.4.32-MariaDB
-- PHP 版本： 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `app_final`
--

-- --------------------------------------------------------

--
-- 資料表結構 `carts`
--

CREATE TABLE `carts` (
  `index` int(11) NOT NULL,
  `user_id` int(10) NOT NULL,
  `cart_id` int(10) NOT NULL,
  `goods_id` int(10) NOT NULL,
  `num` int(2) NOT NULL,
  `pay_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- 傾印資料表的資料 `carts`
--

INSERT INTO `carts` (`index`, `user_id`, `cart_id`, `goods_id`, `num`, `pay_date`) VALUES
(1, 1, 1, 10, 1, '2023-12-17'),
(2, 1, 2, 3, 1, NULL),
(3, 1, 2, 6, 1, NULL),
(7, 1, 2, 2, 1, NULL);

-- --------------------------------------------------------

--
-- 資料表結構 `goods`
--

CREATE TABLE `goods` (
  `goods_id` int(10) NOT NULL,
  `goods_name` text NOT NULL,
  `goods_text` text DEFAULT NULL,
  `price` int(10) NOT NULL,
  `image` text DEFAULT NULL,
  `o_level` int(1) NOT NULL,
  `enable` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- 傾印資料表的資料 `goods`
--

INSERT INTO `goods` (`goods_id`, `goods_name`, `goods_text`, `price`, `image`, `o_level`, `enable`) VALUES
(1, 'desserts 1', 'desserts', 100, '1.jpg', 2, 1),
(2, 'desserts 2', 'dessertsdesserts', 200, '2.jpg', 3, 1),
(3, 'desserts 3', 'dessertsdessertsdesserts', 300, '3.jpg', 4, 1),
(4, 'desserts 4', 'dessertsdessertsdessertsdesserts', 400, '4.jpg', 1, 1),
(5, 'desserts 5', 'dessertsdessertsdessertsdessertsdesserts', 500, '5.jpg', 1, 1),
(6, 'desserts 6', 'dessertsdessertsdessertsdessertsdessertsdesserts', 600, '6.jpg', 1, 1),
(7, 'desserts 7', 'dessertsdessertsdessertsdessertsdessertsdessertsdesserts', 700, '7.jpg', 1, 1),
(8, 'desserts 8', 'dessertsdessertsdessertsdessertsdessertsdessertsdessertsdesserts', 800, '8.jpg', 1, 1),
(9, 'desserts 9', 'dessertsdessertsdessertsdessertsdessertsdessertsdessertsdessertsdesserts', 1000, '9.jpg', 1, 1),
(10, 'desserts 10', 'dessertsdessertsdessertsdessertsdessertsdessertsdessertsdessertsdessertsdesserts', 10010, '10.jpg', 9, 1);

-- --------------------------------------------------------

--
-- 資料表結構 `users`
--

CREATE TABLE `users` (
  `user_id` int(10) NOT NULL,
  `user_name` text NOT NULL,
  `user_pwd` text NOT NULL,
  `user_fname` text DEFAULT NULL,
  `user_lname` text DEFAULT NULL,
  `enable` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- 傾印資料表的資料 `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `user_pwd`, `user_fname`, `user_lname`, `enable`) VALUES
(1, 'test@com', 'asd', 'asd', 'asd', 1),
(2, 'test2@test.com', 'asd', 'asd', 'asd', 1);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`index`),
  ADD KEY `goods_id` (`goods_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `user_id_2` (`user_id`);

--
-- 資料表索引 `goods`
--
ALTER TABLE `goods`
  ADD PRIMARY KEY (`goods_id`);

--
-- 資料表索引 `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `carts`
--
ALTER TABLE `carts`
  MODIFY `index` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `carts_ibfk_2` FOREIGN KEY (`goods_id`) REFERENCES `goods` (`goods_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
