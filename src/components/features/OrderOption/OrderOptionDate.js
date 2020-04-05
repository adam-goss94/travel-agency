import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';

import styles from './OrderOption.scss';

import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const OrderOptionDate = ({setOptionValue, currentValue}) => (
  <div className={styles.inputSmall}>
    <DatePicker
      value={currentValue}
      placeholderText={'Select a date'}
      onChange={setOptionValue}
      selected={currentValue}
    />
  </div>
);

OrderOptionDate.propTypes = {
  setOptionValue: PropTypes.func,
  currentValue: PropTypes.string,
};

export default OrderOptionDate;
