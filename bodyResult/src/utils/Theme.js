const EColorPalette = {
  APP_BACKGROUND: '#fff',
  PRIMARY: '#44B656',
  PRIMARY_500: '#F6FCF8',
  SECONDARY: '#95B2CF',
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  BLUE: '#3D65AE',
  RED: '#EA4335',
  YELLOW: '#FF920D',
  PINK: '#FD80CB',
  GREEN_500: '#04AA53',
  GRAY_900: '#969696',
  GRAY_600: '#595959',
  GRAY_500: '#535262',
  GRAY_400: '#CFD2D7',
  GRAY_300: '#EFF2F2',
};

export const EFontFamily = {
  BLACK: 'Poppins-Black',
  BOLD: 'Poppins-Bold',
  // REGULAR: 'Poppins-Regular',
  REGULAR: 'DMSans-Regular',
};

export const theme = {
  navigationTheme: {
    dark: false,
    colors: {
      primary: EColorPalette.GREEN_500,
      secondary: EColorPalette.SECONDARY,
      background: EColorPalette.APP_BACKGROUND,
      card: EColorPalette.WHITE,
      text: EColorPalette.GRAY_900,
      notification: EColorPalette.RED,
    },
  },
  colors: {
    primary: EColorPalette.PRIMARY,
    primary500: EColorPalette.PRIMARY_500,
    secondary: EColorPalette.SECONDARY,
    success: EColorPalette.GREEN_500,
    danger: EColorPalette.RED,
    warning: EColorPalette.RED,

    appBackground: EColorPalette.APP_BACKGROUND,
    textForeground: EColorPalette.GRAY_900,

    white: EColorPalette.WHITE,
    black: EColorPalette.BLACK,
    blue: EColorPalette.BLUE,
    red: EColorPalette.RED,
    yellow: EColorPalette.YELLOW,
    pink: EColorPalette.PINK,

    gray900: EColorPalette.GRAY_900,
    gray600: EColorPalette.GRAY_600,
    gray500: EColorPalette.GRAY_500,
    gray400: EColorPalette.GRAY_400,
    gray300: EColorPalette.GRAY_300,
  },
  spacing: {
    appPadding: 30,
    nullPadding: 0,
    bottomTabHeight: 55,
    spacer10: {
      height: 10,
    },
    spacer20: {
      height: 20,
    },
    spacer30: {
      height: 30,
    },
    spacer40: {
      height: 40,
    },
  },
  textVariants: {
    displayBold32: {
      fontSize: 32,
      lineHeight: 40,
      fontFamily: EFontFamily.BOLD,
    },
    h1Regular20: {
      fontSize: 20,
      lineHeight: 32,
      fontFamily: EFontFamily.REGULAR,
    },
    h1Bold: {
      color: '#000',
      fontSize: 24,
      lineHeight: 32,
      fontFamily: EFontFamily.BOLD,
      fontWeight: 'bold',
    },

    h2Bold18: {
      fontSize: 16,
      lineHeight: 28,
      fontFamily: EFontFamily.BOLD,
      fontWeight: 'bold',
    },
    h2Bold: {
      fontSize: 16,
      lineHeight: 28,
      fontFamily: EFontFamily.BOLD,
      fontWeight: 'bold',
    },
    h2Regular28: {
      fontSize: 28,
      lineHeight: 28,
      fontFamily: EFontFamily.REGULAR,
    },
    h2Regular24: {
      fontSize: 24,
      lineHeight: 28,
      fontFamily: EFontFamily.REGULAR,
    },
    h2Regular20: {
      fontSize: 20,
      lineHeight: 28,
      fontFamily: EFontFamily.REGULAR,
    },
    body1Regular16: {
      fontSize: 16,
      lineHeight: 24,
      fontFamily: EFontFamily.REGULAR,
    },
    body2Regular14: {
      fontSize: 14,
      lineHeight: 22,
      fontFamily: EFontFamily.REGULAR,
    },
    body3Regular12: {
      fontSize: 12,
      lineHeight: 20,
      fontFamily: EFontFamily.REGULAR,
    },
    body4Regular10: {
      fontSize: 10,
      lineHeight: 16,
      fontFamily: EFontFamily.REGULAR,
    },
    body5Regular8: {
      fontSize: 8,
      lineHeight: 16,
      fontFamily: EFontFamily.REGULAR,
    },
  },
};
