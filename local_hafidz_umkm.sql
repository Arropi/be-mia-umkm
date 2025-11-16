-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: mysql:3306
-- Generation Time: Nov 16, 2025 at 04:23 AM
-- Server version: 8.0.44
-- PHP Version: 8.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `umkm_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `media_sosial`
--

CREATE TABLE `media_sosial` (
  `id` bigint NOT NULL,
  `umkm_id` bigint NOT NULL,
  `type` enum('X','Instagram','Facebook','TikTok') COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `media_sosial`
--

INSERT INTO `media_sosial` (`id`, `umkm_id`, `type`, `url`, `created_at`, `updated_at`) VALUES
(11, 5, 'Instagram', 'https://instagram.com/dapuribu.jakal', '2025-11-15 21:18:37.498', '2025-11-15 21:18:37.498'),
(12, 6, 'Instagram', 'https://instagram.com/macthati.idn', '2025-11-15 21:18:37.556', '2025-11-15 21:18:37.556'),
(13, 7, 'Instagram', 'https://www.instagram.com/di.sandava/', '2025-11-15 21:18:37.654', '2025-11-15 21:18:37.654'),
(14, 10, 'Instagram', 'https://www.instagram.com/warungyoben/', '2025-11-15 21:18:37.695', '2025-11-15 21:18:37.695'),
(15, 8, 'Instagram', 'https://www.instagram.com/_bouquetjogja/', '2025-11-15 21:18:37.746', '2025-11-15 21:18:37.746'),
(16, 9, 'Instagram', 'https://www.instagram.com/yumm.dimsum/', '2025-11-15 21:18:37.797', '2025-11-15 21:18:37.797');

-- --------------------------------------------------------

--
-- Table structure for table `online_shop`
--

CREATE TABLE `online_shop` (
  `id` bigint NOT NULL,
  `umkm_id` bigint NOT NULL,
  `type` enum('Blibli','Tokopedia','Shopee','Lazada','Go-Jek') COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `online_shop`
--

INSERT INTO `online_shop` (`id`, `umkm_id`, `type`, `url`, `created_at`, `updated_at`) VALUES
(1, 10, 'Go-Jek', 'https://gofood.co.id/yogyakarta/restaurant/warung-yo-ben-depan-rs-panti-rapih-73340cd6-893a-4b27-8aff-a31ba3ce38c4', '2025-11-15 21:18:37.695', '2025-11-15 21:18:37.695');

-- --------------------------------------------------------

--
-- Table structure for table `umkm`
--

CREATE TABLE `umkm` (
  `id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `type` enum('Kuliner','Fashion','Kerajinan','Jasa','Bidang Pertanian') COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `contact` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `location` text COLLATE utf8mb4_unicode_ci,
  `logo` text COLLATE utf8mb4_unicode_ci,
  `gmaps` text COLLATE utf8mb4_unicode_ci,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `umkm`
--

INSERT INTO `umkm` (`id`, `user_id`, `type`, `name`, `description`, `contact`, `location`, `logo`, `gmaps`, `created_at`, `updated_at`) VALUES
(1, 4, 'Jasa', 'Crystal Laundry Express', 'Melayani :\nCuci Reguler (3hari)\nCuci Kilat 1 Hari(24jam)\nCuci Express 6jam/8jam\nCuci Kering\nCuci Lipat\nCuci Setrika\nSatuan & Kiloan\nMINIMAL ORDER 2KG\nPAKAIAN PUTIH/BRANDED/LUNTUR HARAP DI PISAH DAN MASUK LAYANAN SATUAN, JIKA TETAP MASUK LAYANAN KILOAN ADA KERUSAKAN SEPERTI LUNTUR/BERKERUT/BERBULU BUKAN TANGGUNG JAWAB KAMI\nFREE ANTAR JEMPUT MIN 3KG & RADIUS 3KM\nBERLANGGANAN FREE GODIE BAG CRYSTAL LAUNDRY\nBATAS KOMPLAIN 1×24 JAM SETELAH PAKAIAN DITERIMA\nTERIMAKASIH, CRYSTAL LAUNDRY EXPRESS', '087711895987', 'Jl. Blimbingsari No.4, Caturtunggal, Depok, Sleman, DIY 55282', 'https://pub-c9e2263330194ccdada4e7fd2200dd5e.r2.dev/uploads/1763263743822-74483c1c26886f1c.jpeg', 'https://www.google.com/maps/place/Crystal+Laundry+Express/@-7.7740484,110.3683436,17z/data=!3m1!4b1!4m6!3m5!1s0x2e7a590052c9d837:0x5e7f6ac510807f41!8m2!3d-7.7740484!4d110.3709185!16s%2Fg%2F11x0c6bsf2?entry=ttu&g_ep=EgoyMDI1MTExMi4wIKXMDSoASAFQAw%3D%3D', '2025-11-15 21:03:56.717', '2025-11-16 04:06:58.665'),
(2, 9, 'Kuliner', 'Kopi Sembilan', '', '', '', '', '', '2025-11-15 21:03:56.795', '2025-11-15 21:18:37.848'),
(3, 10, 'Jasa', 'level up laundry jogja', '', '', '', '', '', '2025-11-15 21:03:56.818', '2025-11-15 21:18:37.896'),
(4, 11, 'Kuliner', 'Pempek Asli Wong Kito', '', '081325081046', 'Gondangan RT 06 RW 50 Maguwoharjo Depok Sleman Yogyakarta', '', '', '2025-11-15 21:03:56.843', '2025-11-15 21:18:37.947'),
(5, 2, 'Kuliner', 'Dapur Ibu', 'Warung Makan Dapur Ibu merupakan warung makan yang berasal dari Yogyakarta, tepatnya berlokasi di Jl. Bonjotan, Candi Winangun, Sariharjo, Kec. Ngaglik, Kab. Sleman, Yogyakarta. Dikenal dengan cita rasa rumahan yang autentik, warung ini menyajikan beragam menu lezat seperti aneka nasi ayam mulai dari ayam bumbu, ayam salted egg, dan lainnya serta aneka daging seperti iga bakar, iga kremes, dan daging slice. Tak hanya itu, masih banyak pilihan menu menarik lainnya.\n\nBerdiri sejak tahun 2024, Warung Makan Dapur Ibu menjadi tempat favorit bagi berbagai kalangan, terutama mahasiswa yang ingin menikmati hidangan lezat dengan harga terjangkau. Suasana warung yang sederhana, nyaman, dan bernuansa cerah kuning hijau memberikan kesan hangat bagi siapa pun yang berkunjung. Fasilitas seperti kamar mandi, mushola dan Wi-Fi gratis juga menambah kenyamanan pengunjung. \n\nSelain makan di tempat, tersedia layanan pesan antar melalui ShopeeFood dan GoFood untuk memudahkan pelanggan menikmati menu favorit di mana saja. Dengan motto “Rasa Autentik Harga Mahasiswa,” Warung Makan Dapur Ibu terus berkomitmen untuk menyajikan makanan yang lezat, higienis, dan memuaskan bagi setiap pelanggan.', '085640251999', 'Jl. Candi Winangun, Candi Winangun, Sardonoharjo, Kec. Ngaglik, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55581', '', 'https://maps.app.goo.gl/2fb4cipBMWEoXJYr9?g_st=iw', '2025-11-15 21:17:20.467', '2025-11-15 21:18:37.498'),
(6, 3, 'Kuliner', 'Matcha Ti', '', '', 'Jl. Pogung Kidul, Pogung Kidul, Sinduadi, Kec. Mlati, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55284', '', 'https://www.google.com/maps/place/MatchaTi+-+Pogung/@-7.7625302,110.3652749,16z/data=!4m6!3m5!1s0x2e7a590014a667e1:0x36a1f2366b0ec980!8m2!3d-7.7625302!4d110.3748021!16s%2Fg%2F11y4q6slhx?entry=ttu&g_ep=EgoyMDI1MTExMi4wIKXMDSoASAFQAw%3D%3D', '2025-11-15 21:17:20.507', '2025-11-15 21:18:37.556'),
(7, 5, 'Kuliner', 'Sandava Coffee & Space', 'Sandava Coffee & Space menyediakan berbagai olahan coffee & snack bernuansa Nusantara dan suasana pasca kolonial', '082134897245', 'Jl. Sendowo No.C47, Sendowo, Sinduadi, Kec. Mlati, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55281', '', 'Sandava | Coffee & Space', '2025-11-15 21:17:20.608', '2025-11-15 21:18:37.654'),
(8, 7, 'Kerajinan', 'Buket Snack dan Bunga \"Bouquet Jogja\"', 'Kami menjual berbagai macam buket dan hadiah, seperti buket bunga, buket uang, buket makanan, papan nama, serta menyediakan jasa pembuatan hantaran pernikahan dan berbagai jenis hadiah lainnya yang dapat disesuaikan dengan permintaan pelanggan.\n\nWe sell a variety of bouquets and gifts, such as flower bouquets, money bouquets, food bouquets, name boards, and provide wedding gift arrangement services, as well as other customized gifts based on customer requests.', '083836115959', 'Sendowo E 99, RW.007/055, Sinduadi, Kec. Mlati, Kabupaten Sleman, Daerah Istimwewa Yogyakarta 55284', '', 'Buket Snack dan Bunga \"Bouquet Jogja\"', '2025-11-15 21:17:20.650', '2025-11-15 21:18:37.746'),
(9, 8, 'Kuliner', 'Yumm Dimsum', 'Yumm Dimsum merupakan pabrik dimsum yang berasal dari Kota Bandung dan sudah berdiri sejak tahun 2018.\nTelah dipercaya oleh para pelaku usaha seperti hotel, resto, cafe dan catering sebagai supplier Dimsum berkualitas premium tanpa bahan pengawet yang sudah halal dan BPOM.\nYumm Dimsum hadir dengan menawarkan lebih dari 30 varian dimsum baik dimsum kukus, dimsum goreng, bento dan bakpao.\nKami siap mensupply kebutuhan dimsum anda dan siap menerima pesanan custom dimsum mulai dari ukuran, bentuk, topping dan bahkan warna kulit.', '082241588445', 'KM 5 No. 94, Jl. Kaliurang, Kocoran, Caturtunggal, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55281', '', 'Yumm Dimsum Yogyakarta', '2025-11-15 21:17:20.679', '2025-11-15 21:18:37.797'),
(10, 6, 'Kuliner', 'Warung Yo Ben', 'Menu Spesial Mie', '087734984518', 'Jl. Cik Di Tiro No.31, Terban, Kec. Gondokusuman, Kota Yogyakarta, Daerah Istimewa Yogyakarta 55223', '', 'Warung Yo Ben', '2025-11-15 21:18:37.695', '2025-11-15 21:18:37.695');

-- --------------------------------------------------------

--
-- Table structure for table `umkm_galeri`
--

CREATE TABLE `umkm_galeri` (
  `id` bigint NOT NULL,
  `umkm_id` bigint NOT NULL,
  `section` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `img_url` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `umkm_galeri`
--

INSERT INTO `umkm_galeri` (`id`, `umkm_id`, `section`, `img_url`, `created_at`, `updated_at`) VALUES
(4, 1, 'Test', 'https://pub-c9e2263330194ccdada4e7fd2200dd5e.r2.dev/uploads/1763264669619-5a20a2378799052f.jpeg', '2025-11-16 04:06:58.665', '2025-11-16 04:06:58.665');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` text COLLATE utf8mb4_unicode_ci,
  `role` enum('admin_umkm','administrator') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'admin_umkm',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  `whatsapp` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `password`, `email`, `username`, `name`, `address`, `role`, `created_at`, `updated_at`, `whatsapp`) VALUES
(1, '$2b$10$/rhocQsoVqezlaazRdKAFu9q7ffMSK4tz.9SEcR2/CwLLGGpkVrBm', 'admin@gmail.com', 'administrator', NULL, NULL, 'administrator', '2025-11-15 20:12:00.615', '2025-11-15 20:12:00.616', NULL),
(2, '$2b$10$KScKaOkL..omORq9bl75reRc1Vetv1FabyACsgqGnZRbYCr073HSK', 'dapuribu@email.com', 'dapuribu', 'Dapur Ibu', 'Jl. Candi Winangun, Candi Winangun, Sardonoharjo, Kec. Ngaglik, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55581', 'admin_umkm', '2025-11-15 20:51:24.970', '2025-11-15 20:51:25.012', '085640251999'),
(3, '$2b$10$cCcAqmOeNm.wktY.U2gjsuuwlThZholMniMWL/Cqku/e2ptPviHoK', 'matchati@email.com', 'matchati', 'Matcha Ti', 'Jl. Pogung Kidul, Pogung Kidul, Sinduadi, Kec. Mlati, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55284', 'admin_umkm', '2025-11-15 20:51:25.228', '2025-11-15 20:51:25.229', ''),
(4, '$2b$10$iFhxsgyHtA3E9H8uMTUJS.9FpgzefBxjepx8OfVpNYGVdYIKnqiLK', 'crystallaundry@email.com', 'crystallaundry', 'Crystal Laundry Express', 'Jl. Blimbingsari No.4, RT.04/RW.16, Blimbing Sari, Caturtunggal, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55282', 'admin_umkm', '2025-11-15 20:51:25.455', '2025-11-15 20:51:25.456', '087711895987'),
(5, '$2b$10$5yOui83zg0MECeLTcMcDs.3qx/1dMfcI.QZoY6UV.vKERhQa19SRy', 'sandava@email.com', 'sandava', 'Sandava Coffee & Space', 'Jl. Sendowo No.C47, Sendowo, Sinduadi, Kec. Mlati, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55281', 'admin_umkm', '2025-11-15 20:51:25.658', '2025-11-15 20:51:25.659', '082134897245'),
(6, '$2b$10$nvnsZBGsNn0Z06aUYpG6Yu70EaaGZtdhU2AaLcFaP80yvcK4.OFlG', 'warungyoben@email.com', 'warungyoben', 'Warung Yo Ben', 'Jl. Cik Di Tiro No.31, Terban, Kec. Gondokusuman, Kota Yogyakarta, Daerah Istimewa Yogyakarta 55223', 'admin_umkm', '2025-11-15 20:51:25.851', '2025-11-15 20:51:25.852', '087734984518'),
(7, '$2b$10$DMADcxg9h9Fabq5SjB1R0e7nxrFV39S4hVwjnvaWm3.4xokKZ8LYm', 'bouquetjogja@email.com', 'bouquetjogja', 'Buket Snack dan Bunga \"Bouquet Jogja\"', 'Sendowo E 99, RW.007/055, Sinduadi, Kec. Mlati, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55284', 'admin_umkm', '2025-11-15 20:51:26.055', '2025-11-15 20:51:26.056', '083836115959'),
(8, '$2b$10$g9FoQxjVSiUA.gGWxcPxTeXLwaWGRXyM5JAEbSi9CqZI0uPKjuLu6', 'yummdimsum@email.com', 'yummdimsum', 'Yumm Dimsum', 'KM 5 No. 94, Jl. Kaliurang, Kocoran, Caturtunggal, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55281', 'admin_umkm', '2025-11-15 20:51:26.261', '2025-11-15 20:51:26.262', '082241588445'),
(9, '$2b$10$Ki4KJWK1HdlccW.KoFrir.R0P/GDSbmuOvaFv.6JtK17HzJATN14q', 'kopisembilan@email.com', 'kopisembilan', 'Kopi Sembilan', '', 'admin_umkm', '2025-11-15 20:51:26.421', '2025-11-15 20:51:26.422', ''),
(10, '$2b$10$Kb0H6XRyWhGj/yeJ/OR1cubeeGD7ULqKSMpzZfeyJGmr9y0cV5E/.', 'leveluplaundry@email.com', 'leveluplaundry', 'level up laundry jogja', '', 'admin_umkm', '2025-11-15 20:51:26.578', '2025-11-15 20:51:26.579', ''),
(11, '$2b$10$.iE.fj8.NEHgOMFUz.1OYuEXOS8fYix2nYZuQNYwidHNEw3XbwrVW', 'pempekwongkito@email.com', 'pempekwongkito', 'Pempek Asli Wong Kito', 'Gondangan RT 06 RW 50 Maguwoharjo Depok Sleman Yogyakarta', 'admin_umkm', '2025-11-15 20:51:26.723', '2025-11-15 20:51:26.724', '081325081046');

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('4fce292e-011f-4ccd-ab87-5cbab9c7db08', '7b3f32823e11c226d627ce01b72f3fb1de8d3029ac99eade7fae55258f783303', '2025-11-15 20:45:35.269', '20251115204429_add_whatsapp_to_users', NULL, NULL, '2025-11-15 20:45:35.213', 1),
('7ef6a6d8-2164-4dad-bdb3-e6d7194ce841', 'c07f6a81afce668327f76d461271730b9544ac8ba2bb2a3263f33f16c154730f', '2025-11-15 19:37:47.065', '20251023165049_init', NULL, NULL, '2025-11-15 19:37:47.024', 1),
('936a6e1e-7f93-4559-bebf-0e0b33c010a1', 'ac641c1afc548a4f76588c602681285ef70c9cc6e128e5aee02b868d214059c9', '2025-11-16 02:25:25.165', '20251116022524_extend_url_fields_to_text', NULL, NULL, '2025-11-16 02:25:24.971', 1),
('f97792a7-dd1f-4e71-a0c9-ed1adf76552f', '521f9a3ee1cda8b48541c646f72529cf97f5eca2a639d32d5109ad3bdff5a280', '2025-11-15 19:47:03.124', '20251115194702_add_role_name_address', NULL, NULL, '2025-11-15 19:47:02.491', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `media_sosial`
--
ALTER TABLE `media_sosial`
  ADD PRIMARY KEY (`id`),
  ADD KEY `media_sosial_umkm_id_fkey` (`umkm_id`);

--
-- Indexes for table `online_shop`
--
ALTER TABLE `online_shop`
  ADD PRIMARY KEY (`id`),
  ADD KEY `online_shop_umkm_id_fkey` (`umkm_id`);

--
-- Indexes for table `umkm`
--
ALTER TABLE `umkm`
  ADD PRIMARY KEY (`id`),
  ADD KEY `umkm_user_id_fkey` (`user_id`);

--
-- Indexes for table `umkm_galeri`
--
ALTER TABLE `umkm_galeri`
  ADD PRIMARY KEY (`id`),
  ADD KEY `umkm_galeri_umkm_id_fkey` (`umkm_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_key` (`email`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `media_sosial`
--
ALTER TABLE `media_sosial`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `online_shop`
--
ALTER TABLE `online_shop`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `umkm`
--
ALTER TABLE `umkm`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `umkm_galeri`
--
ALTER TABLE `umkm_galeri`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `media_sosial`
--
ALTER TABLE `media_sosial`
  ADD CONSTRAINT `media_sosial_umkm_id_fkey` FOREIGN KEY (`umkm_id`) REFERENCES `umkm` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `online_shop`
--
ALTER TABLE `online_shop`
  ADD CONSTRAINT `online_shop_umkm_id_fkey` FOREIGN KEY (`umkm_id`) REFERENCES `umkm` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `umkm`
--
ALTER TABLE `umkm`
  ADD CONSTRAINT `umkm_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `umkm_galeri`
--
ALTER TABLE `umkm_galeri`
  ADD CONSTRAINT `umkm_galeri_umkm_id_fkey` FOREIGN KEY (`umkm_id`) REFERENCES `umkm` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
