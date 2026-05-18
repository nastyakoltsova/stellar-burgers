import { FC } from 'react';
import { NavLink, Link, useMatch } from 'react-router-dom';
import clsx from 'clsx';

import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';

import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const ingredientsMatch = useMatch('/ingredients/:id');

  return (
    <header className={styles.header}>
      <nav className={clsx(styles.menu, 'p-4')}>
        <div className={styles.menu_part_left}>
          <NavLink
            to='/'
            end
            className={({ isActive }) =>
              clsx(
                styles.link,
                (isActive || ingredientsMatch) && styles.link_active
              )
            }
          >
            <BurgerIcon type={'primary'} />
            <p className='text text_type_main-default ml-2 mr-10'>
              Конструктор
            </p>
          </NavLink>
          <NavLink
            to='/feed'
            className={({ isActive }) =>
              clsx(styles.link, isActive && styles.link_active)
            }
          >
            <ListIcon type={'primary'} />
            <p className='text text_type_main-default ml-2'>Лента заказов</p>
          </NavLink>
        </div>
        <div className={styles.logo}>
          <Link to='/' aria-label='На главную'>
            <Logo className='' />
          </Link>
        </div>
        <NavLink
          to='/profile'
          className={({ isActive }) =>
            clsx(
              styles.link,
              styles.link_position_last,
              isActive && styles.link_active
            )
          }
        >
          <ProfileIcon type={'primary'} />
          <p className='text text_type_main-default ml-2'>
            {userName || 'Личный кабинет'}
          </p>
        </NavLink>
      </nav>
    </header>
  );
};
