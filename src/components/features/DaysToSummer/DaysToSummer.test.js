import React from 'react';
import {shallow} from 'enzyme';
import DaysToSummer from './DaysToSummer';

const select = {
  daysDescription: '.daysDescription',
};

const mockProps = {
  daysDescription: 'XXX days to summer',
};

beforeAll(() => {
  const utilsModule = jest.requireActual('../../../utils/formatDays.js');
  utilsModule.formatDays = jest.fn(days => days);
});

const trueDate = Date;
const mockDate = customDate => class extends Date {
  constructor(...args) {
    if(args.length) {
      super(...args);
    } else {
      super(customDate);
    }
    return this;
  }
  static now(){
    return (new Date(customDate)).getTime();
  }
};

describe('Component DaysToSummer', () => {
  it('should render without crashing', () => {
    const component = shallow (<DaysToSummer />);
    expect(component).toBeTruthy();
  });

  it('should render description', () => {
    const component = shallow (<DaysToSummer />);
    expect(component.exists(select.daysDescription)).toEqual(true);
  });

});

const checkDaysAtDate = (date, expectedDescription) => {
  it(`should show correct at ${date}`, () => {
    global.Date = mockDate(`${date}T00:00:00.135Z`);

    const component = shallow(<DaysToSummer {...mockProps} />);
    const renderedData = component.find(select.daysDescription).text();
    expect(renderedData).toEqual(expectedDescription);

    global.Date = trueDate;
  });
};

describe('Component DaysToSummer with mocked Date', () => {
  checkDaysAtDate('2019-12-25', '179');
  checkDaysAtDate('2018-10-01', '263');
  checkDaysAtDate('2019-06-20', '1');
});
