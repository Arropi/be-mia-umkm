/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `users` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `password` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,
    `address` TEXT NULL,
    `role` ENUM('admin_umkm', 'administrator') NOT NULL DEFAULT 'admin_umkm',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `umkm` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT NOT NULL,
    `type` ENUM('Kuliner', 'Fashion', 'Kerajinan', 'Jasa', 'Bidang Pertanian') NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `contact` VARCHAR(191) NULL,
    `location` VARCHAR(191) NULL,
    `logo` VARCHAR(191) NULL,
    `gmaps` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `online_shop` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `umkm_id` BIGINT NOT NULL,
    `type` ENUM('Blibli', 'Tokopedia', 'Shopee', 'Lazada', 'Go-Jek') NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `umkm_galeri` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `umkm_id` BIGINT NOT NULL,
    `section` VARCHAR(191) NOT NULL,
    `img_url` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `media_sosial` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `umkm_id` BIGINT NOT NULL,
    `type` ENUM('X', 'Instagram', 'Facebook', 'TikTok') NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `umkm` ADD CONSTRAINT `umkm_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `online_shop` ADD CONSTRAINT `online_shop_umkm_id_fkey` FOREIGN KEY (`umkm_id`) REFERENCES `umkm`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `umkm_galeri` ADD CONSTRAINT `umkm_galeri_umkm_id_fkey` FOREIGN KEY (`umkm_id`) REFERENCES `umkm`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `media_sosial` ADD CONSTRAINT `media_sosial_umkm_id_fkey` FOREIGN KEY (`umkm_id`) REFERENCES `umkm`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
