import React, { useState } from 'react';
import { Select, Spin } from 'antd';

const { Option } = Select;

// Simulated API call (replace this with your actual API)
const fetchClients = async (query) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = [
        { value: '123', label: 'Client 123' },
        { value: '456', label: 'Client 456' },
        { value: '789', label: 'Client 789' },
      ].filter((item) => item.value.includes(query));
      resolve(results);
    }, 1000);
  });
};

const ClientFmIdSelect = ({
  ALLOW_ALLTEXT = false,
  multiSelect = false,
  value,
  onChange,
}) => {
  const [options, setOptions] = useState([]);
  const [fetching, setFetching] = useState(false);

  const ALL_OPTION = { value: 'ALL', label: 'ALL' };

  const handleSearch = async (searchText) => {
    if (searchText.toUpperCase() === 'ALL') {
      if (ALLOW_ALLTEXT) {
        setOptions([ALL_OPTION]);
      } else {
        setOptions([]);
      }
      return;
    }

    if (!/^\d+$/.test(searchText)) {
      setOptions([]);
      return;
    }

    setFetching(true);
    const result = await fetchClients(searchText);
    const finalOptions = ALLOW_ALLTEXT ? [ALL_OPTION, ...result] : result;
    setOptions(finalOptions);
    setFetching(false);
  };

  const handleChange = (selected) => {
    if (!multiSelect) {
      onChange?.(selected);
      return;
    }

    if (Array.isArray(selected)) {
      if (selected.includes('ALL')) {
        // If ALL selected, discard others and keep only ALL
        onChange?.(['ALL']);
      } else {
        // Remove ALL if present accidentally
        onChange?.(selected.filter((val) => val !== 'ALL'));
      }
    }
  };

  const selectedValue = multiSelect ? value || [] : value;

  return (
    <Select
      showSearch
      allowClear
      mode={multiSelect ? 'multiple' : undefined}
      placeholder="Select Client FmId"
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      value={selectedValue}
      style={{ width: '100%' }}
    >
      {options.map((opt) => (
        <Option key={opt.value} value={opt.value}>
          {opt.label}
        </Option>
      ))}
    </Select>
  );
};

export default ClientFmIdSelect;



 <ClientFmIdControl   ALLOW_ALLTEXT={true}
        multiSelect={true}
        value={selected}
        onChange={setSelected} />
