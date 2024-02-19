import { IAd, IResponse } from '../types';
import { instance } from './instance';

export const advertApi = {
  // <---------- get ---------->
  getAdvert: () => instance.get<IResponse>('/advertisement'),

  // <---------- post ---------->
  postAd: (formData: FormData) =>
    instance.post<IAd>('/advertisement', formData),
};
