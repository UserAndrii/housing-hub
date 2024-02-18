import { IAd } from '../types';
// import { instance } from './instance';
import { points } from './points';

export const advertApi = {
  // <---------- get ---------->
  getAdvert(): Promise<{ data: IAd[] }> {
    // return instance.get<{ data: IAd[] }>('/advertisement');

    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ data: points });
      }, 200);
    });
  },

  // <---------- post ---------->
  postAd(formData: FormData) {
    // return instance.post<IAd>('/advertisement', formData);

    return new Promise(resolve => {
      const photoFile = formData.get('photo') as File;
      const price = formData.get('price') as string;
      const title = formData.get('title') as string;
      const description = formData.get('description') as string;

      const checkedPrice = price.startsWith('0')
        ? Number(price.toString().substring(1))
        : Number(price);

      const positionStr = formData.get('position') as string;
      const [latStr, lngStr] = positionStr.split(',');
      const position = { lat: Number(latStr), lng: Number(lngStr) };

      const reader = new FileReader();
      reader.readAsDataURL(photoFile);
      reader.onload = () => {
        const newAd: IAd = {
          id: Math.random(),
          images: reader.result as string,
          price: checkedPrice,
          title,
          description,
          position,
        };

        setTimeout(() => {
          resolve({ data: newAd });
        }, 0);
      };
    });
  },
};
