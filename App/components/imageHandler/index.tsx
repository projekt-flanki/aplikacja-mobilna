import React from 'react';
import ImagePicker from 'react-native-image-picker';
import {Text, Thumbnail} from 'native-base';
import {View} from 'react-native';

type Props = {
  image: string;
  setImage: (img: string) => void;
  label: string;
};

const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export const ImageHandler = ({image, setImage, label}: Props) => {
  const addAvatar = () => {
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // const source = {uri: response.uri};

        // You can also display the image using data:
        const source = 'data:image/jpeg;base64,' + response.data;
        setImage(source);
      }
    });
  };

  return (
    <View style={{alignSelf: 'center'}} onTouchStart={addAvatar}>
      <Text>{label}</Text>
      <Thumbnail large source={{uri: image}} />
    </View>
  );
};

export default ImageHandler;
