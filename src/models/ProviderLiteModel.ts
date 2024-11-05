import customLog from '../utils/logger';
import { ProviderSettings } from './ProviderSettings';

// import { ProviderSettings } from './ProviderSettings'; // Ensure correct import path

export class ProviderLiteModel {
  companyName: string | null;
  id: string | null;
  logo: string | null;
  icon: string | null;
  brandColorPrimary: string | null;
  settings: ProviderSettings | null;

  constructor(data: {
    companyName: string | null;
    id: string | null;
    logo: string | null;
    icon: string | null;
    brandColorPrimary: string | null;
    settings: ProviderSettings | null;
  }) {
    this.companyName = data.companyName;
    this.id = data.id;
    this.logo = data.logo;
    this.icon = data.icon;
    this.brandColorPrimary = data.brandColorPrimary;
    this.settings = data.settings;
  }

  static fromJson(json: any): ProviderLiteModel {
    // log.error(json);
    // log.error(json);
    // log.error(json);
    // log.error(json);
    // log.info(json);
    // log.info(json);
    // log.info(json);
    // log.info(json);
    // log.info(json);
    // log.info(json);
    // log.debug(json);
    // log.debug(json);

    // log.debug(json);
    // log.debug(json);
    // log.debug(json);
    // log.debug(json);
    // log.debug(json);
    // log.error(json);

    // log.info("JSON", json['form_fields']);
    customLog.info('Jsooon');
    customLog.error(json);
    // log.info(JSON.stringify(json, null, 2));
    // // log.info(JSON.stringify(json, null, 2) );

    return new ProviderLiteModel({
      id: json['id'] || null,
      companyName: json['company_name'] || null,
      logo: json['logo'] || null,
      icon: json['icon'] || null,
      brandColorPrimary: json['brand_color_primary'] || null,
      settings: json['settings']
        ? ProviderSettings.fromJson(json['settings'])
        : null,
    });
  }

  toJson(): any {
    return {
      company_name: this.companyName,
      id: this.id,
      logo: this.logo,
      icon: this.icon,
      brand_color_primary: this.brandColorPrimary,
      settings: this.settings ? this.settings.toJson() : null,
    };
  }
}

// const jsonResponse = {
//     id: "123",
//     company_name: "Insurance Provider",
//     logo: "logo_url",
//     icon: "icon_url",
//     brand_color_primary: "#000000",
//     settings: {
//       allow_claims: true,
//       support_email: "support@provider.com",
//     },
//   };

//   // Creating an instance from JSON
//   const providerLite = ProviderLiteModel.fromJson(jsonResponse);
//   console.log(providerLite);

//   // Converting the instance back to JSON
//   const json = providerLite.toJson();
//   console.log(json);
