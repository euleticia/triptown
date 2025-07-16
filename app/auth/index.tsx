import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, router } from 'expo-router';
import { Mail, Lock, Eye, EyeOff, Globe } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { colors } from '@/styles/colors';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  
  const { signIn, signInWithGoogle, signInWithApple } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      await signIn(email, password);
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Error', 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Error', 'Google sign in failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithApple();
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Error', 'Apple sign in failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={[colors.primary[400], colors.secondary[400], colors.accent[400]]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>{t('welcome')}</Text>
            <Text style={styles.subtitle}>{t('appName')}</Text>
            <Text style={styles.tagline}>{t('tagline')}</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.languageContainer}>
              <TouchableOpacity
                style={styles.languageButton}
                onPress={() => setShowLanguageMenu(true)}
              >
                <Globe size={20} color={colors.neutral[500]} />
                <Text style={styles.languageButtonText}>{t('language')}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <Mail size={20} color={colors.neutral[500]} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder={t('email')}
                placeholderTextColor={colors.neutral[400]}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </View>

            <View style={styles.inputContainer}>
              <Lock size={20} color={colors.neutral[500]} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, styles.passwordInput]}
                placeholder={t('password')}
                placeholderTextColor={colors.neutral[400]}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoComplete="password"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                {showPassword ? (
                  <EyeOff size={20} color={colors.neutral[500]} />
                ) : (
                  <Eye size={20} color={colors.neutral[500]} />
                )}
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <Text style={styles.loginButtonText}>{t('signIn')}</Text>
              )}
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>{t('orContinueWith')}</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.socialButtons}>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={handleGoogleSignIn}
                disabled={isLoading}
              >
                <Text style={styles.socialButtonText}>Google</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.socialButton}
                onPress={handleAppleSignIn}
                disabled={isLoading}
              >
                <Text style={styles.socialButtonText}>Apple</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.signupPrompt}>
              <Text style={styles.signupText}>{t('dontHaveAccount')} </Text>
              <Link href="/auth/signup" asChild>
                <TouchableOpacity>
                  <Text style={styles.signupLink}>{t('signUp')}</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal
        visible={showLanguageMenu}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLanguageMenu(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowLanguageMenu(false)}
        >
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.languageOption}
              onPress={() => {
                setLanguage('en');
                setShowLanguageMenu(false);
              }}
            >
              <Text style={styles.languageOptionText}>{t('english')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.languageOption}
              onPress={() => {
                setLanguage('pt');
                setShowLanguageMenu(false);
              }}
            >
              <Text style={styles.languageOptionText}>{t('portuguese')}</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: colors.white,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 40,
    fontFamily: 'Inter-Bold',
    color: colors.white,
    textAlign: 'center',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: colors.white,
    textAlign: 'center',
    opacity: 0.9,
  },
  formContainer: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 24,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  languageContainer: {
    marginBottom: 16,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral[50],
    borderRadius: 12,
    padding: 12,
    gap: 8,
  },
  languageButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.neutral[700],
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 12,
    width: '80%',
    maxWidth: 300,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  languageOption: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[100],
  },
  languageOptionText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: colors.neutral[700],
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral[50],
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: colors.neutral[800],
  },
  passwordInput: {
    paddingRight: 48,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    padding: 4,
  },
  loginButton: {
    backgroundColor: colors.primary[500],
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  loginButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.white,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.neutral[200],
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: colors.neutral[500],
  },
  socialButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  socialButton: {
    flex: 1,
    backgroundColor: colors.neutral[100],
    borderRadius: 12,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  socialButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.neutral[700],
  },
  signupPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: colors.neutral[600],
  },
  signupLink: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: colors.primary[600],
  },
});