import React from 'react';
import PropTypes from 'prop-types';
import Select from 'components/globalComponents/Select/Select';
import GET_CATEGORIES from 'queries/category';
import { useQuery } from '@apollo/react-hooks';

CategorySetting.propTypes = {
  onChangeCategory: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default function CategorySetting({ onChangeCategory, disabled }) {
  const { data, loading, error } = useQuery(GET_CATEGORIES);

  if (loading)
    return (
      <>
        {'카테고리'}
        <Select disabled={disabled} />
      </>
    );
  if (error) return <></>;

  return (
    <>
      {'카테고리'}
      <Select
        disabled={disabled}
        option={
          loading
            ? []
            : Object.values(data.getCategories).map((dbData) => dbData.category)
        }
        onChangeSelect={onChangeCategory}
      />
    </>
  );
}
