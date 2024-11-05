import globalObject from '../store/globalObject';
import { ColorUtils } from '../utils/colorUtils';

interface Color {
  whiteColor: string;

  blackColor: string;

  backBorderColor: string;
  lightGreenColor: string;
  blackTextColor: string;
  tipTextColor: string;
  greyTextColor: string;
  redExitColor: string;
  redTimeUpColor: string;
  progressGreenColor: string;
  progressGreenTextColor: string;
  lightDividerColor: string;
  blueTextColor: string;
  greyToastColor: string;
  dividerGreyColor: string;
  lightDividerGreyColor: string;
  checkBoxBorderColor: string;
  productBorderColor: string;
  discountBgColor: string;
  backTextColor: string;
  lightGreenBgColor: string;
  lightOrangeBgColor: string;

  darkTextColor: string;

  formTitleColor: string;
  formHintColor: string;

  lightBlackColor: string;
  orangeColor: string;
  disabledOrangeColor: string;

  lightOrangeColor: string;

  toastGreenColor: string;
  toastOrangeColor: string;
  toastRedColor: string;

  opacityPrimaryBrandColor: string;
  secondaryBlackColor: string;

  gray700Color: string;
  gray400Color: string;
  gray100Color: string;
  grayTextColor: string;
  grayColor: string;
  grayiconColor: string;

  lightGrayTextColor: string;
  purple500Color: string;
  purple50Color: string;
  purple25Color: string;

  greenColor: string;
  success500Color: string;

  redColor: string;

  primaryBrandColor: string;
  lightPrimaryColor: string;
  transGray100Color: string;
  shimmeBaseColor: string;
  shimmerHighlightColor: string;
}

// const primaryBrandColor =

// '#3BAA90';

export const CustomColors: Omit<
  Color,
  'primaryBrandColor' | 'lightPrimaryColor' | 'opacityPrimaryBrandColor'
> = {
  whiteColor: '#FFFFFF',
  blackColor: '#000000',
  backBorderColor: '#F9FAFB',
  lightGreenColor: '#E6F4F2',
  blackTextColor: '#101828',
  tipTextColor: '#2B313B',
  greyTextColor: '#667085',
  redExitColor: '#F04438',
  redTimeUpColor: '#FDA29B',

  progressGreenColor: '#12B76A',
  progressGreenTextColor: '#039855',
  lightDividerColor: '#EAEAEA',
  blueTextColor: '#0084FE',

  greyToastColor: '#9CA3AF',
  dividerGreyColor: '#EAECF0',
  lightDividerGreyColor: '#EBEBEB',

  checkBoxBorderColor: '#98A2B3',
  productBorderColor: '#D0D5DD',
  discountBgColor: '#F2F4F7',
  backTextColor: '#344054',
  lightGreenBgColor: '#A6F4C5',
  lightOrangeBgColor: '#FEDF89',

  darkTextColor: '#070707',

  formTitleColor: '#475467',
  formHintColor: '#999CA0',

  lightBlackColor: '#747474',
  orangeColor: '#F79009',
  disabledOrangeColor: '#FEC84B',

  lightOrangeColor: '#FFFAEB',

  toastGreenColor: '#12B76A',

  toastOrangeColor: '#F79009',

  toastRedColor: '#F04438',

  secondaryBlackColor: '#070707',

  gray700Color: '#344054',
  gray400Color: '#98A2B3',
  gray100Color: '#F2F4F7',
  grayTextColor: '#909090',
  grayColor: '#2B2B2B',
  grayiconColor: '#ACACAC',

  lightGrayTextColor: '#5F738C',
  purple500Color: '#7A5AF8',
  purple50Color: '#F4F3FF',
  purple25Color: '#FAFAFF',

  greenColor: '#3BAA90',
  success500Color: '#12B76A',

  redColor: '#CA0808',

  // primaryBrandColor: '#3BAA90',
  // lightPrimaryColor: ColorUtils.hexToRgba(primaryBrandColor, 0.08),
  // primaryBrandColor: primaryBrandColor,
  // lightPrimaryColor: ColorUtils.hexToRgba(primaryBrandColor, 0.08),

  // lightPrimaryColor: ColorUtils.hexToRgba(primaryBrandColor, 0.08),
  transGray100Color: ColorUtils.hexToRgba('#555555', 0.6),
  shimmeBaseColor: ColorUtils.hexToRgba('#9E9E9E', 0.1),
  shimmerHighlightColor: ColorUtils.hexToRgba('#9E9E9E', 0.02),
};

export const DynamicColors = (): Pick<
  Color,
  'primaryBrandColor' | 'lightPrimaryColor' | 'opacityPrimaryBrandColor'
> => {
  const primaryBrandColor = globalObject.primaryBrandColor ?? '3BAA90';

  return {
    primaryBrandColor: `#${primaryBrandColor}`,
    lightPrimaryColor: ColorUtils.hexToRgba(`#${primaryBrandColor}`, 0.08),
    opacityPrimaryBrandColor: ColorUtils.hexToRgba(
      `#${primaryBrandColor}`,
      0.5
    ),
  };
};
