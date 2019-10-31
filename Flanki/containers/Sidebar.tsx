import React from "react";
import {AppRegistry, Image, StatusBar} from "react-native";
import {Container, Content, Text, List, ListItem, Button, Icon} from "native-base";
import {NavigationStackProp} from "react-navigation-stack";
import api from "../utils/api";

const routes1 = ["Login", "HomeScreen", "Profile", "Ranking", "Dodaj wydarzenie", "Twoje wydarzenia"];
const routes = [{name: "Profil", route: "HomeScreen"}, {name: "Ranking", route: "HomeScreen"}, {name: "Dodaj wydarzenie", route: "HomeScreen"}, {name: "Twoje wydarzenia", route: "HomeScreen"}, ];

type Props = {
    navigation: NavigationStackProp;
};
export const SideBar = ({navigation}: Props) => {
    const logout = () => {
        navigation.navigate("AuthStack");
        api.logout();
    };

    return (
        <Container>
            <Content contentContainerStyle={{ justifyContent: "center", flex: 1, padding: 40 }}>
                <Button
                    transparent
                    onPress={() => navigation.navigate("DrawerClose")}>
                    <Icon name="ios-undo"/>
                </Button>
                <List
                    dataArray={routes}
                    renderRow={data => {
                        return (
                            <ListItem
                                button
                                onPress={() => navigation.navigate(data.route)}>
                                <Text>{data.name}</Text>
                            </ListItem>
                        );
                    }}
                />
                <Button onPress={logout} hasText transparent style={{marginLeft: 5}}>
                    <Text>Wyloguj się</Text>
                </Button>
            </Content>
        </Container>
    );
}

export default SideBar;
