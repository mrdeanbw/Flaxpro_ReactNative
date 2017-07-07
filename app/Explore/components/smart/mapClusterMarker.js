import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Text } from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class MapClusterMarker extends Component {

  setNativeProps(props) {
    this.refs['marker'].setNativeProps(props);
  }

  render() {
    const { circleColour, textColour } = this.props;

    if (!this.props.hasOwnProperty('properties') ||
      !this.props.properties.hasOwnProperty('cluster') ||
      !this.props.properties.cluster)
    {
      return (
        <Icon ref="marker" name="place" size={24} color={circleColour} />
      );
    }

    const pointCount = this.props.properties.point_count_abbreviated;
    const height = 50;
    const width = 50;
    const fontSize = 20;

    return (
      <View ref="marker">
        <Svg
          height={height}
          width={width}
        >
          <Circle
            cx={width / 2}
            cy={height / 2}
            strokeWidth={0}
            r="25"
            fill={circleColour}
            fillOpacity={0.5}
          />
          <Circle
            cx={width / 2}
            cy={height / 2}
            strokeWidth={0}
            r="20"
            fill={circleColour}
          />
          <Text
            fill={textColour}
            fontSize={fontSize}
            // fontWeight="bold"
            strokeWidth={0}
            x={width / 2}
            y={(height / 2) - (fontSize / 2)}
            dy={fontSize * -0.25}
            textAnchor="middle"
          >
            {pointCount}
          </Text>
        </Svg>
      </View>
    );
  }
}

MapClusterMarker.propTypes = {
  circleColour: React.PropTypes.string,
  textColour: React.PropTypes.string,
};

MapClusterMarker.defaultProps = {
  circleColour: "#333", // #2b87a2
  textColour: 'white'
};