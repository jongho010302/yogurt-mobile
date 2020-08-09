import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Image, Platform } from 'react-native';
import ActionSheet from 'react-native-action-sheet';
import ImagePicker, { Image as ImageType } from 'react-native-image-crop-picker';

import { navigationProps } from '../../types';
import BaseButton from '../../components/base/BaseButton';
import colors from '../../styles/colors';
import BaseInput from '../../components/base/BaseInput';
import { nameRegex } from '../../utils/regex';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ProfileInfo: React.FC<navigationProps> = ({ navigation }) => {
  const { navigate } = navigation;
  const defaultPhotoUri = 'http://www.futurekorea.co.kr/news/photo/201903/116160_116410_1321.jpg';
  const [name, setName] = useState('');
  const [isNameAvailable, setNameAvailability] = useState(false);
  const [photoUri, setPhotoUri] = useState(defaultPhotoUri);

  const handleNameChange = (paramName: string) => {
    setName(paramName);

    if (!nameRegex.test(paramName)) {
      return setNameAvailability(false);
    }

    setNameAvailability(true);
  };

  const ButtonsForIos = ['앨범에서 사진 선택', '사진 촬영', '기본 이미지로 변경', '취소'];

  const ButtonsForAndroid = ['앨범에서 사진 선택', '사진 촬영', '기본 이미지로 변경', '취소'];

  const selectProfilePhoto = () => {
    ActionSheet.showActionSheetWithOptions(
      {
        options: Platform.OS == 'ios' ? ButtonsForIos : ButtonsForAndroid,
        destructiveButtonIndex: 2,
        cancelButtonIndex: 3,
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          selectPhotoFromAlbum();
        } else if (buttonIndex === 1) {
          selectPhotoFromCamera();
        } else if (buttonIndex === 2) {
          setPhotoUri(defaultPhotoUri);
        }
      },
    );
  };

  const selectPhotoFromAlbum = async () => {
    const image = (await ImagePicker.openPicker({
      width: 150,
      height: 150,
      cropping: true,
    })) as ImageType;

    setPhotoUri(image.path);
  };

  const selectPhotoFromCamera = async () => {
    const image = (await ImagePicker.openCamera({
      width: 150,
      height: 150,
      cropping: true,
    })) as ImageType;

    setPhotoUri(image.path);
  };

  return (
    <SafeAreaView style={styles.profileWrapper}>
      <TouchableOpacity onPress={() => selectProfilePhoto()}>
        <Image source={{ uri: photoUri }} style={styles.profileImage} />
      </TouchableOpacity>
      <ScrollView style={{ marginTop: '10%' }}>
        <BaseInput
          inputValue={name}
          labelText="이름을 입력하세요"
          labelTextSize={12}
          labelColor={colors.lightSkyBlue}
          textColor={colors.lightBlack}
          borderBottomColor={colors.lightGray}
          inputType="text"
          onChangeText={handleNameChange}
          autoFocus
          placeholder="실명입력"
        />
        <BaseButton
          customStyle={{ marginTop: '20%' }}
          handleClick={() => console.log('저장하기')}
          disabled={!isNameAvailable}
          text="저장하기"
          backgroundColor={colors.lightSkyBlue}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileInfo;

const styles = StyleSheet.create({
  profileWrapper: {
    flex: 1,
    marginTop: '40%',
    margin: '10%',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
});
