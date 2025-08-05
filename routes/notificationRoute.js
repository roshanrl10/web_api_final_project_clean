const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
// const { isAuthenticated } = require('../middlewares/authorizedUsers');

// Get all notifications for a user
router.get('/user/:userId', notificationController.getUserNotifications);

// Get notification count for a user
router.get('/count/:userId', notificationController.getNotificationCount);

// Mark notification as read
router.patch('/:notificationId/read', notificationController.markAsRead);

// Mark all notifications as read for a user
router.patch('/user/:userId/read-all', notificationController.markAllAsRead);

// Delete a notification
router.delete('/:notificationId', notificationController.deleteNotification);

// Clear all notifications for a user
router.delete('/user/:userId/clear-all', notificationController.clearAllNotifications);

// Create a new notification (for system use)
router.post('/create', notificationController.createNotification);

module.exports = router;