// StringUtils.ts

import { ConstantString } from '../constants/ConstantString';
import type { GlobalStore } from '../store/globalStore';

// const global = useGlobalStore((state: any) => state);

export class StringUtils {
  static getBaseUrl(global: GlobalStore, useV2Url: boolean = false): string {
    const mode = global.mode;
    const baseUrl =
      mode === ConstantString.stagingMode
        ? 'https://staging.api.mycover.ai'
        : 'https://api.mycover.ai';
    return useV2Url ? `${baseUrl}/v2` : `${baseUrl}/v1`;
  }

  static getProviderPeriodOfCover(periodOfCover: string): string {
    return periodOfCover === '12' ? 'Annum' : 'Month';
  }

  static getProductPrice(price: string, isDynamic: boolean): string {
    return isDynamic
      ? `${this.formatDynamicPrice(price)}%`
      : `₦ ${this.formatPriceWithComma(price)} `;
  }

  static formatDynamicPrice(priceString: string): string {
    const price = parseFloat(priceString) || 0.0;
    let formattedPrice = price.toFixed(2);

    if (formattedPrice.endsWith('.00')) {
      return formattedPrice.slice(0, -3); // Remove the '.00'
    } else {
      return formattedPrice;
    }
  }

  static formatPriceWithComma(priceString?: string): string | null {
    if (!priceString) {
      return null;
    } else {
      const price = parseFloat(priceString) || 0.0;
      const isInteger = price === Math.floor(price);

      // Format the price with commas, and optionally with decimal places
      return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: isInteger ? 0 : 2,
        maximumFractionDigits: isInteger ? 0 : 2,
      }).format(price);
    }
  }

  static getInitialValue(global: GlobalStore, name: string): string | null {
    switch (name.toLowerCase()) {
      case 'email':
        return global.form?.email || '';
      case 'first_name':
        return global.form?.first_name || '';
      case 'last_name':
        return global.form?.last_name || '';
      case 'phone':
      case 'phone_number':
        return global.form?.phone || '';
      default:
        return null;
    }
  }

  static isNullOrEmptyList(list?: any[] | null): boolean {
    return !list || list.length === 0;
  }

  static isNullOrEmpty(str?: string | null): boolean {
    return !str || str.length === 0;
  }

  static getFirstTwoCharsCapitalized(input?: string): string {
    if (!input || input.length === 0) {
      return '';
    }
    const firstTwoChars = input.substring(
      0,
      input.length >= 2 ? 2 : input.length
    );
    return firstTwoChars.toUpperCase();
  }

  static getFirstCharCapitalized(input?: string): string {
    if (!input || input.length === 0) {
      return '';
    }
    const firstChar = input.charAt(0);
    return firstChar.toUpperCase();
  }
}
