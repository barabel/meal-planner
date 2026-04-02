import cx from 'classix';
import { CreateRecipe } from '@/widgets/create-recipe';

export const RecipePage: FCClass = ({
  className,
}) => {
  return (
    <div
      className={cx(
        'p-16',
        className,
      )}
    >
      <CreateRecipe />
    </div>
  );
};
