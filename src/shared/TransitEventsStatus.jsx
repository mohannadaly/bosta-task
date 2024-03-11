const TransitEventStatus = {
  PACKAGE_RECEIVED: "success",
  IN_TRANSIT: "success",
  OUT_FOR_DELIVERY: "success",
  WAITING_FOR_CUSTOMER_ACTION: "pending",
  NOT_YET_SHIPPED: "success",
  DELIVERED_TO_SENDER: "failed",
  CANCELLED: "failed",
  DELIVERED: "success",
};
export default TransitEventStatus;
