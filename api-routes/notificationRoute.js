const path = require('path');
const fs = require('fs');

const router = require('express').Router();
const webpush = require('web-push');
const { v4: uuid } = require('uuid');

const publicKey =
  'your-public-key';
const privateKey = 'your-private-key';

webpush.setVapidDetails('mailto:your@email.com', publicKey, privateKey);

// POST
// /api/notification/subscribe
router.post('/subscribe', async (req, res) => {
  const subscription = req.body;

  const payload = JSON.stringify({
    title: 'Notification Turned On',
    body: 'Notification for Pantau has been turned on.',
    icon: 'your-icon-url',
  });

  try {
    const subscriptionPath = path.join(__dirname, '../subscriptions');

    // Create folder if not exists
    if (!fs.existsSync(subscriptionPath)) {
      fs.mkdirSync(subscriptionPath);
    }

    // Save user subscription for later use
    const filename = path.join(subscriptionPath, `${uuid()}.json`);
    fs.writeFileSync(filename, JSON.stringify(subscription));

    await webpush.sendNotification(subscription, payload);
    res.status(201).end();
  } catch (err) {
    console.error(err);
    res.status(400).end();
  }
});

// POST
// /api/notification/send
router.post('/send', async (req, res) => {
  const { title, message, icon, image } = req.body;

  const payload = JSON.stringify({
    title,
    body: message,
    icon: 'your-icon-url',
    badge: 'your-badge-url',
    image,
  });

  try {
    const subscriptionPath = path.join(__dirname, '../subscriptions');

    // Create folder if not exists
    if (!fs.existsSync(subscriptionPath)) {
      fs.mkdirSync(subscriptionPath);
    }

    // Get all subscriptions
    const filenames = fs.readdirSync(subscriptionPath);

    for (let filename of filenames) {
      const filePath = path.join(subscriptionPath, filename);
      let subscription = fs.readFileSync(filePath, { encoding: 'utf-8' });
      subscription = JSON.parse(subscription);

      // Send notification
      try {
        await webpush.sendNotification(subscription, payload);
      } catch (err) {
        // Delete expired subscriptions
        fs.unlinkSync(filePath);
      }
    }

    res.status(200).end();
  } catch (err) {
    console.error('ERROR:', err);
    res.status(400).end();
  }
});

module.exports = router;
