const { Router } = require("express");
const {
  getNotifications,
  getNotificationsById,
  createNotification,
  deleteNotification,
  getNotificationsByEntityRegistry,
  deleteAllNotifications,
} = require("../controllers/notification");
const { validateJWT } = require("../middlewares/validateJWT");

const router = Router();

// router.get("/", getNotifications);

router.get("/findById", [validateJWT], getNotificationsById);

router.get(
  "/findByEntityRegistry",
  [validateJWT],
  getNotificationsByEntityRegistry
);

router.post("/", [validateJWT], createNotification);

router.delete("/:id", [validateJWT], deleteNotification);

// router.delete("/delete-all/many", [], deleteAllNotifications);

module.exports = router;
