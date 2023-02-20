import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {ThemeProvider} from './src/utils/ThemeProvider';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import AppNavigation from './src/navigation/AppNavigation';
import {theme} from './src/utils/Theme';
const App = () => {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={theme.colors.primary}
        />

        <View style={styles.safeArea}>
          <AppNavigation />
        </View>
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.white,
    paddingTop: Platform.OS === 'ios' ? 35 : 0,
  },
});

export default App;
