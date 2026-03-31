import { Button } from '@/shared/ui/buttons/button';
import cx from 'classix';
import { useTranslation } from 'react-i18next';

export const RecipePage: FCClass = ({
  className,
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'recipes' });

  return (
    <div
      className={cx(
        'p-16',
        className,
      )}
    >
      <form>
        <div
          className="flex gap-20"
        >
          <div>
            название рецепта
          </div>

          <input
            className="border-1 border-black-100"
            type="text"
            name="title"
          />
        </div>

        <div
          className="flex flex-col gap-20"
        >
        </div>

        <Button
          className="mt-20"
          onClick={() => {
            window.api.recipes.add('hello');
          }}
        >
          {t('addRecipe')}
        </Button>
      </form>
    </div>
  );
};
