export class ProviderModel {
  id: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phoneNumber: string | null;
  country: string | null;
  companyName: string | null;
  companyTradingName: string | null;
  companyAbbreviation: string | null;
  companyAddress: string | null;
  salesEmail: string | null;
  claimSupportEmail: string | null;
  inspectionSupportEmail: string | null;
  isOnboarded: boolean | null;
  dateOnboarded: Date | null;
  verificationType: string | null;
  verificationImages: string | null;
  verificationNumber: string | null;
  bvnNumber: string | null;
  businessType: string | null;
  claimEmail: string | null;
  businessEmail: string | null;
  supportEmail: string | null;
  active: boolean | null;
  bankAccountId: string | null;
  ownerId: string | null;
  walletDeficitLimit: string | null;
  maxInspectionRetries: number | null;
  insuranceType: string | null;
  identifier: string | null;
  lastWeeklyReport: Date | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  productCategoryId: string | null;
  providerId: string | null;
  providerUrl: string | null;
  logo: string | null;
  brandColorPrimary: string | null;
  icon: string | null;

  constructor(data: any) {
    this.id = data.id || null;
    this.firstName = data.firstName || null;
    this.lastName = data.lastName || null;
    this.email = data.email || null;
    this.phoneNumber = data.phoneNumber || null;
    this.country = data.country || null;
    this.companyName = data.companyName || null;
    this.companyTradingName = data.companyTradingName || null;
    this.companyAbbreviation = data.companyAbbreviation || null;
    this.companyAddress = data.companyAddress || null;
    this.salesEmail = data.salesEmail || null;
    this.claimSupportEmail = data.claimSupportEmail || null;
    this.inspectionSupportEmail = data.inspectionSupportEmail || null;
    this.isOnboarded = data.isOnboarded || null;
    this.dateOnboarded = data.dateOnboarded
      ? new Date(data.dateOnboarded)
      : null;
    this.verificationType = data.verificationType || null;
    this.verificationImages = data.verificationImages || null;
    this.verificationNumber = data.verificationNumber || null;
    this.bvnNumber = data.bvnNumber || null;
    this.businessType = data.businessType || null;
    this.claimEmail = data.claimEmail || null;
    this.businessEmail = data.businessEmail || null;
    this.supportEmail = data.supportEmail || null;
    this.active = data.active || null;
    this.bankAccountId = data.bankAccountId || null;
    this.ownerId = data.ownerId || null;
    this.walletDeficitLimit = data.walletDeficitLimit || null;
    this.maxInspectionRetries = data.maxInspectionRetries || null;
    this.insuranceType = data.insuranceType || null;
    this.identifier = data.identifier || null;
    this.lastWeeklyReport = data.lastWeeklyReport
      ? new Date(data.lastWeeklyReport)
      : null;
    this.createdAt = data.createdAt ? new Date(data.createdAt) : null;
    this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : null;
    this.deletedAt = data.deletedAt ? new Date(data.deletedAt) : null;
    this.productCategoryId = data.productCategoryId || null;
    this.providerId = data.providerId || null;
    this.providerUrl = data.providerUrl || null;
    this.logo = data.logo || null;
    this.icon = data.icon || null;
    this.brandColorPrimary = data.brandColorPrimary || null;
  }

  static fromJson(json: any): ProviderModel {
    return new ProviderModel({
      id: json['id'],
      firstName: json['first_name'],
      lastName: json['last_name'],
      email: json['email'],
      phoneNumber: json['phone_number'],
      country: json['country'],
      companyName: json['company_name'],
      companyTradingName: json['company_trading_name'],
      companyAbbreviation: json['company_abbreviation'],
      companyAddress: json['company_address'],
      salesEmail: json['sales_email'],
      claimSupportEmail: json['claim_support_email'],
      inspectionSupportEmail: json['inspection_support_email'],
      isOnboarded: json['isOnboarded'],
      dateOnboarded: json['dateOnboarded']
        ? new Date(json['dateOnboarded'])
        : null,
      verificationType: json['verification_type'],
      verificationImages: json['verification_images'],
      verificationNumber: json['verification_number'],
      bvnNumber: json['bvn_number'],
      businessType: json['business_type'],
      claimEmail: json['claim_email'],
      businessEmail: json['business_email'],
      supportEmail: json['support_email'],
      active: json['active'],
      bankAccountId: json['bank_account_id'],
      ownerId: json['owner_id'],
      walletDeficitLimit: json['wallet_deficit_limit'],
      maxInspectionRetries: json['max_inspection_retries'],
      insuranceType: json['insurance_type'],
      identifier: json['identifier'],
      lastWeeklyReport: json['last_weekly_report']
        ? new Date(json['last_weekly_report'])
        : null,
      createdAt: json['created_at'] ? new Date(json['created_at']) : null,
      updatedAt: json['updated_at'] ? new Date(json['updated_at']) : null,
      deletedAt: json['deleted_at'] ? new Date(json['deleted_at']) : null,
      productCategoryId: json['products.product_category_id'],
      providerId: json['products.provider_id'],
      providerUrl: json['products.provider_url'],
      logo: json['logo'],
      icon: json['icon'],
      brandColorPrimary: json['brand_color_primary'],
    });
  }

  toJson(): any {
    return {
      id: this.id,
      first_name: this.firstName,
      last_name: this.lastName,
      email: this.email,
      phone_number: this.phoneNumber,
      country: this.country,
      company_name: this.companyName,
      company_trading_name: this.companyTradingName,
      company_abbreviation: this.companyAbbreviation,
      company_address: this.companyAddress,
      sales_email: this.salesEmail,
      claim_support_email: this.claimSupportEmail,
      inspection_support_email: this.inspectionSupportEmail,
      isOnboarded: this.isOnboarded,
      dateOnboarded: this.dateOnboarded?.toISOString(),
      verification_type: this.verificationType,
      verification_images: this.verificationImages,
      verification_number: this.verificationNumber,
      bvn_number: this.bvnNumber,
      business_type: this.businessType,
      claim_email: this.claimEmail,
      business_email: this.businessEmail,
      support_email: this.supportEmail,
      active: this.active,
      bank_account_id: this.bankAccountId,
      owner_id: this.ownerId,
      wallet_deficit_limit: this.walletDeficitLimit,
      max_inspection_retries: this.maxInspectionRetries,
      insurance_type: this.insuranceType,
      identifier: this.identifier,
      last_weekly_report: this.lastWeeklyReport?.toISOString(),
      created_at: this.createdAt?.toISOString(),
      updated_at: this.updatedAt?.toISOString(),
      deleted_at: this.deletedAt?.toISOString(),
      products: {
        product_category_id: this.productCategoryId,
        provider_id: this.providerId,
        provider_url: this.providerUrl,
      },
      logo: this.logo,
      icon: this.icon,
      brand_color_primary: this.brandColorPrimary,
    };
  }
}
