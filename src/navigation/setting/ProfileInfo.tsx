import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';
import ActionSheet from 'react-native-action-sheet';
import ImagePicker, {
  Image as ImageType,
} from 'react-native-image-crop-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationProps } from '../../types';
import BaseButton from '../../components/base/BaseButton';
import colors from '../../styles/colors';
import BaseInput from '../../components/base/BaseInput';
import { nameRegex } from '../../utils/regex';
import { yogurtAlert } from '../../utils/common';
import { useUser } from '../../hooks';
import { AsyncStatus } from '../../modules/types';

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

interface Photo {
  uri: string;
  name: string;
  type: string;
}

const ProfileInfo: React.FC<NavigationProps> = ({ navigation }) => {
  const {
    user,
    handleChangeName,
    handleChangeProfile,
    handleChangeField,
  } = useUser();
  const [name, setName] = useState('');
  const [isNameValidated, setNameValidated] = useState(false);
  const [photo, setPhoto] = useState<Photo>();

  const userData = user.data;

  useEffect(() => {
    if (
      user.changeName.status === AsyncStatus.SUCCESS ||
      user.changeProfile.status === AsyncStatus.SUCCESS
    ) {
      yogurtAlert('프로필이 성공적으로 변경되었습니다.');
      navigation.navigate('PersonalInfo');
    }
  }, [user.changeName.status, user.changeProfile.status, navigation]);

  useEffect(() => {
    return () => {
      handleChangeField('changeName', {
        status: AsyncStatus.INIT,
        errorMessage: '',
      });
      handleChangeField('changeProfile', {
        status: AsyncStatus.INIT,
        errorMessage: '',
      });
    };
  }, [handleChangeField]);

  const onNameChange = (paramName: string) => {
    setName(paramName);
    if (nameRegex.test(paramName)) {
      setNameValidated(true);
    } else {
      setNameValidated(false);
    }
  };

  const ButtonsForIos = [
    '앨범에서 사진 선택',
    '사진 촬영',
    '기본 이미지로 변경',
    '취소',
  ];
  const ButtonsForAndroid = [
    '앨범에서 사진 선택',
    '사진 촬영',
    '기본 이미지로 변경',
    '취소',
  ];

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
    if (photo) {
      const formData = new FormData();
      formData.append('profile', photo);
      handleChangeProfile(formData);
    }

    handleChangeName(name);
  };

  const selectProfilePhoto = () => {
    ActionSheet.showActionSheetWithOptions(
      {
        options: Platform.OS === 'ios' ? ButtonsForIos : ButtonsForAndroid,
        destructiveButtonIndex: 2,
        cancelButtonIndex: 3,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          selectPhotoFromAlbum();
        } else if (buttonIndex === 1) {
          selectPhotoFromCamera();
        } else if (buttonIndex === 2) {
          setPhoto({
            uri:
              'https://seoulforest-image.s3.ap-northeast-2.amazonaws.com/default_profile.png',
            name: 'Default image',
            type: 'image/png',
          });
        }
      },
    );
  };

  const canChangeProfile = () => {
    return isNameValidated && name !== userData?.name;
  };

  return (
    <SafeAreaView style={styles.profileWrapper}>
      <TouchableOpacity onPress={() => selectProfilePhoto()}>
        <Image
          source={{ uri: photo?.uri || userData?.profileUrl }}
          style={styles.profileImage}
        />
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
          onChangeText={onNameChange}
          placeholder={userData?.name}
          autoFocus
        />
        <BaseButton
          customStyle={{ marginTop: '20%' }}
          handleClick={() => saveProfileInfo()}
          disabled={!canChangeProfile()}
          text="저장하기"
          backgroundColor={colors.lightSkyBlue}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileInfo;
