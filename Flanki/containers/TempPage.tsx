import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import {Body, Button, Container, Content, Header, Icon, Left, List, ListItem, Right, Title} from "native-base";
import {DrawerActions} from "react-navigation-drawer";
import api from "../utils/api";
import {NavigationStackProp} from "react-navigation-stack";

type Props = {
    navigation: NavigationStackProp;
};

const TempPage = ({navigation}: Props) => {
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
                <Text>In progress</Text>
            </Content>
        </Container>

    );
};
export default TempPage;

TempPage.navigationOptions = {
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