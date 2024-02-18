import React, { useEffect } from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';

import s from './Autocomplete.module.scss';

import { IMapContext } from '../../types';
import { useIsLoadedMap } from '../../helpers';

interface IProp {
  setFieldValue: (field: string, value: any) => void;
  isOpen?: boolean;
}

const Autocomplete: React.FC<IProp> = ({ setFieldValue, isOpen }) => {
  const { isLoaded, onPlaceSelect }: IMapContext = useIsLoadedMap();

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    init,
    clearSuggestions,
  } = usePlacesAutocomplete({
    initOnMount: false,
    debounce: 300,
  });

  useEffect(() => {
    if (isLoaded) init();
    if (!isOpen) setValue('', false);
  }, [init, isLoaded, isOpen, setValue]);

  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });

  const handleInput = (e: { target: { value: string } }) => {
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }: { description: string }) =>
    () => {
      setValue(description, false);
      clearSuggestions();

      getGeocode({ address: description }).then(results => {
        const { lat, lng } = getLatLng(results[0]);
        onPlaceSelect({ lat, lng });
        setFieldValue('position', [lat, lng].join(', '));
      });
    };

  const renderSuggestions = () =>
    data.map(suggestion => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li
          key={place_id}
          onClick={handleSelect(suggestion)}
          className={s.list_item}
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <div className={s.container} ref={ref}>
      <input
        type="text"
        className={s.input}
        value={value}
        onChange={handleInput}
        disabled={!ready}
      />
      {status === 'OK' && (
        <ul className={s.suggestions}>{renderSuggestions()}</ul>
      )}
    </div>
  );
};

export default Autocomplete;
