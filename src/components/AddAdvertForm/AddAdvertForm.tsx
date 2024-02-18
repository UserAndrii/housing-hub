import React, { ChangeEvent, useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import cn from 'classnames';
import Autocomplete from '../Autocomplete';
import s from './AddAdvertForm.module.scss';
import deleteIcon from '../../images/delete-icon.svg';
import uploadFoto from '../../images/upload-foto.svg';

import { IFormValues } from '../../types';
import { useAppDispatch } from '../../redux/store';
import { createNewAd } from '../../redux/operations';
import { advertValidationSchema } from '../../helpers';

interface IProp {
  onClose: () => void;
  isOpen?: boolean;
}

const AddAdvertForm: React.FC<IProp> = ({ onClose, isOpen }) => {
  const dispatch = useAppDispatch();
  const [image, setImage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const initialValues: IFormValues = {
    photo: '',
    price: 0,
    title: '',
    description: '',
    position: '',
  };

  const handleImageChange = async (
    e: ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    if (!e.currentTarget.files?.length) return;

    const file = e.currentTarget.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);

    setFieldValue('photo', file);

    if (e.target) {
      e.target.value = '';
    }
  };

  const handleSubmit = async (
    values: IFormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    const formData = new FormData();

    if (values) {
      console.log(values);
      const { photo, price, title, description, position } = values;

      formData.append('photo', photo);
      formData.append('price', price.toString());
      formData.append('title', title);
      formData.append('description', description);
      formData.append('position', position);

      try {
        dispatch(createNewAd(formData));
      } catch (error) {
        console.error('Помилка:', error);
      }
    }

    onClose();
    resetForm();
    setImage('');
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={advertValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form className={s.form} autoComplete="off">
          <div>
            {image ? (
              <div className={s.form__image_container}>
                <img className={s.form__image} src={image} alt="New advert" />
                <div
                  className={s.form__image_delete_icon}
                  onClick={() => {
                    setImage('');
                    setFieldValue('photo', null);
                  }}
                >
                  <img
                    src={deleteIcon}
                    alt="Delete Icon"
                    width={52}
                    height={52}
                  />
                </div>
              </div>
            ) : (
              <div>
                <div
                  className={s.form__download_container}
                  onClick={() => inputRef.current?.click()}
                >
                  <img
                    className={s.form__download_icon}
                    src={uploadFoto}
                    alt="upload foto icon"
                    width={32}
                    height={32}
                  />
                  <p>Завантажте фото</p>
                </div>
              </div>
            )}
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              ref={inputRef}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleImageChange(e, setFieldValue)
              }
              className={s.form__image_input}
            />
            <ErrorMessage
              className={s.form_error_message}
              name="photo"
              component="div"
            />
          </div>

          <div className={s.form_input_wrap}>
            <label className={s.form_label} htmlFor="price">
              Ціна
            </label>
            <Field
              className={s.form_input}
              type="number"
              id="price"
              name="price"
            />
            <ErrorMessage
              className={s.form_error_message}
              name="price"
              component="div"
            />
          </div>

          <div className={s.form_input_wrap}>
            <label className={s.form_label} htmlFor="title">
              Заголовок
            </label>
            <Field
              className={s.form_input}
              type="text"
              id="title"
              name="title"
            />
            <ErrorMessage
              className={s.form_error_message}
              name="title"
              component="div"
            />
          </div>

          <div className={s.form_input_wrap}>
            <label className={s.form_label} htmlFor="description">
              Опис
            </label>
            <Field
              className={cn(s.form_input, s.form_textarea)}
              as="textarea"
              id="description"
              name="description"
            />
            <ErrorMessage
              className={s.form_error_message}
              name="description"
              component="div"
            />
          </div>

          <div className={s.form_input_wrap}>
            <label className={s.form_label}>
              Адреса{' '}
              <span className={s.form_label_information}>
                (місто, вулиця, номер будинку)
              </span>
            </label>
            <Autocomplete setFieldValue={setFieldValue} isOpen={isOpen} />
            <ErrorMessage
              className={s.form_error_message}
              name="position"
              component="div"
            />
          </div>

          <button className={s.form_button} type="submit">
            Подати оголошення
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddAdvertForm;
