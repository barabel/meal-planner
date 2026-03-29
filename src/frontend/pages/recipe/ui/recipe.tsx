import { NavLink } from 'react-router';

export const RecipePage: FCClass = ({
  className,
}) => {
  return (
    <div
      className={className}
    >
      <NavLink to="/">
        главная
      </NavLink>
    </div>
  );
};
