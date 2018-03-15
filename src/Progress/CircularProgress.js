/**
 * @module Progress/CircularProgress
 */
import React from 'react';
import {
  object,
  number,
  string,
  oneOf,
  oneOfType,
  arrayOf,
  } from 'prop-types';
import equal from 'deep-equal';

import {animate} from '../Util';

/**
 * Circular Progress Component
 */
export default class CircularProgress extends React.Component {
  static propTypes = {
    type: oneOfType([string, arrayOf(number)]),
    size: number,
    from: number,
    to: number,
    width: number,
    lineCap: oneOf(['butt', 'round', 'square']),
    // Object represents color stops, i.e. {0: 'red', 0.5: 'green', 1: 'blue'}
    color: oneOfType([string, object]),
    backgroundColor: string,
    animateDuration: number,
  };

  static defaultProps = {
    type: 'solid',
    size: 0,
    from: 0,
    to: 1,
    width: 2,
    lineCap: 'butt',
    color: 'black',
    backgroundColor: 'transparent',
    animateDuration: 0,
  };

  /**
   * Contstructor function
   * Deep merge props with default values
   * @param {Object} props - Props
   */
  constructor(props) {
    super(props);

    this.props = props;
  }

  /**
   * Once mounted draw arc with canvas
   */
  componentDidMount() {
    this.refresh();
  }

  /**
   * Never allow react to update canvas dom
   * Instead, manually compare old and new props
   * Execute pure javascript canvas api
   * To refresh image
   * @param {Object} nextProps - Props
   * @return {boolean} - Should update React or not
   */
  shouldComponentUpdate(nextProps) {
    // Compare old and new props
    if (equal(this.props, nextProps) === false) {
      this.props = nextProps; // Assign new props
      this.refresh(); // Totally refresh canvas
    }

    return false; // Never allow react to update canvas dom
  }

  /**
   * Draw with canvas api from scratch
   */
  refresh() {
    const {
      size,
      from,
      to,
      animateDuration,
    } = this.props;

    this.canvas.width = size;
    this.canvas.height = size;
    this.ctx = this.canvas.getContext('2d');

    if (animateDuration !== 0) {
      animate({
        from,
        to,
        duration: animateDuration,
        callback: this.draw.bind(this),
      });
    } else {
      this.draw({from, to});
    }
  }

  /**
   * Draw arc
   */
  draw({from, to}) {
    const {
      size,
      color,
      backgroundColor,
    } = this.props;

    this.canvas.width = size; // Clear canvas

    // Draw Background
    this.ctx.fillStyle = backgroundColor;
    this.ctx.fillRect(0, 0, size, size);

    // Draw arc
    if (typeof color === 'object') { // Draw with gradients
      this.drawGradientArcs({from, to});
    } else { // Draw with sole colour
      const startAngle = this.getAngle(from);
      const endAngle = this.getAngle(to);
      this.drawSoleArc(startAngle, endAngle, color);
    }
  }

  /**
   * Draw a single segment colourful arc
   * @param  {number} startAngle - Start angle
   * @param  {number} endAngle - End angle
   * @param  {string} lineColor - Line colour
   */
  drawSoleArc(startAngle, endAngle, lineColor) {
    const {
      size,
      type,
      width,
      lineCap,
    } = this.props;
    const centre = {
      x: size / 2,
      y: size / 2,
    };
    const radius = (size - width) / 2; // line width offsets radius

    this.ctx.beginPath();
    this.ctx.strokeStyle = lineColor;
    this.ctx.lineWidth = width;
    this.ctx.lineCap = lineCap;
    if (type !== 'solid') { // Dash line
      this.ctx.setLineDash(type);
    }
    this.ctx.arc(centre.x, centre.y, radius, startAngle, endAngle);
    this.ctx.stroke();
  }

  /**
   * Draw multiple segments gradient colourful arcs
   */
  drawGradientArcs({from, to}) {
    const getPosition = (angle) => {
      return {
        x: (centre.x + Math.cos(angle) * radius).toFixed(2),
        y: (centre.y + Math.sin(angle) * radius).toFixed(2),
      };
    };

    const {
      size,
      width,
      color: gradientColors,
    } = this.props;
    const centre = {
      x: size / 2,
      y: size / 2,
    };
    const radius = (size - width) / 2; // line width offsets radius

    const arcStartAngle = this.getAngle(from);
    const arcEndAngle = this.getAngle(to);
    // Mark where previous segment ends
    // Used to determine should draw new segment
    let arcPrviousEndAngle = arcStartAngle;

    // Get gradient steps and order by asc
    const gradientSteps = Object.keys(gradientColors)
      .map((item) => { // Convert string to numbers
        return Number(item);
      })
      .sort(); // Sort keys by asc

    gradientSteps.forEach((gradientStartStep, index) => { // draw each segment
      if (index !== gradientSteps.length - 1) {
        const gradientEndStep = gradientSteps[index + 1]; // i.e. 0 || 0.5 || 1

        // Get gradient start and end point position with x and y values
        const gradientStartAngle = this.getAngle(gradientStartStep);
        const gradientEndAngle = this.getAngle(gradientEndStep);
        const gradientStartPoint = getPosition(gradientStartAngle);
        const gradientEndPoint = getPosition(gradientEndAngle);
        // Construct gradient object with start and end points
        const lineGradient = this.ctx.createLinearGradient(
          gradientStartPoint.x,
          gradientStartPoint.y,
          gradientEndPoint.x,
          gradientEndPoint.y
        );

        // Inject start and end colours into gradient object
        // colour names in string, i.e. blue
        const gradientStartColor = gradientColors[gradientStartStep];
        const gradientEndColor = gradientColors[gradientEndStep];
        lineGradient.addColorStop(0, gradientStartColor);
        lineGradient.addColorStop(1, gradientEndColor);

        // Calculate arc start and end angle
        if (arcPrviousEndAngle >= gradientStartAngle) {
          // Should draw arc because arc is longer than gradient
          const segmentStartAngle = gradientStartAngle;
          const segmentEndAngle = gradientEndAngle < arcEndAngle
            ? gradientEndAngle // Total arc is longer than gradient length
            : arcEndAngle; // Total arc is shorter than gradient length

          // Next segment should starts from here
          arcPrviousEndAngle = segmentEndAngle;

          // Draw arc
          this.drawSoleArc(segmentStartAngle, segmentEndAngle, lineGradient);
        } else { // Should NOT draw arc because arc is shorter than gradient

        }
      }
    });
  }

  /**
   * Convert angle in percentage to Math.PI
   * @param  {number} percentage - Angle in percentage, takes value from 0 to 1
   * @return {number} - Angle in Math.PI
   */
  getAngle(percentage) {
    return percentage * 2 * Math.PI - Math.PI / 2;
  }

  /**
   * Render Circular Progress component
   * @return {Component}
   */
  render() {
    return (
      <canvas ref={(c) => {
        this.canvas = c;
      }} />
    );
  }
}
