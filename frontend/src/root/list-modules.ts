import { lazy } from 'react';
import {
  BorderColorTwoTone,
  ListAltTwoTone,
  EventAvailableTwoTone,
  AccountCircleTwoTone
} from '@material-ui/icons';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap } from '@material-ui/core';
import { TFunction } from 'i18next';

type ModuleType = {
  title: string;
  url: string;
  component: ReturnType<typeof lazy>;
  icon: OverridableComponent<SvgIconTypeMap<Record<string, unknown>, 'svg'>>;
};

export const createModules = (t: TFunction): ModuleType[] => [
  {
    title: t('Records'),
    url: '/',
    component: lazy(() => import('modules/records')),
    icon: BorderColorTwoTone,
  },
  {
    title: t('Categories'),
    url: '/categories',
    component: lazy(() => import('modules/categories')),
    icon: ListAltTwoTone,
  },
  {
    title: t('Reports'),
    url: '/history',
    component: lazy(() => import('modules/reports')),
    icon: EventAvailableTwoTone,
  },
  {
    title: t('Profile'),
    url: '/profile',
    component: lazy(() => import('modules/profile')),
    icon: AccountCircleTwoTone,
  },
];
