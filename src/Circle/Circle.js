import React from 'react';
import {
  arrayOf,
  number,
  object,
  oneOf,
  oneOfType,
  string,
} from 'prop-types';
import { orderBy } from 'lodash';
import {
  animate,
  isObject,
} from '../util';

/**
 * Convert angle to Math.PI.
 * @param  {number} angle - Angle takes value from 0 to 100.
 * @return {number} - Angle in Math.PI.
 */
function getAngle(angle) {
  return angle / 100 * 2 * Math.PI - Math.PI / 2;
}

/**
 * @param  {Object} centre - Circle centre point coordinate.
 * @param  {number} centre.x
 * @param  {number} centre.y
 * @param  {number} angle
 * @param  {number} radius
 * @return {Object}
 */
function getPosition(centre, angle, radius) {
  return {
    x: (centre.x + Math.cos(angle) * radius).toFixed(2),
    y: (centre.y + Math.sin(angle) * radius).toFixed(2),
  };
}

export default class Circle extends React.PureComponent {
  static propTypes = {
    /* Animate duration in milliseconds. */
    animateDuration: number,
    /* Has transparent background as default. */
    backgroundColor: string,
    /**
     * Colour or colour stops of the circle. Minimum three colour stops.
     * i.e. {0: 'red', 50: 'green', 100: 'blue'}.
     */
    color: oneOfType([object, string]),
    /* Circle arc starts from this percentage value. Min: 0, Max: 100. */
    from: number,
    /* Circle start and end point styles. */
    lineCap: oneOf(['butt', 'round', 'square']),
    /**
     * Circle line type.
     * An Array of numbers which specify distances to alternately draw a line
     * and a gap (in coordinate space units).
     * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash
     */
    lineType: oneOfType([arrayOf(number), string]),
    /* Circle arc line width. */
    lineWidth: number,
    /* Size of the circle. size = circleWidth = circleHeight. */
    size: number,
    /**
     * Circle arc ends at this percentage value. Min 0, Max: 100.
     * Normally its a value greater than from.
     */
    to: number,
  };

  static defaultProps = {
    animateDuration: 1000,
    backgroundColor: 'transparent',
    color: 'black',
    from: 0,
    lineCap: 'butt',
    lineType: 'solid',
    lineWidth: 2,
    size: 100,
    to: 100,
  };

  canvas = React.createRef();

  /* Once mounted draw arc with canvas. */
  componentDidMount() {
    this.refresh();
  }

  /* Update canvas. */
  componentDidUpdate() {
    this.refresh();
  }

  /* Draw circle arc. */
  draw(from, to) {
    const {
      size,
      color,
      backgroundColor,
    } = this.props;

    /* Clear canvas. */
    this.canvas.current.width = size;

    /* Draw Background. */
    this.ctx.fillStyle = backgroundColor;
    this.ctx.fillRect(0, 0, size, size);

    /* Draw arc. */
    if (isObject(color)) { /* Draw with gradients. */
      this.drawGradientArcs(from, to);
    } else { /* Draw with sole colour. */
      const startAngle = getAngle(from);
      const endAngle = getAngle(to);
      this.drawSoleArc(startAngle, endAngle, color);
    }
  }

  /* Draw multiple circle arcs with gradient colours. */
  drawGradientArcs(from, to) {
    const {
      color: gradientColors,
      lineWidth,
      size,
    } = this.props;

    const centre = {
      x: size / 2,
      y: size / 2,
    };

    /* Line width offsets radius. */
    const radius = (size - lineWidth) / 2;

    const arcStartAngle = getAngle(from);
    const arcEndAngle = getAngle(to);
    /* Mark where previous segment ends. Used to determine whether to draw new segment. */
    let arcPrviousEndAngle = arcStartAngle;

    /* Get gradient steps and order by asc. */
    const gradientSteps = orderBy(
      Object.keys(gradientColors).map((breakPoint) => {
        /* Convert string to numbers. */
        return +breakPoint;
      }),
      /**
       * Using orderBy desc is more human readable,
       * although the following line is meaningless here.
       */
      (breakPoint) => breakPoint,
      ['asc'],
    );

    /**
     * Draw each segment.
     * Loop through all colour stops except the last one.
     */
    gradientSteps.slice(0, -1).forEach((gradientStartStep, index) => {
      /* Number between 0 and 100. */
      const gradientEndStep = gradientSteps[index + 1];

      /* Get gradient start and end point positions by gradient colour steps. */
      const gradientStartAngle = getAngle(gradientStartStep);
      const gradientEndAngle = getAngle(gradientEndStep);
      const gradientStartPosition = getPosition(centre, gradientStartAngle, radius);
      const gradientEndPosition = getPosition(centre, gradientEndAngle, radius);

      /* Create gradient object with start and end points. */
      const linearGradient = this.ctx.createLinearGradient(
        gradientStartPosition.x,
        gradientStartPosition.y,
        gradientEndPosition.x,
        gradientEndPosition.y,
      );

      /* Inject start and end colour names into gradient object. */
      const gradientStartColor = gradientColors[gradientStartStep];
      const gradientEndColor = gradientColors[gradientEndStep];
      linearGradient.addColorStop(0, gradientStartColor);
      linearGradient.addColorStop(1, gradientEndColor);

      /**
       * Compare circle arc angle and colour stop angle.
       * Draw circle arc only if this colour stop contains a segment of circle arc.
       */
      if (arcPrviousEndAngle >= gradientStartAngle) {
        const segmentStartAngle = Math.max(gradientStartAngle, arcStartAngle);
        const segmentEndAngle = Math.min(gradientEndAngle, arcEndAngle);

        /* Next segment starts here. */
        arcPrviousEndAngle = segmentEndAngle;

        /* Draw arc. */
        this.drawSoleArc(segmentStartAngle, segmentEndAngle, linearGradient);
      }
    });
  }

  /**
   * Manipulate canvas api to draw an arc with the given colour.
   * @param  {number} startAngle - Start angle.
   * @param  {number} endAngle - End angle.
   * @param  {string} lineColor - Line colour.
   */
  drawSoleArc(startAngle, endAngle, lineColor) {
    const {
      lineCap,
      lineType,
      lineWidth,
      size,
    } = this.props;

    const centre = {
      x: size / 2,
      y: size / 2,
    };

    /* Line width offsets radius. */
    const radius = (size - lineWidth) / 2;

    this.ctx.beginPath();
    this.ctx.strokeStyle = lineColor;
    this.ctx.lineWidth = lineWidth;
    this.ctx.lineCap = lineCap;
    if (lineType !== 'solid') { /* Dash line. */
      this.ctx.setLineDash(lineType);
    }
    this.ctx.arc(centre.x, centre.y, radius, startAngle, endAngle);
    this.ctx.stroke();
  }

  /* Redraw circle with animation. */
  refresh() {
    const {
      size,
      from,
      to,
      animateDuration,
    } = this.props;

    this.canvas.current.width = size;
    this.canvas.current.height = size;
    this.ctx = this.canvas.current.getContext('2d');

    if (animateDuration !== 0) {
      animate(
        from,
        to,
        animateDuration,
        this.draw.bind(this, from),
      );
    } else {
      this.draw(from, to);
    }
  }

  render() {
    return (
      <canvas ref={this.canvas} />
    );
  }
}
