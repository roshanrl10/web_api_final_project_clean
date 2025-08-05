const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Notification Schema
const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ['success', 'error', 'warning', 'info', 'booking', 'rental', 'system'],
    default: 'info',
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  relatedId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'relatedModel',
  },
  relatedModel: {
    type: String,
    enum: ['Booking', 'EquipmentRental', 'AgencyBooking', 'Hotel'],
  },
  metadata: {
    type: Map,
    of: String,
    default: {},
  },
}, {
  timestamps: true,
});

const Notification = mongoose.model('Notification', notificationSchema);

// Sample notifications data
const sampleNotifications = [
  {
    userId: '507f1f77bcf86cd799439011', // Use the same user ID as in the app
    title: 'Welcome to Trekking App!',
    message: 'Thank you for joining our platform. Start exploring amazing trekking destinations!',
    type: 'success',
    isRead: false,
  },
  {
    userId: '507f1f77bcf86cd799439011',
    title: 'New Hotel Available',
    message: 'Check out the newly added Mountain View Hotel in Kathmandu!',
    type: 'info',
    isRead: false,
  },
  {
    userId: '507f1f77bcf86cd799439011',
    title: 'Booking Confirmed',
    message: 'Your booking for Everest Base Camp Trek has been confirmed successfully!',
    type: 'booking',
    isRead: false,
  },
  {
    userId: '507f1f77bcf86cd799439011',
    title: 'Equipment Rental Available',
    message: 'New camping equipment is now available for rent. Book early to secure your gear!',
    type: 'rental',
    isRead: false,
  },
  {
    userId: '507f1f77bcf86cd799439011',
    title: 'Weather Alert',
    message: 'Heavy rainfall expected in Annapurna region. Plan your trek accordingly.',
    type: 'warning',
    isRead: false,
  },
  {
    userId: '507f1f77bcf86cd799439011',
    title: 'System Maintenance',
    message: 'Scheduled maintenance on Sunday 2-4 AM. Some features may be temporarily unavailable.',
    type: 'system',
    isRead: false,
  },
  {
    userId: '507f1f77bcf86cd799439011',
    title: 'Payment Successful',
    message: 'Your payment of $150 for Sherpa Expedition Services has been processed successfully.',
    type: 'success',
    isRead: true,
  },
  {
    userId: '507f1f77bcf86cd799439011',
    title: 'Booking Cancelled',
    message: 'Your booking for Langtang Valley Trek has been cancelled as requested.',
    type: 'info',
    isRead: true,
  },
];

async function createSampleNotifications() {
  try {
    console.log('🗂️ Creating sample notifications...');
    
    // Clear existing notifications for this user
    await Notification.deleteMany({ userId: '507f1f77bcf86cd799439011' });
    console.log('🗑️ Cleared existing notifications');

    // Create new notifications
    const createdNotifications = await Notification.insertMany(sampleNotifications);
    console.log(`✅ Successfully created ${createdNotifications.length} notifications`);

    // Display created notifications
    createdNotifications.forEach((notification, index) => {
      console.log(`📋 ${index + 1}. ${notification.title} (${notification.type})`);
    });

    console.log('\n🎉 Sample notifications created successfully!');
    console.log('📱 You can now test the notification system in your Flutter app');
    
  } catch (error) {
    console.error('❌ Error creating sample notifications:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the script
createSampleNotifications(); 