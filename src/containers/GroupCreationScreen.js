import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import styled from 'styled-components';
import PrimaryButton from '../components/PrimaryButton';
import MultiSelectList from '../components/MultiSelectList';
import Input from '../components/Input';
import { getFriends } from '../services/FriendsService';
import { createGroup } from '../services/GroupsServices';
import PaddedLayout from '../layout/PaddedLayout';
import Spinner from '../components/Spinner';
import { showOkAlert } from '../services/AlertService';

const ButtonContainer = styled(View)`
  align-items: center;
  margin-top: 20px;
`;

// const items = [
//   {
//     avatar_url: 'https://amp.businessinsider.com/images/5899ffcf6e09a897008b5c04-750-750.jpg',
//     name: 'John',
//     _id: '10',
//   },
//   {
//     avatar_url: 'https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg',
//     name: 'Rose',
//     _id: '17',
//   },
//   {
//     avatar_url: 'data:image/jpeg;base64,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',
//     name: 'Julia',
//     _id: '13',
//   },
//   {
//     avatar_url: 'data:image/jpeg;base64,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',
//     name: 'Josie',
//     _id: '14',
//   },
//   {
//     avatar_url: 'http://www.sarkarinaukrisearch.in/wp-content/uploads/2017/02/cute-girls-profile-pics-1024x724.jpg',
//     name: 'Richard',
//     _id: '15',
//   },
//   {
//     avatar_url: 'http://img2.thejournal.ie/inline/2470754/original?width=428&version=2470754',
//     name: 'Ronald',
//     _id: '16',
//   },
// ];

class GroupCreationScreen extends React.Component {
  constructor(props) {
    super(props);
    // Setting initial state
    this.state = {
      groupName: '',
      selectedFriendIds: [],
      friends: [],
      isGettingFriends: true,
      errorGettingFriends: false,
      isCreatingGroup: false,
    };
  }

  componentDidMount() {
    this.getFriends();
  }

  async getFriends() {
    try {
      // Setting is loading
      this.setState({ isGettingFriends: true });
      // Getting friends
      const { friends } = await getFriends();
      this.setState({ friends, isGettingFriends: false });
    } catch (error) {
      // Setting error
      this.setState({ errorGettingFriends: true, isGettingFriends: false });
    }
  }

  validate() {
    const { groupName, selectedFriendIds } = this.state;

    if (!groupName) {
      showOkAlert('No Group Name', 'Please, fill group name');
      return false;
    }
    if (selectedFriendIds.length === 0) {
      showOkAlert('No friend selected', 'Please, select at least one friend');
      return false;
    }

    return true;
  }

  async handleCreate() {
    try {
      // Validating fields
      if (!this.validate()) return;
      // Setting is loading
      this.setState({ isCreatingGroup: true });
      // Getting props
      const { navigation } = this.props;
      // Getting state
      const { groupName, selectedFriendIds } = this.state;
      // Creating group
      await createGroup(groupName, selectedFriendIds);
      // Navigating to GroupList
      navigation.navigate('GroupList');
    } catch (error) {
      // Setting that is not loading
      this.setState({ isCreatingGroup: false });
      // Showing error message
      showOkAlert('Error Creating', 'Error creating group, please, try again');
    }
  }

  render() {
    const {
      selectedFriendIds, groupName,
      isGettingFriends, isCreatingGroup,
      friends, errorGettingFriends,
    } = this.state;

    if (isGettingFriends || isCreatingGroup) {
      return (
        <PaddedLayout>
          <Spinner />
        </PaddedLayout>
      );
    }

    if (errorGettingFriends) {
      return (
        <PaddedLayout />
      );
    }

    return (
      <PaddedLayout>
        <View style={{ marginTop: 20 }}>
          <Input
            onChangeText={text => this.setState({ groupName: text })}
            value={groupName}
            placeholder="Ex: Friends"
            label="Group name"
          />
        </View>
        <MultiSelectList
          items={friends}
          selectedItemsIds={selectedFriendIds}
          onChangeSelected={newSelected => this.setState({ selectedFriendIds: newSelected })}
        />
        <ButtonContainer>
          <PrimaryButton
            title="Create"
            onPress={() => this.handleCreate()}
            style={{ width: 200 }}
          />
        </ButtonContainer>
      </PaddedLayout>
    );
  }
}

GroupCreationScreen.navigationOptions = {
  title: 'Create a Group',
};

GroupCreationScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default GroupCreationScreen;
