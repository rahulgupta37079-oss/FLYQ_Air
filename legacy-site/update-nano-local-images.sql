-- Update FLYQ Nano with local image paths
-- Date: 2026-01-25
-- This will use images stored in /public/images/products/flyq-nano/
-- All 7 images downloaded successfully (508KB total)

UPDATE products SET
  image_url = '/images/products/flyq-nano/1-package.jpg',
  gallery_images = '/images/products/flyq-nano/1-package.jpg,/images/products/flyq-nano/2-folded-hand.jpg,/images/products/flyq-nano/3-waypoints.jpg,/images/products/flyq-nano/4-features.jpg,/images/products/flyq-nano/5-controller.jpg,/images/products/flyq-nano/6-folded-functions.jpg,/images/products/flyq-nano/7-color-variants.jpg'
WHERE id = 3;

-- Verify the update
SELECT id, name, slug, image_url, gallery_images FROM products WHERE id = 3;
