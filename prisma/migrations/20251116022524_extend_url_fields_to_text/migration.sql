-- AlterTable
ALTER TABLE `media_sosial` MODIFY `url` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `online_shop` MODIFY `url` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `umkm` MODIFY `location` TEXT NULL,
    MODIFY `logo` TEXT NULL,
    MODIFY `gmaps` TEXT NULL;

-- AlterTable
ALTER TABLE `umkm_galeri` MODIFY `img_url` TEXT NOT NULL;
