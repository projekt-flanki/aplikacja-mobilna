import React, {useEffect, useState} from 'react';
import {
  Container,
  Content,
  Text,
  Header,
  Body,
  Button,
  Title,
  Thumbnail,
  Spinner,
  Icon,
  Left,
  Toast,
} from 'native-base';
import { NavigationStackProp } from 'react-navigation-stack';
import api from '../../utils/api';

type Props = {
    navigation: NavigationStackProp;
};

  
export const EditEvent = ({ navigation }: Props) => {
  
    return (
        <Container>
            <Text>
                hej
            </Text>
        </Container>);
};
export default EditEvent;