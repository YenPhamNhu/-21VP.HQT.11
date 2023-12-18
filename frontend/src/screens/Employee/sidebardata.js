import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Thông tin cá nhân',
    path: '/employee/detail',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Cập nhật hồ sơ bệnh nhân',
    path: '/employee/updatepatient',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Cập nhật lịch biểu',
    path: '/employee/schedule',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
  },
  {
    title: 'Tìm kiếm',
    path: '/employee/search',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'Xem danh sách lịch hẹn',
    path: '/employee/listdate',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text'
  },
  {
    title: 'Xem danh mục thuốc',
    path: '/employee/listmed',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text'
  },
];