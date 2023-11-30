import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Thông tin cá nhân',
    path: '/patient/detail',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Đặt lịch hẹn',
    path: '/patient/setdate',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Nha sĩ',
    path: '/patient/dentist',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
  },
  {
    title: 'Hồ sơ bệnh án',
    path: '/patient/profile',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'Thanh toán',
    path: '/patient/payment',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text'
  },
];