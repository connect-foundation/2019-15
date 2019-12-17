import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Select from 'components/globalComponents/Select/Select';
import GET_CATEGORIES from 'queries/category';
import { useQuery } from '@apollo/react-hooks';

CategorySetting.propTypes = {
  onChangeCategory: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  categoryRef: PropTypes.shape(useRef).isRequired,
};

export default function CategorySetting({
  onChangeCategory,
  disabled,
  categoryRef,
}) {
  const { data, loading, error } = useQuery(GET_CATEGORIES);

  if (loading)
    return (
      <>
        {'카테고리'}
        <Select disabled={disabled} />
      </>
    );
  if (error) return <></>;
  const options = Object.values(data.getCategories).map((dbData) => {
    return { text: dbData.category, value: dbData.id };
  });

  return (
    <>
      {'카테고리'}
      <Select
        disabled={disabled}
        option={options}
        onChangeSelect={onChangeCategory}
        reference={categoryRef}
        defaultOption="1"
      />
    </>
  );
}
