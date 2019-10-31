import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import {Body, Button, Container, Content, Header, Icon, Left, List, ListItem, Right, Title} from "native-base";
import {DrawerActions} from "react-navigation-drawer";
import api from "../utils/api";
import {NavigationStackProp} from "react-navigation-stack";
import HomeScreen from "./HomeScreen";

type Props = {
    navigation: NavigationStackProp;
};
const routes = [{name: "Wydarzenie 1", route: ""}, {name: "Wydarzenie 2", route: ""}, {name: "Wydarzenie 3", route: ""}, {name: "Wydarzenie 4", route: ""}, ];


const MyEvents = ({navigation}: Props) => {
    const logout = () => {
        navigation.navigate("AuthStack");
        api.logout();
    };

        return (
            <Container>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                        >
                            <Icon name="menu"/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Twoje wydarzenia</Title>
                    </Body>
                    <Right>
                        <Button onPress={logout} hasText transparent>
                            <Text>Wyloguj się</Text>
                        </Button>
                    </Right>
                </Header>
                <Content
                >
                    <List
                        dataArray={routes}
                        renderRow={data => {
                            return (
                                <ListItem
                                    // button
                                    // onPress={() => navigation.navigate(data.route)}
                                >
                                    <Text>{data.name}</Text>
                                </ListItem>
                            );
                        }}
                    />
                </Content>
            </Container>

);
};
export default MyEvents;

MyEvents.navigationOptions = {
    header: null
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
})