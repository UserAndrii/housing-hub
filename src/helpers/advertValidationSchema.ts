import * as Yup from 'yup';

export const advertValidationSchema = Yup.object({
  photo: Yup.mixed()
    .required('Фотографія обовʼязкова')
    .test('is-file', 'Фотографія обовʼязкова', value => {
      return !!value;
    }),
  price: Yup.number()
    .required('Ціна обовʼязкова')
    .min(1, 'Ціна не може бути нулем або відʼємним значенням'),
  title: Yup.string()
    .required('Обовʼязкове поле')
    .min(3, 'Опис має складатися не менше ніж з 3 символів')
    .max(30, 'Опис не може перевищувати 30 символів'),
  description: Yup.string()
    .required('Обовʼязкове поле')
    .min(3, 'Опис має складатися не менше ніж з 3 символів')
    .max(90, 'Опис не може перевищувати 90 символів'),
  position: Yup.string()
    .required('Адреса обовʼязкова')
    .min(3, 'Мінімум 3 символа для адреси'),
});
