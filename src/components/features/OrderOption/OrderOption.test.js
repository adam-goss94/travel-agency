import React from 'react';
import {shallow} from 'enzyme';
import OrderOption from './OrderOption';
import DatePicker from 'react-datepicker';

describe('Component OrderOption', () => {
  it('should render without crashing', () => {
    const component = shallow(<OrderOption type='dropdown' name='name'/>);
    expect(component).toBeTruthy();
  });

  it('should return empty object if called without required props', () => {
    const component = shallow(<OrderOption />);
    expect(component).toEqual({});
  });

  it('should render name properly', () =>{
    const expectedName = 'test';
    const component = shallow(<OrderOption type='dropdown' name={expectedName}/>);

    expect(component.find('.title').text()).toEqual(expectedName);
  });
});

const optionTypes = {
  dropdown: 'OrderOptionDropdown',
  icons: 'OrderOptionIcons',
  checkboxes: 'OrderOptionCheckboxes',
  number: 'OrderOptionNumber',
  text: 'OrderOptionText',
  date: 'OrderOptionDate',
};

const mockProps = {
  id: 'abc',
  name: 'Lorem',
  values: [
    {id: 'aaa', icon: 'h-square', name: 'Lorem A', price: 0},
    {id: 'xyz', icon: 'h-square', name: 'Lorem X', price: 100},
  ],
  required: false,
  currentValue: 'aaa',
  price: '50%',
  limits: {
    min: 0,
    max: 6,
  },
};

const mockPropsForType = {
  dropdown: {},
  icons: {},
  checkboxes: {currentValue: [mockProps.currentValue]},
  number: {currentValue: 1},
  text: {},
  date: {},
};

const testValue = mockProps.values[1].id;
const testValueNumber = 3;

for(let type in optionTypes){
  describe(`Component OrderOption with type=${type}`, () => {
    /* test setup */
    let component;
    let subcomponent;
    // eslint-disable-next-line no-unused-vars
    let renderedSubcomponent;
    let mockSetOrderOption;

    beforeEach(() => {
      mockSetOrderOption = jest.fn();
      component = shallow(
        <OrderOption
          type={type}
          setOrderOption={mockSetOrderOption}
          {...mockProps}
          {...mockPropsForType[type]}
        />
      );
      subcomponent = component.find(optionTypes[type]);
      renderedSubcomponent = subcomponent.dive();
    });


    /* common tests */
    it(`renders ${optionTypes[type]}`, () => {
      expect(subcomponent).toBeTruthy();
      expect(subcomponent.length).toBe(1);
    });

    /* type-specific tests */
    switch (type) {
      case 'dropdown': {
        it('contains select and options', () => {
          const select = renderedSubcomponent.find('select');
          expect(select.length).toBe(1);

          const emptyOption = select.find('option[value=""]').length;
          expect(emptyOption).toBe(1);

          const options = select.find('option').not('[value=""]');
          expect(options.length).toBe(mockProps.values.length);
          expect(options.at(0).prop('value')).toBe(mockProps.values[0].id);
          expect(options.at(1).prop('value')).toBe(mockProps.values[1].id);
        });

        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('select').simulate('change', {currentTarget: {value: testValue}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });

        break;
      }
      case 'icons': {
        it('contains divs with icon class', () => {
          const iconDivs = renderedSubcomponent.find('.icon');
          expect(iconDivs.length).toBe(mockProps.values.length + 1);
        });

        it('should run setOrderOption function on click', () => {
          renderedSubcomponent.find('.icon').last().simulate('click');
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });

        break;
      }
      case 'checkboxes': {
        it('contains div with checkboxes class and checkboxes ', () => {
          const checkboxesDiv = renderedSubcomponent.find('.checkboxes');
          expect(checkboxesDiv.length).toBe(1);

          const checkboxesInputs = renderedSubcomponent.find('input[type="checkbox"]');
          expect(checkboxesInputs.at(0).prop('value')).toBe(mockProps.values[0].id);
          expect(checkboxesInputs.at(1).prop('value')).toBe(mockProps.values[1].id);
        });

        it('should run setOrderOption function on click', () => {
          renderedSubcomponent.find(`input[value="${testValue}"]`).simulate('change', { currentTarget: { checked: true } });
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: [mockProps.currentValue, testValue] });
        });

        break;
      }

      case 'number': {
        it('contains div with number class and input', () => {
          const divNumber = renderedSubcomponent.find('.number');
          const inputNumber = renderedSubcomponent.find('input[type="number"]');

          expect(divNumber.length).toBe(1);
          expect(inputNumber.length).toBe(1);
        });

        it('should run SetOrderOption function on change', () => {
          renderedSubcomponent.find('input[type="number"]').simulate('change', { currentTarget: { value: testValueNumber } });
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValueNumber });
        });

        break;
      }

      case 'text': {
        it('contains div with number class and text input', () => {
          const divNumber = renderedSubcomponent.find('.number');
          const inputText = renderedSubcomponent.find('input[type="text"]');

          expect(divNumber.length).toBe(1);
          expect(inputText.length).toBe(1);

          expect(inputText.prop('value')).toBe(mockProps.values[0].id);
        });

        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('input[type="text"]').simulate('change', {currentTarget: {value: testValue}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });

        break;
      }

      case 'date': {
        it('contains Datepicker', () => {
          expect(renderedSubcomponent.find(DatePicker).length).toBe(1);
        });

        it('should run SetOrderOption function on change', () => {
          renderedSubcomponent.find(DatePicker).simulate('change', testValue);
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }
    }
  });
}
