import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ActivityIndicator, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeProvider, CheckBox } from 'react-native-elements';
import { Feather, FontAwesome, Ionicons } from '@expo/vector-icons';

const PrivacyScreen = () => {
  const navigation = useNavigation();
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(true); // State for initial loading

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setLoading(false);
    }, 0); // Reduced delay
  }, []);

  const handleContinue = () => {
    if (isChecked) {
      navigation.navigate('EmailScreen');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1E3B2F" />
      </View>
    );
  }

  return (
    <ThemeProvider>
                        <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.header}>
        <Ionicons name="arrow-back-outline" size={30} color="#fff" />
          <Text style={styles.headerText}>Privacy Policy</Text>
        </View>
        <ScrollView style={styles.content}>
          <Text style={styles.sectionTitle}>
            How will <Text style={styles.highlightText}>SPOT®</Text> use my data?
          </Text>

          {/* Paragraphs with Bullets */}
          <View style={styles.paragraphContainer}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.paragraph}>
              When you use our app, we access and/or collect information from you. For instance, location and device data may be used to provide an enhanced user experience.
            </Text>
          </View>
          <View style={styles.paragraphContainer}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.paragraph}>
              We use third-party software to scan your device to detect malware and protect your account from misuse. No data is stored or collected through this scan.
            </Text>
          </View>

          {/* Link and Legal Information */}
          <Text style={[styles.paragraph, {paddingBottom: 0}]}>
            Learn more about what data we collect and how we use it in our <Text style={styles.link}>Just In Time Notice</Text> and <Text style={styles.link}>Privacy Policy</Text>.
          </Text>

          {/* Safety Guidelines */}
          <Text style={[styles.sectionTitle,{marginTop: 25, marginBottom: 15}]}>How can I keep my money safe?</Text>
          <View style={styles.paragraphContainer}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.paragraph}>
              Only send money to people you know and trust. Make sure to use the correct UAE mobile number. See our <Text style={styles.link}>website</Text> and <Text style={styles.link}>Service Agreement</Text> for more details on using SPOT® safely.
            </Text>
          </View>
        </ScrollView>

        {/* Checkbox and Continue Button */}
        <View style={styles.footer}>
          <View style={styles.checkboxRow}>
            <CheckBox
              checked={isChecked}
              onPress={() => setIsChecked(!isChecked)}
              checkedColor="#1E3B2F"
              uncheckedColor="#1E3B2F"
              containerStyle={styles.checkboxContainer}
              checkedIcon={
                <View style={styles.iconContainer}>
                  <Feather name="check-square" size={15} color="1E3B2F"  />
                </View>
              }
              uncheckedIcon={
                <View style={styles.iconContainer}>
                  <FontAwesome name="square-o" size={15} color="1E3B2F" />
                </View>
              }
            />
            <Text style={styles.checkboxLabel}>
              By checking this box, you agree to our <Text style={styles.link}>E-Sign Consent</Text>, <Text style={styles.link}>Privacy Policy</Text>, and <Text style={styles.link}>Service Agreement</Text>.
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleContinue}
            style={[styles.continueButton, { backgroundColor: isChecked ? '#1E3B2F' : '#66B18A' }]}
            disabled={!isChecked}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 0,
    padding: 0
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 94, // Ensure space for footer
  },
  sectionTitle: {
    fontSize: 21,
    fontFamily: 'Poppins-Medium',
    fontWeight: '600',
    marginBottom: 15,
    color: '#454955',
    marginTop: 15
  },
  highlightText: {
    color: '#454955',
    fontFamily: 'Poppins-Medium',
  },
  paragraphContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 0,
  },
  bullet: {
    marginRight: 10,
    fontSize: 14,
    lineHeight: 18,
    fontFamily: 'Poppins-Regular',
  },
  paragraph: {
    flex: 1,
    fontSize: 13,
    textAlign: 'justify',
    lineHeight: 19,
    paddingBottom: 15,
    fontFamily: 'Poppins-Medium',
    color: '#262628',
    letterSpacing: 0
  },
  link: {
    color: '#1E3B2F',
    fontFamily: 'Poppins-Regular',
  },
  footer: {
    paddingHorizontal: 10,
    position: 'absolute',
    bottom: 30,
    width: '100%',
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  checkboxRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  checkboxContainer: {
    backgroundColor: 'transparent', // Adjust background color
    borderWidth: 0, // Ensure no additional border
    paddingHorizontal: 0, // Adjust padding if necessary
    margin: 0, // Adjust margin if necessary
    paddingLeft: 0, // Remove padding from left
    paddingTop: 0, // Remove top padding to align with the text
    marginRight: 2, // Space between checkbox and text
    borderRadius: 2,
  },
  checkboxLabel: {
    fontSize: 12,
    color: 'black',
    flex: 1,
    fontFamily: 'Poppins-Regular',
    lineHeight: 18, // Aligns with checkbox height
  },
  continueButton: {
    marginTop: 20,
    padding: 16,
    borderRadius: 16,
    width: '95%',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 54
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent grey background
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    backgroundColor: '#1D3B2F',
    height: 115,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 15,
    paddingBottom: 27
  },
  headerText: {
    color: '#fff',
    fontSize: 21,
    fontFamily: 'Poppins-Regular',
    flex: 1, // Take up available space
    textAlign: 'center',
  },
  icon: {
    marginRight: 10, // Add some margin between the icon and the text
  },
  iconContainer: {
    width: 24, // Same width for both icons
    height: 24, // Same height for both icons
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PrivacyScreen;
