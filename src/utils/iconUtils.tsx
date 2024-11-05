import { Text } from 'react-native';
import PackageIcon from '../assets/icons/package_icon.svg';
import GadgetIcon from '../assets/icons/gadget_icon.svg';
import LifeIcon from '../assets/icons/life_icon.svg';
import CreditLifeIcon from '../assets/icons/credit_life_icon.svg';
import AutoIcon from '../assets/icons/auto_icon.svg';
import HealthIcon from '../assets/icons/health_icon.svg';
import ContentIcon from '../assets/icons/content_icon.svg';
import TravelIcon from '../assets/icons/travel_icon.svg';
import { DynamicColors } from '../constants/CustomColors';
import React from 'react';

class IconUtils {
  static getIcon(category: string) {
    const categoryIconMap: Record<string, JSX.Element> = {
      'package': (
        <PackageIcon
          width={22}
          height={22}
          stroke={DynamicColors().primaryBrandColor}
        />
      ),
      'gadget': (
        <GadgetIcon
          width={22}
          height={22}
          stroke={DynamicColors().primaryBrandColor}
        />
      ),
      'life': (
        <LifeIcon
          width={22}
          height={22}
          stroke={DynamicColors().primaryBrandColor}
        />
      ),
      'credit life': (
        <CreditLifeIcon
          width={22}
          height={22}
          fill={DynamicColors().primaryBrandColor}
        />
      ),
      'auto': (
        <AutoIcon
          width={22}
          height={22}
          // fill={DynamicColors().primaryBrandColor}
          stroke={DynamicColors().primaryBrandColor}
        />
      ),
      'health': (
        <HealthIcon
          width={22}
          height={22}
          fill={DynamicColors().primaryBrandColor}
        />
      ),
      'content': (
        <ContentIcon
          width={22}
          height={22}
          stroke={DynamicColors().primaryBrandColor}
        />
      ),
      'travel': (
        <TravelIcon
          width={22}
          height={22}
          stroke={DynamicColors().primaryBrandColor}
        />
      ),
    };

    const defaultIcon = <Text>Default Icon</Text>;

    return categoryIconMap[category.toLowerCase()] || defaultIcon;
  }
}

export default IconUtils;
