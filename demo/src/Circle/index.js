import React from 'react';
import { hot } from 'react-hot-loader';
import { Circle as IbusCircle } from 'command-ui-components';

export default @hot(module) class Circle extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <div>
          <IbusCircle />
        </div>
        <div>
          <IbusCircle
            animateDuration={3000}
            backgroundColor="blue"
            color={{ 0: 'white', 50: 'yellow', 100: 'red' }}
            from={25}
            lineCap="round"
            lineType={[5, 15]}
            lineWidth={10}
            size={200}
            to={75}
          />
        </div>
      </React.Fragment>
    );
  }
}
