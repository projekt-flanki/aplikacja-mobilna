import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {
  Body,
  Button,
  Container,
  Content,
  Header,
  Icon,
  Left,
  Title,
} from 'native-base';
import {DrawerActions} from 'react-navigation-drawer';
import {NavigationStackProp} from 'react-navigation-stack';

type Props = {
  navigation: NavigationStackProp;
};

const TempPage = ({navigation}: Props) => {
  return (
    <Container>
      <Header>
        <Left>
          <Button
            transparent
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>In progress</Title>
        </Body>
      </Header>
      <Content>
        <Text>In progress</Text>
      </Content>
    </Container>
  );
};
export default TempPage;

TempPage.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
