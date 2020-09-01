import React, { useRef, useState, ChangeEvent, useEffect } from 'react';
import AsyncSelect from 'react-select/async';
import { ValueType } from 'react-select/src/types';

import api from '../../_services/api';

type OptionType = { label: string; value: number };

interface City {
  id: string;
  name: string;
}

interface UF {
  state_id: string;
}
const SelectCity: React.FC<UF> = ({ state_id }) => {
  const INITIAL_DATA = {
    value: 0,
    label: 'Selecione o usuário',
  };
  const selectRef = useRef(null);
  const [selectData, setselectData] = useState(INITIAL_DATA);
  const mapResponseToValuesAndLabels = (data: City) => ({
    value: data.id,
    label: data.name,
  });

  async function callApi(value: any) {
    const data = await api
      .get(`cities/${state_id}/select`)
      .then((final: any) =>
        final.data.filter((i: any) =>
          i.label.toLowerCase().includes(value.toLowerCase()),
        ),
      );

    return data;
  }
  useEffect(() => {
    if (state_id === '0') {
    }
    // callApi(state_id);
  }, [state_id]);

  const handleSelectCity = (selectedOption: ValueType<OptionType>) => {
    const { value, label } = selectedOption as OptionType;

    setselectData({ value, label });
  };

  return (
    <div>
      <AsyncSelect
        cacheOptions
        loadOptions={callApi}
        value={selectData}
        onChange={handleSelectCity}
        defaultOptions
        ref={selectRef}
        classNamePrefix="react-select"
        noOptionsMessage={() => 'Nenhuma cidade selecionada'}
      />
    </div>
  );
};

export default SelectCity;
