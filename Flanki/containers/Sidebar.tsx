import React from "react";
import { AppRegistry, Image, StatusBar } from "react-native";
import { Container, Content, Text, List, ListItem } from "native-base";
import {NavigationStackProp} from "react-navigation-stack";
const routes = ["Login", "Ranking", "Dodaj wydarzenie", "Twoje wydarzenia", "Wyloguj się"];

type Props = {
    navigation: NavigationStackProp;
};
export const SideBar = ({ navigation }: Props) => {

// export default class SideBar extends React.Component {
//     render() {
        return (
            <Container>
                <Content>
                    <List
                        dataArray={routes}
                        renderRow={data => {
                            return (
                                <ListItem
                                    button
                                    onPress={() => navigation.navigate(data)}>
                                    <Text>{data}</Text>
                                </ListItem>
                            );
                        }}
                    />
                </Content>
            </Container>
        );
    }
// }
export default SideBar;
