import React from 'react';
import OrderSummary from '../OrderSummary/OrderSummary';
import OrderOption from '../OrderOption/OrderOption';
import { Col, Row } from 'react-flexbox-grid';
import pricing from '../../../data/pricing.json';
import PropTypes from 'prop-types';
import Button from '../../common/Button/Button';
import { formatPrice } from '../../../utils/formatPrice';
import { calculateTotal } from '../../../utils/calculateTotal';
import settings from '../../../data/settings';

const sendOrder = (options, tripCost, tripDays, tripName, tripCountry) => {
  let orderShouldBeSend = true;

  (options.contact === '' || !options.name || options['start-date'] === '') ? orderShouldBeSend = false : null;

  if (orderShouldBeSend) {
    const totalCost = formatPrice(calculateTotal(tripCost, options));
    const payload = {
      ...options,
      totalCost,
      tripDays,
      tripName,
      tripCountry,
    };
    const url = settings.db.url + '/' + settings.db.endpoint.orders;
    const fetchOptions = {
      cache: 'no-cache',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
    fetch(url, fetchOptions)
      .then(function (response) {
        return response.json();
      }).then(function (parsedResponse) {
        const orderSummary = [];
        for(let item in parsedResponse){
          orderSummary.push(`${item}: ${parsedResponse[item]}`);
        }
        alert('Order was sent, thank you!');
      });
  } else {
    alert('Fill in all required fields!!!');
  }
};

const OrderForm = (props) => {
  const { options, setOrderOption, tripCost, tripDays, tripName, tripCountry } = props;
  return (
    <Row>
      {pricing.map(option => (
        <Col md={4} key={option.id}>
          <OrderOption
            currentValue={options[option.id]}
            {...option}
            setOrderOption={setOrderOption}
          />
        </Col>
      ))}
      <Col xs={12}>
        <OrderSummary {...props} />
        <Button onClick={() => sendOrder(
          options, tripCost, tripDays, tripName, tripCountry
        )}>Order now!</Button>
      </Col>
    </Row>
  );
};

OrderForm.propTypes = {
  options: PropTypes.object,
  setOrderOption: PropTypes.func,
  tripCost: PropTypes.string,
  tripDays: PropTypes.number,
  tripName: PropTypes.string,
  tripCountry: PropTypes.string,
};

export default OrderForm;
