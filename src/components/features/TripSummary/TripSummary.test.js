import React from 'react';
import {shallow} from 'enzyme';
import TripSummary from './TripSummary';

describe('Component TripSummary', () => {
  it('should render without crashing', () => {
    const component = shallow(<TripSummary id={'id'} image={'image.jpg'} name={'name'} cost={'cost'} days={2} tags={['1','2']}/>);
    expect(component).toBeTruthy();
  });

  it('should throw error without required props', () => {
    expect(() => shallow(<TripSummary />)).toThrow();
  });

  it('should render correct link', () => {
    const linkText = 'abc';
    const expectedLink = '/trip/abc';

    const component = shallow(<TripSummary id={linkText} image={'image.jpg'} name={'name'} cost={'cost'} days={2} tags={['1','2']}/>);

    expect(component.find('Link').prop('to')).toEqual(expectedLink);
  });

  it('should render image with correct src and alt', () => {
    const expectedSrc = 'image.jpg';
    const expectedAlt = 'Image description';

    const component = shallow(<TripSummary id={'id'} image={expectedSrc} name={expectedAlt} cost={'cost'} days={2} tags={['1','2']}/>);

    expect(component.find('img').prop('src')).toEqual(expectedSrc);
    expect(component.find('img').prop('alt')).toEqual(expectedAlt);
  });

  it('should render correctly props: name, cost, days', () => {
    const expectedName = 'ExampleName';
    const expectedCost = '12345';
    const expectedDays = 3;
    const component = shallow(<TripSummary id={'id'} image={'image.jpg'} name={expectedName} cost={expectedCost} days={expectedDays} tags={['1','2']}/>);

    expect(component.find('.title').text()).toEqual(expectedName);
    expect(component.find('.details').childAt(0).text()).toEqual(`${expectedDays} days`);
    expect(component.find('.details').childAt(1).text()).toEqual(`from ${expectedCost}`);
  });

  it('renders tags properly', () => {
    const tagVariants = ['1', '2', '3'];
    const component = shallow(<TripSummary id={'id'} image={'image.jpg'} name={'name'} cost={'cost'} days={2} tags={tagVariants} />);

    for(let variant in tagVariants){
      expect(component.find('.tag').at(variant).text()).toEqual(tagVariants[variant]);
    }
  });

  it('should not render div with .tags class if prop types is empty', () =>{
    const component = shallow(<TripSummary id={'id'} image={'image.jpg'} name={'name'} cost={'cost'} days={2} tags={[]} />);
    expect(component.find('.tags').exists()).toEqual(false);
  });
});
