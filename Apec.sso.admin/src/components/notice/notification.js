import { CheckCircleTwoTone,ExclamationCircleOutlined  } from '@ant-design/icons';
import { notification } from 'antd';

export const openNotification = (respone) => {
    if(respone.includes("thành công")){
      notification.open({
        message: 'Thành công',

        duration: 2,
        description:
          respone,
        icon: (
          <CheckCircleTwoTone twoToneColor="#52c41a" />
        ),
      });
      // Reset state 
    }
    else if(respone.includes("thất bại")){
      notification.open({
        message: 'Thất bại',
        duration: 2,
        description:
          respone,
        icon: (
          <ExclamationCircleOutlined 
            style={{
              color: 'red',
            }}
          />
        ),
      });
    }
  };


