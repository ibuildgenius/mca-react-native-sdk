import { type ColorValue } from 'react-native';

export class ColorUtils {
  static getColorFromHex(
    hexColor: string | null,
    defaultColor: string = 'FF3BAA90'
  ): ColorValue {
    if (!hexColor) {
      return ColorUtils.hexToRgba(defaultColor, 1);
    }

    hexColor = hexColor.toUpperCase().replace('#', '');

    if (hexColor.length === 6) {
      hexColor = 'FF' + hexColor;
    }

    if (hexColor.length !== 8) {
      return ColorUtils.hexToRgba(defaultColor, 1);
    }

    try {
      return ColorUtils.hexToRgba(hexColor, 1);
    } catch (e) {
      return ColorUtils.hexToRgba(defaultColor, 1);
    }
  }

  static hexToRgba(hex: string, opacity: number): string {
    hex = hex.replace(/^#/, '');

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
}
