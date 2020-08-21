import React, { useState, useMemo } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Image, Platform } from 'react-native';
import ActionSheet from 'react-native-action-sheet';
import ImagePicker, { Image as ImageType } from 'react-native-image-crop-picker';
import { navigationProps } from '../../types';
import BaseButton from '../../components/base/BaseButton';
import colors from '../../styles/colors';
import BaseInput from '../../components/base/BaseInput';
import { nameRegex } from '../../utils/regex';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { changeProfileUrlApi, changeNameApi } from '../../api/settings';
import { yogurtAlert, getUser } from '../../utils/common';

interface Photo {
  uri: string;
  name: string;
  type: string;
}

const ProfileInfo: React.FC<navigationProps> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [isNameAvailable, setNameAvailability] = useState(false);
  const [photo, setPhoto] = useState<Photo | null>();
  const [user, setUser] = useState(getUser());

  const getCurrentName = () => {
    return 'userName';
  };

  const handleNameChange = (paramName: string) => {
    console.log(user);
    setName(paramName);
    if (!nameRegex.test(paramName)) {
      setNameAvailability(false);
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
          // setPhoto(defaultPhotoUri);
        }
        console.log(buttonIndex);
      },
    );
  };

  const selectPhotoFromAlbum = async () => {
    const image = (await ImagePicker.openPicker({
      width: 150,
      height: 150,
      cropping: true,
    })) as ImageType;

    setPhoto({
      uri: image.path,
      name: image.filename,
      type: image.mime,
    });
  };

  const selectPhotoFromCamera = async () => {
    const image = (await ImagePicker.openCamera({
      width: 150,
      height: 150,
      cropping: true,
    })) as ImageType;

    setPhoto({
      uri: image.path,
      name: image.filename,
      type: image.mime,
    });
  };

  const saveProfileInfo = () => {
    uploadProfileImage();

    changeNameApi(name);
  };

  const uploadProfileImage = async () => {
    const formData = new FormData();
    formData.append('profile', photo);
    const res = await changeProfileUrlApi(formData);
    yogurtAlert(res.message);
  };

  return (
    <SafeAreaView style={styles.profileWrapper}>
      <TouchableOpacity onPress={() => selectProfilePhoto()}>
        <Image source={{ uri: photo?.uri }} style={styles.profileImage} />
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
          placeholder={getCurrentName()}
        />
        <BaseButton
          customStyle={{ marginTop: '20%' }}
          handleClick={() => saveProfileInfo()}
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
