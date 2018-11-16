import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { View, Text, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import Icon from './Icon';
import Divider from './Divider';

const Container = styled(View)`
  width: 100%;
  padding: 15px;
  background-color: ${Colors.darkContrast};
`;

const Title = styled(Text)`
  color: white;
  font-size: 16px;
`;

const Description = styled(Text)`
  color: ${Colors.lightGrey};
  font-size: 13px;
  margin-top: 3px;
`;

const Col = styled(View)`
  flex-direction: column;
`;

const Row = styled(View)`
  flex-direction: row;
`;

const GroupListItem = ({
  iconName, name,
  description, onPress,
}) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
      <Container>
        <Row>
          {
            iconName
            && (
              <Col style={{ width: 30 }}>
                <Icon name={iconName} size={18} color={Colors.white} />
              </Col>
            )
          }
          <Col>
            <Title>{name}</Title>
            {
              description
              && <Description>{description}</Description>
            }
          </Col>
        </Row>
      </Container>
      <Divider />
    </View>
  </TouchableOpacity>
);

GroupListItem.propTypes = {
  iconName: PropTypes.string,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  onPress: PropTypes.func,
};

GroupListItem.defaultProps = {
  iconName: null,
  description: null,
  onPress: () => null,
};

export default GroupListItem;