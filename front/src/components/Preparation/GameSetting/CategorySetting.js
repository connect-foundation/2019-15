import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Select from 'components/globalComponents/Select/Select';
import GET_CATEGORIES from 'queries/category';
import { useQuery } from '@apollo/react-hooks';

CategorySetting.propTypes = {
  onChangeCategory: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  categoryRef: PropTypes.shape(useRef).isRequired,
  defaultOption: PropTypes.string.isRequired,
};

export default function CategorySetting({
  onChangeCategory,
  disabled,
  categoryRef,
  defaultOption,
}) {
  const { data, loading, error } = useQuery(GET_CATEGORIES);

  if (loading)
    return (
      <>
        {'카테고리'}
        <Select disabled={disabled} reference={categoryRef} />
      </>
    );

  if (error) return <Select disabled={disabled} reference={categoryRef} />;

  const options = Object.values(data.getCategories).map((dbData) => {
    return { text: dbData.category, value: dbData.id };
  });
  options.splice(0, 0, { text: '전체', value: null });

  return (
    <>
      {'카테고리'}
      <Select
        disabled={disabled}
        option={options}
        onChangeSelect={onChangeCategory}
        reference={categoryRef}
        defaultOption={defaultOption}
      />
    </>
  );
}
