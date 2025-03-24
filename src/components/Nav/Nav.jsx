import { NavLink } from 'react-router';
import { Container } from '@mui/material';

import './style.scss';

const parths = [
  {
    path: '/',
    name: 'Create To-Do',
  },
  {
    path: '/all',
    name: 'All To-Dos',
  },
  {
    path: '/completed',
    name: 'Completed',
  },

  {
    path: '/uncompleted',
    name: 'Uncompleted',
  },
];

const Nav = () => {
  return (
    <header>
      <Container>
        <nav>
          {parths.map(({ path, name }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                isActive ? 'active' : ''
              }
            >
              {name}
            </NavLink>
          ))}
        </nav>
      </Container>
    </header>
  );
};

export default Nav;
