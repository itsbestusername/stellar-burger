import React, { FC, memo, useState, useEffect } from 'react';
import styles from './ingredient-details.module.css';
import { IngredientDetailsUIProps } from './type';
import { Preloader } from '../preloader';

export const IngredientDetailsUI: FC<IngredientDetailsUIProps> = memo(
  ({ ingredientData }) => {
    const { name, image_large, calories, proteins, fat, carbohydrates } =
      ingredientData;

    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
      const img = new Image();
      img.src = image_large;
      img.onload = () => setImageLoaded(true);
    }, [image_large]);

    return (
      <div className={styles.content}>
        {!imageLoaded && <Preloader />}
        <img
          className={styles.img}
          alt='изображение ингредиента.'
          src={image_large}
          style={{ display: imageLoaded ? 'block' : 'none' }}
        />
        {imageLoaded && (
          <>
            <h3 className='text text_type_main-medium mt-2 mb-4'>{name}</h3>
            <ul
              className={`${styles.nutritional_values} text_type_main-default`}
            >
              <li className={styles.nutritional_value}>
                <p className={`text mb-2 ${styles.text}`}>Калории, ккал</p>
                <p className={`text text_type_digits-default`}>{calories}</p>
              </li>
              <li className={styles.nutritional_value}>
                <p className={`text mb-2 ${styles.text}`}>Белки, г</p>
                <p className={`text text_type_digits-default`}>{proteins}</p>
              </li>
              <li className={styles.nutritional_value}>
                <p className={`text mb-2 ${styles.text}`}>Жиры, г</p>
                <p className={`text text_type_digits-default`}>{fat}</p>
              </li>
              <li className={styles.nutritional_value}>
                <p className={`text mb-2 ${styles.text}`}>Углеводы, г</p>
                <p className={`text text_type_digits-default`}>
                  {carbohydrates}
                </p>
              </li>
            </ul>
          </>
        )}
      </div>
    );
  }
);
