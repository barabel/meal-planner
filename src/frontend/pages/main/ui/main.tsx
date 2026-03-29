import { NavLink } from 'react-router';

export const MainPage: FCClass = ({
  className,
}) => {
  return (
    <div
      className={className}
    >
      <NavLink to="/recipe">
        рецепты
      </NavLink>
    </div>
  );
};
