import { notification } from 'antd';

export const showSuccessNotification = () => {
  notification.success({
    message: "Order Placed Successfully",
    duration: 5,
    placement: 'top',
  });
};



export const showErrorNotification = () => {
  notification.error({
    message: "Something Wentwrong",
    duration: 5,
    placement: 'top',
  });
};

