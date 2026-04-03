import { Button } from '@/shared/ui/buttons/button';
import { Input } from '@/shared/ui/input';
import { useTranslation } from 'react-i18next';
import { CreateRecipeIngredient } from './ingredient/create-recipe-ingredient';
import { TCreateRecipeForm } from '../types';
import { InputWrapper } from '@/shared/ui/input-wrapper';
import { Controller, FormProvider, SubmitHandler, useForm, useFieldArray } from 'react-hook-form';
import { defaultFormValues, defaultIngredientFormValues } from '../const';
import { useRecipesStore } from '@/entities/recipe';

export const CreateRecipe: FCClass = ({
  className,
}) => {
  const { t } = useTranslation();

  const methods = useForm<TCreateRecipeForm>({
    mode: 'onSubmit',
    defaultValues: defaultFormValues,
  });

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = methods;

  const { fields, remove, append } = useFieldArray({
    control,
    name: 'ingredients',
  });

  const addRecipe = useRecipesStore(state => state.addRecipe);

  const onSubmit: SubmitHandler<TCreateRecipeForm> = async (data) => {
    const { ingredients } = data;

    if (ingredients.length === 0) {
      setError('root', { message: t('validation.ingredientsNeed') });

      return;
    }

    await addRecipe(data);

    reset();
  };

  return (
    <FormProvider {...methods}>
      <form
        className={className}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div
          className="flex flex-col gap-20 mb-20"
        >
          <div
            className="flex items-end gap-20"
          >
            <Controller
              name="title"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: t('validation.required'),
                },
              }}
              render={({ field, fieldState: { error } }) => {
                return (
                  <InputWrapper
                    label={t('recipes.recipeName')}
                    error={error?.message}
                  >
                    <Input
                      {...field}
                    />
                  </InputWrapper>
                );
              }}
            />

            <div className="flex flex-col gap-4">
              <Button
                onClick={() => {
                  append(defaultIngredientFormValues);
                }}
              >
                {t('recipes.addIngredient')}
              </Button>
            </div>
          </div>

          {fields.map((item, index) => {
            const { id } = item;

            return (
              <CreateRecipeIngredient
                key={id}
                index={index}
                placeholderTitle={`${t('recipes.ingredientTitlePlacehoder')}${index + 1}`}
                onDelete={() => remove(index)}
              />
            );
          })}
        </div>

        <Button
          submit
        >
          {t('recipes.addRecipe')}
        </Button>

        {errors.root?.message && (
          <div
            className="text-red-400"
          >
            {errors.root.message}
          </div>
        )}
      </form>
    </FormProvider>
  );
};
