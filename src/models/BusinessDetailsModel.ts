export class BusinessDetailsModel {
    id: string | null;
    appMode: string | null;
    ownerId: string | null;
    logo: string | null;
    appNotifications: boolean;
    debitWallet: boolean;
    emailNotifications: boolean;
    newsLetter: boolean;
    emailUsers: boolean;
    twoFa: boolean;
    enableWebhook: boolean;
    language: string | null;
    currency: string | null;
    callbackUrl: string | null;
    webhookUrl: string | null;
    colorTheme: string | null;
    notificationChannels: string[] | null;
    isPurchaseNotification: boolean;
    isActivationNotification: boolean;
    isRenewalNotification: boolean;
    isWatermark: boolean;
    isDefaultLogo: boolean;
    isDefaultColour: boolean | string;
    layout: string | null;
    sdkWelcomeScreenHeaderPrePurchase: string | null;
    sdkWelcomeScreenBodyPrePurchase: string | null;
    sdkSuccessScreenHeaderPostPurchase: string | null;
    sdkSuccessScreenBodyPostPurchase: string | null;
    sdkWelcomeScreenHeaderPreRenewal: string | null;
    sdkSuccessScreenHeaderPostRenewal: string | null;
    sdkWelcomeScreenBodyPreRenewal: string | null;
    sdkSuccessScreenBodyPostRenewal: string | null;
    sdkBannerRenewal: string | null;
    sdkWelcomeScreenHeaderPreInspection: string | null;
    sdkWelcomeScreenBodyPreInspection: string | null;
    sdkSuccessScreenHeaderPostInspection: string | null;
    sdkSuccessScreenBodyPostInspection: string | null;
    sdkWelcomeScreenHeaderPreClaim: string | null;
    sdkSuccessScreenHeaderPostClaim: string | null;
    sdkWelcomeScreenBodyPreClaim: string | null;
    sdkSuccessScreenBodyPostClaim: string | null;
    sdkBannerClaim: string | null;
    sdkMenuHeader: string | null;
    sdkMenu1SupportingText: string | null;
    sdkMenu2SupportingText: string | null;
    sdkMenu3SupportingText: string | null;
    sdkMenu4SupportingText: string | null;
    brandColorPrimary: string | null;
    brandColorSecondary: string | null;
    defaultPurchasePageUrl: string | null;
    defaultInspectionPageUrl: string | null;
    defaultClaimPageUrl: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: string | null;
    tradingName: string | null;
    businessName: string | null;
    instanceId: string | null;
    paymentChannels: string[] | null;
    sdkBannerPurchase: string | null;
  
    constructor(data: any) {
      this.id = data.id || null;
      this.appMode = data.app_mode || null;
      this.ownerId = data.owner_id || null;
      this.logo = data.logo || null;
      this.appNotifications = data.app_notifications ?? false;
      this.debitWallet = data.debit_wallet ?? false;
      this.emailNotifications = data.email_notifications ?? false;
      this.newsLetter = data.news_letter ?? false;
      this.emailUsers = data.email_users ?? false;
      this.twoFa = data.two_fa ?? false;
      this.enableWebhook = data.enable_webhook ?? false;
      this.language = data.language || null;
      this.currency = data.currency || null;
      this.callbackUrl = data.callback_url || null;
      this.webhookUrl = data.webhook_url || null;
      this.colorTheme = data.color_theme || null;
      this.notificationChannels = data.notification_channels ? data.notification_channels : null;
      this.isPurchaseNotification = data.is_purchase_notification ?? false;
      this.isActivationNotification = data.is_activation_notification ?? false;
      this.isRenewalNotification = data.is_renewal_notification ?? false;
      this.isWatermark = data.is_watermark ?? true;
      this.isDefaultLogo = data.is_default_logo ?? true;
      this.isDefaultColour = data.is_default_colour ?? "true";
      this.layout = data.layout || null;
      this.sdkWelcomeScreenHeaderPrePurchase = data.sdk_welcome_screen_header_pre_purchase || null;
      this.sdkWelcomeScreenBodyPrePurchase = data.sdk_welcome_screen_body_pre_purchase || null;
      this.sdkSuccessScreenHeaderPostPurchase = data.sdk_success_screen_header_post_purchase || null;
      this.sdkSuccessScreenBodyPostPurchase = data.sdk_success_screen_body_post_purchase || null;
      this.sdkWelcomeScreenHeaderPreRenewal = data.sdk_welcome_screen_header_pre_renewal || null;
      this.sdkSuccessScreenHeaderPostRenewal = data.sdk_success_screen_header_post_renewal || null;
      this.sdkWelcomeScreenBodyPreRenewal = data.sdk_welcome_screen_body_pre_renewal || null;
      this.sdkSuccessScreenBodyPostRenewal = data.sdk_success_screen_body_post_renewal || null;
      this.sdkBannerRenewal = data.sdk_banner_renewal || null;
      this.sdkWelcomeScreenHeaderPreInspection = data.sdk_welcome_screen_header_pre_inspection || null;
      this.sdkWelcomeScreenBodyPreInspection = data.sdk_welcome_screen_body_pre_inspection || null;
      this.sdkSuccessScreenHeaderPostInspection = data.sdk_success_screen_header_post_inspection || null;
      this.sdkSuccessScreenBodyPostInspection = data.sdk_success_screen_body_post_inspection || null;
      this.sdkWelcomeScreenHeaderPreClaim = data.sdk_welcome_screen_header_pre_claim || null;
      this.sdkSuccessScreenHeaderPostClaim = data.sdk_success_screen_header_post_claim || null;
      this.sdkWelcomeScreenBodyPreClaim = data.sdk_welcome_screen_body_pre_claim || null;
      this.sdkSuccessScreenBodyPostClaim = data.sdk_success_screen_body_post_claim || null;
      this.sdkBannerClaim = data.sdk_banner_claim || null;
      this.sdkMenuHeader = data.sdk_menu_header || null;
      this.sdkMenu1SupportingText = data.sdk_menu_1_supporting_text || null;
      this.sdkMenu2SupportingText = data.sdk_menu_2_supporting_text || null;
      this.sdkMenu3SupportingText = data.sdk_menu_3_supporting_text || null;
      this.sdkMenu4SupportingText = data.sdk_menu_4_supporting_text || null;
      this.brandColorPrimary = data.brand_color_primary || null;
      this.brandColorSecondary = data.brand_color_secondary || null;
      this.defaultPurchasePageUrl = data.default_purchase_page_url || null;
      this.defaultInspectionPageUrl = data.default_inspection_page_url || null;
      this.defaultClaimPageUrl = data.default_claim_page_url || null;
      this.createdAt = data.created_at ? new Date(data.created_at) : null;
      this.updatedAt = data.updated_at ? new Date(data.updated_at) : null;
      this.deletedAt = data.deleted_at || null;
      this.tradingName = data.trading_name || null;
      this.businessName = data.business_name || null;
      this.instanceId = data.instance_id || null;
      this.paymentChannels = data.payment_channels ? data.payment_channels : null;
      this.sdkBannerPurchase = data.sdk_banner_purchase || null;
    }
  
    static fromJson(json: any): BusinessDetailsModel {
      return new BusinessDetailsModel(json);
    }
  
    toJson(): any {
      return {
        id: this.id,
        app_mode: this.appMode,
        owner_id: this.ownerId,
        logo: this.logo,
        app_notifications: this.appNotifications,
        debit_wallet: this.debitWallet,
        email_notifications: this.emailNotifications,
        news_letter: this.newsLetter,
        email_users: this.emailUsers,
        two_fa: this.twoFa,
        enable_webhook: this.enableWebhook,
        language: this.language,
        currency: this.currency,
        callback_url: this.callbackUrl,
        webhook_url: this.webhookUrl,
        color_theme: this.colorTheme,
        notification_channels: this.notificationChannels,
        is_purchase_notification: this.isPurchaseNotification,
        is_activation_notification: this.isActivationNotification,
        is_renewal_notification: this.isRenewalNotification,
        is_watermark: this.isWatermark,
        is_default_logo: this.isDefaultLogo,
        is_default_colour: this.isDefaultColour,
        layout: this.layout,
        sdk_welcome_screen_header_pre_purchase: this.sdkWelcomeScreenHeaderPrePurchase,
        sdk_success_screen_header_post_purchase: this.sdkSuccessScreenHeaderPostPurchase,
        sdk_success_screen_body_post_purchase: this.sdkSuccessScreenBodyPostPurchase,
        sdk_welcome_screen_body_pre_purchase: this.sdkWelcomeScreenBodyPrePurchase,
        sdk_welcome_screen_header_pre_renewal: this.sdkWelcomeScreenHeaderPreRenewal,
        sdk_success_screen_header_post_renewal: this.sdkSuccessScreenHeaderPostRenewal,
        sdk_welcome_screen_body_pre_renewal: this.sdkWelcomeScreenBodyPreRenewal,
        sdk_success_screen_body_post_renewal: this.sdkSuccessScreenBodyPostRenewal,
        sdk_banner_renewal: this.sdkBannerRenewal,
        sdk_welcome_screen_body_pre_inspection: this.sdkWelcomeScreenBodyPreInspection,
        sdk_welcome_screen_header_pre_inspection: this.sdkWelcomeScreenHeaderPreInspection,
        sdk_success_screen_header_post_inspection: this.sdkSuccessScreenHeaderPostInspection,
        sdk_success_screen_body_post_inspection: this.sdkSuccessScreenBodyPostInspection,
        sdk_welcome_screen_header_pre_claim: this.sdkWelcomeScreenHeaderPreClaim,
        sdk_success_screen_header_post_claim: this.sdkSuccessScreenHeaderPostClaim,
        sdk_welcome_screen_body_pre_claim: this.sdkWelcomeScreenBodyPreClaim,
        sdk_success_screen_body_post_claim: this.sdkSuccessScreenBodyPostClaim,
        sdk_banner_claim: this.sdkBannerClaim,
        sdk_menu_header: this.sdkMenuHeader,
        sdk_menu_1_supporting_text: this.sdkMenu1SupportingText,
        sdk_menu_2_supporting_text: this.sdkMenu2SupportingText,
        sdk_menu_3_supporting_text: this.sdkMenu3SupportingText,
        sdk_menu_4_supporting_text: this.sdkMenu4SupportingText,
        brand_color_primary: this.brandColorPrimary,
        brand_color_secondary: this.brandColorSecondary,
        default_purchase_page_url: this.defaultPurchasePageUrl,
        default_inspection_page_url: this.defaultInspectionPageUrl,
        default_claim_page_url: this.defaultClaimPageUrl,
        created_at: this.createdAt?.toISOString(),
        updated_at: this.updatedAt?.toISOString(),
        deleted_at: this.deletedAt,
        trading_name: this.tradingName,
        business_name: this.businessName,
        instance_id: this.instanceId,
        payment_channels: this.paymentChannels,
        sdk_banner_purchase: this.sdkBannerPurchase,
      };
    }
  }
  