import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const RegistrationScreen = () => {
  const [hidenPassword, setHidePassword] = useState({ hide: true, text: 'Show' });
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const hidePassword = () => {
    if (hidenPassword.hide) {
      setHidePassword({ hide: false, text: 'Hide' });
    } else {
      setHidePassword({ hide: true, text: 'Show' });
    }
  };

  return (
    <View style={styles.registrationForm}>
      <Image style={styles.avatar} source={require('../assets/defaultAvatar1.jpg')} />
      <Text style={styles.text}>Реєстрація</Text>
      <TextInput
        style={styles.input__login}
        placeholder={'Login'}
        onFocus={() => setIsShowKeyboard(true)}
      />
      <TextInput
        style={styles.input__login}
        placeholder={'Enter the email'}
        dataDetectorTypes={'address'}
      />
      <View style={styles.password}>
        <TextInput
          style={styles.input__login}
          secureTextEntry={hidenPassword.hide}
          dataDetectorTypes={'all'}
          placeholder={'Enter the password'}
        />
        <TouchableOpacity style={styles.showPasswordButton} onPress={hidePassword}>
          <Text style={styles.showPasswordButton__text}>{hidenPassword.text}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{ ...styles.registrationButton, display: isShowKeyboard ? 'none' : 'flex' }}
      >
        <Text style={styles.registrationButton__text}>Зареєструватись</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ ...styles.haveAccountButton, display: isShowKeyboard ? 'none' : 'flex' }}
      >
        <Text style={styles.haveAccountButton__text}>Вже є аккаунт? Увійти</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: 92,
    textAlign: 'center',
    fontSize: 30,
    lineHeight: 35.16,
  },
  registrationForm: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
    // height: 549,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  avatar: {
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    width: 120,
    height: 120,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  input__login: {
    marginTop: 33,
    borderColor: '#fff',
    width: 343,
    height: 50,
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#E8E8E8',
    borderRadius: 8,

    paddingHorizontal: 16,
    paddingVertical: 16,

    fontSize: 16,
    fontWeight: '400',
    lineHeight: 19,
  },
  input: {
    marginBottom: 16,
    borderColor: '#fff',
    width: 343,
    height: 50,
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#E8E8E8',
    borderRadius: 8,

    paddingHorizontal: 16,
    paddingVertical: 16,

    fontSize: 16,
    fontWeight: '400',
    lineHeight: 19,
  },
  password: {
    position: 'relative',
  },
  showPasswordButton: {
    position: 'absolute',
    right: 16,
    top: 49,
  },
  showPasswordButton__text: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 19,

    color: '#1B4371',
  },
  registrationButton: {
    marginTop: 43,
    width: 343,
    paddingVertical: 16,

    backgroundColor: '#FF6C00',
    borderRadius: 100,
  },
  registrationButton__text: {
    textAlign: 'center',
    color: '#FFFFFF',
  },
  haveAccountButton: {
    marginTop: 16,
    marginBottom: 78,
  },
  haveAccountButton__text: {
    fontSize: 16,
    lineHeight: 19,
    color: '#1B4371',
  },
});

export default RegistrationScreen;
