const Adopter = require("../model/Adopter");
const Notification = require("../model/Notification");
const User = require("../model/User");
const ObjectId = require("mongoose").Types.ObjectId;

// all notifications
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    return res.status(200).json({
      ok: true,
      message: "get all notification",
      total: notifications.length,
      notifications,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// notifications filtered by id user
const getNotificationsById = async (req, res) => {
  try {
    const id = req.uid;
    console.log("getNotificationsById", id);

    const notifications = await Notification.find({
      "data.user.id": ObjectId(id),
    }).sort({ createdAt: -1 });

    // const notificationsFilteres = notifications.filter((notification) => {
    //   // console.log(notification);
    //   return notification.data.user.id.toString() === id;
    // });

    // console.log(notificationsFilteres);

    return res.status(200).json({
      ok: true,
      message: "get by id notification",
      notifications,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// notifications filtered by entity registry from user
const getNotificationsByEntityRegistry = async (req, res) => {
  try {
    const id = req.uid;
    console.log("getNotificationsById", id);

    // const user = await Adopter.findById(ObjectId(id));
    // console.log("user", user);

    // const entityRegistry = await User.find({
    //   publicAddress: user.created_for,
    // });
    // console.log("entityRegistry", entityRegistry);
    // console.log("entityRegistry", entityRegistry.length);

    const entityRegistry = await User.findById(ObjectId(id));
    // console.log("entityRegistry", entityRegistry);

    // listar todos los usuarios de las entidades registradas y obtener sus notificaciones

    const adopters = await Adopter.find({
      created_for: entityRegistry.publicAddress,
    });
    // console.log("adopters", adopters);

    const adoptersIds = adopters.map((adopter) => {
      return adopter._id;
    });

    // console.log("adoptersIds", adoptersIds);

    // "data.user.id": ObjectId(id),
    const notifications = await Notification.find({
      "data.user.id": { $in: adoptersIds },
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      ok: true,
      message: "get by id notification",
      total: notifications.length,
      notifications,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const createNotification = async (req, res) => {
  try {
    const { title, message, type, data } = req.body;

    const notification = new Notification({
      title,
      message,
      type,
      data,
    });

    await notification.save();

    return res.status(200).json({
      ok: true,
      message: "create notification",
      title,
      message,
      type,
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByIdAndDelete(id);

    return res.status(200).json({
      ok: true,
      message: "delete notification",
      data: notification,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

module.exports = {
  getNotifications,
  getNotificationsById,
  createNotification,
  getNotificationsByEntityRegistry,
  deleteNotification,
};
