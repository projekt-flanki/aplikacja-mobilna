import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {
  Body,
  Button,
  Container,
  Content,
  Header,
  Icon,
  Left,
  List,
  ListItem,
  Right,
  Thumbnail,
  Title,
  Tab,
  Tabs,
} from 'native-base';
import {DrawerActions} from 'react-navigation-drawer';
import {NavigationStackProp} from 'react-navigation-stack';
import api from '../../utils/api';
import {ApiResponse} from 'apisauce';

const starUri =
  'https://cdn2.iconfinder.com/data/icons/modifiers-add-on-1-flat/48/Mod_Add-On_1-35-512.png';

type Props = {
  navigation: NavigationStackProp;
};

const RankingPage = ({navigation}: Props) => {
  const [userRanking, setUserRanking] = useState([]);

  const getStars = (stars: Number) => {
    const starListArray = [];
    for (let i = 0; i < stars; i++) {
      starListArray.push(<Thumbnail small source={{uri: starUri}} />);
    }
    console.log(starListArray.length);
    return starListArray;
  };

  useEffect(() => {
    api.getUserRanking().then(({data}: ApiResponse<any>) => {
      setUserRanking(data);
    });
  }, []);

  const [userPoints, setUserPoints] = useState([]);

  useEffect(() => {
    api.getUserPoints().then(({data}: ApiResponse<any>) => {
      setUserPoints(data);
    });
  }, []);

  return (
    <Container>
      <Header hasTabs>
        <Left>
          <Button
            transparent
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>Ranking</Title>
        </Body>
      </Header>
      <Content>
        <Tabs>
          <Tab heading="Opinie">
            {userRanking.length > 0 && (
              <List
                dataArray={userRanking}
                renderRow={data => {
                  return (
                    <ListItem key={data.id}>
                      <Left>
                        <Text> {data.username} </Text>
                      </Left>
                      <Right>
                        <View style={{flexDirection: 'row'}}>
                          {getStars(data.rating)}
                        </View>
                      </Right>
                    </ListItem>
                  );
                }}
              />
            )}
          </Tab>
          <Tab heading="Punkty">
            {userRanking.length > 0 && (
              <List
                dataArray={userPoints}
                renderRow={data => {
                  return (
                    <ListItem key={data.id}>
                      <Left>
                        <Text> {data.username} </Text>
                      </Left>
                      <Right>
                        <Text style={{flexDirection: 'row'}}>
                          {data.points}
                        </Text>
                      </Right>
                    </ListItem>
                  );
                }}
              />
            )}
          </Tab>
        </Tabs>
      </Content>
    </Container>
  );
};
export default RankingPage;

RankingPage.navigationOptions = {
  header: null,
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 22,
//   },
//   item: {
//     padding: 10,
//     fontSize: 18,
//     height: 44,
//   },
// });
