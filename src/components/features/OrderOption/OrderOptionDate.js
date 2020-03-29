import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';

import styles from './OrderOption.scss';

import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const OrderOptionDate = ({setOptionValue, currentValue}) => {

  const handleChange = (date) => {
    setOptionValue(`${date.toLocaleDateString()}`);
  };

  return (
    <div className={styles.inputSmall}>
      <DatePicker
        value={currentValue}
        placeholderText={'Select a date'}
        onChange={date => handleChange(date)}
      />
    </div>
  );
};

OrderOptionDate.propTypes = {
  setOptionValue: PropTypes.func,
  currentValue: PropTypes.string,
};

export default OrderOptionDate;
