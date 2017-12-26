/**
 * @module Progress/Component
 */
import React from 'react';
import {
  object,
  number,
  string,
  shape,
  oneOf,
  oneOfType,
  } from 'prop-types';
import merge from 'deepmerge';

/**
 * Progress Component
 */
export default class Component extends React.Component {
  static propTypes = {
    width: number,
    height: number,
    arc: shape({
      radius: number,
      percentage: number,
      lineStyle: shape({
        type: oneOf(['solid', 'dashed']),
        width: number,
        // Object represents color stops, i.e. {0: 'red', 0.5: 'green', 1: 'blue'}
        color: oneOfType([string, object]),
      }),
    }),
    backgroundColor: string,
    style: object,
  };

  static defaultProps = {
    width: 0,
    height: 0,
    arc: {
      radius: 0,
      percentage: 1,
      lineStyle: {
        type: 'solid',
        width: 2,
        color: 'red',
      },
    },
    backgroundColor: 'transparent',
    style: null,
  };

  /**
   * Contstructor function
   * Deep merge props with default values
   * @param {Object} props - Props
   */
  constructor(props) {
    super(props);

    this.mergedProps = merge(Component.defaultProps, props);
  }

  /**
   * Once mounted draw arc with canvas
   */
  componentDidMount() {
    this.draw();
  }

  /**
   * Compare old and new merged Props and determine should update or not
   * @param {Object} nextProps - Props
   * @return {boolean} - Should update React or not
   */
  shouldComponentUpdate(nextProps) {
    // Construct new props
    const newMergedProps = merge(Component.defaultProps, nextProps);

    // Compare old and new props
    if (true) { // Props are different
      this.mergedProps = newMergedProps;
      return true; // Update UI
    }
  }

  /**
   * Once updated draw arc with canvas
   */
  componentDidUpdate() {
    this.draw();
  }

  /**
   * Draw arc
   */
  draw() {
    const {
      width,
      height,
      arc: {
        radius,
        percentage,
        lineStyle: {
          type: lineType,
          width: lineWidth,
          color: lineColor,
        },
      },
      backgroundColor,
    } = this.mergedProps;
    const centre = {
      x: width / 2,
      y: height / 2,
    };

    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx = this.canvas.getContext('2d');

    // Draw Background
    this.ctx.fillStyle = backgroundColor;
    this.ctx.fillRect(0, 0, width, height);

    // Draw arc
    if (typeof lineColor === 'object') { // Process color stops
      this.drawGradientArcs(centre, radius, percentage, lineColor, lineWidth);
    } else {
      const startAngle = this.getAngle(0);
      const endAngle = this.getAngle(percentage);
      this.drawSoleArc(centre, radius, startAngle, endAngle, lineColor, lineWidth);
    }
  }

  /**
   * Draw a single segment colourful arc
   * @param  {object} centre - Centre point
   * @param  {number} centre.x - Centre point
   * @param  {number} centre.y - Centre point
   * @param  {number} radius - Arc radius
   * @param  {number} startAngle - Start angle
   * @param  {number} endAngle - End angle
   * @param  {string} lineColor - Line colour
   * @param  {number} lineWidth - Line width
   */
  drawSoleArc(centre, radius, startAngle, endAngle, lineColor, lineWidth) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = lineColor;
    this.ctx.lineWidth = lineWidth;
    this.ctx.lineCap = 'round';
    this.ctx.arc(centre.x, centre.y, radius, startAngle, endAngle);
    this.ctx.stroke();
  }

  /**
   * Draw multiple segments gradient colourful arcs
   * @param  {object} centre - Centre point
   * @param  {number} centre.x - Centre point
   * @param  {number} centre.y - Centre point
   * @param  {number} radius - Arc radius
   * @param  {number} percentage - Angle percentage
   * @param  {object} gradientColors - Gradient colours
   * @param  {number} lineWidth - Line width
   */
  drawGradientArcs(centre, radius, percentage, gradientColors, lineWidth) {
    const getPosition = (angle) => {
      return {
        x: (centre.x + Math.cos(angle) * radius).toFixed(2),
        y: (centre.y + Math.sin(angle) * radius).toFixed(2),
      };
    };

    const arcStartAngle = this.getAngle(0);
    const arcEndAngle = this.getAngle(percentage);
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
          this.drawSoleArc(centre, radius, segmentStartAngle, segmentEndAngle, lineGradient, lineWidth);
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
   * Render Progress component
   * @return {Component}
   */
  render() {
    return (
      <canvas ref={(c) => {this.canvas = c;}} style={this.mergedProps.style} />
    );
  }
}
