export class ProviderSettings {
  logo: string | null;
  brandColorPrimary: string | null;
  icon: string | null;

  constructor(data: {
    logo: string | null;
    brandColorPrimary: string | null;
    icon: string | null;
  }) {
    this.logo = data.logo;
    this.brandColorPrimary = data.brandColorPrimary;
    this.icon = data.icon;
  }

  static fromJson(json: any): ProviderSettings {
    return new ProviderSettings({
      logo: json['logo'] || null,
      brandColorPrimary: json['brand_color_primary'] || null,
      icon: json['icon'] || null,
    });
  }

  toJson(): any {
    return {
      logo: this.logo,
      brand_color_primary: this.brandColorPrimary,
      icon: this.icon,
    };
  }
}

// const jsonResponse = {
//   logo: "logo_url",
//   icon: "icon_url",
//   brand_color_primary: "#000000",
// };

// // Creating an instance from JSON
// const providerSettings = ProviderSettings.fromJson(jsonResponse);
// console.log(providerSettings);

// // Converting the instance back to JSON
// const json = providerSettings.toJson();
// console.log(json);
