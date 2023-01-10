const router = require('express').Router();

const { getFiles } = require('../utils/googleStorage');

// GET
// /api/event
router.get('/', async (req, res) => {
  const files = await getFiles(`events/`);

  // Remove folder
  files.shift();

  let videos = [];
  for (let file of files) {
    // Handle url encoded of "/"
    let publicUrl = file.publicUrl();
    publicUrl = publicUrl.replace('%2F', '/');

    // Get thumbnail url from video's public url
    let thumbnailUrl = publicUrl.split('/');
    thumbnailUrl.splice(thumbnailUrl.length - 1, 0, 'thumbnails');
    thumbnailUrl = thumbnailUrl.join('/');
    thumbnailUrl += '.jpg';

    videos.push({
      name: file.name,
      timeCreated: file.metadata.timeCreated,
      publicUrl,
      thumbnailUrl,
    });
  }

  res.json([...videos]);
});

module.exports = router;
