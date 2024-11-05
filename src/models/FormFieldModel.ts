export class FormFieldModel {
  id: string | null;
  description: string | null;
  name: string | null;
  label: string | null;
  position: number | null;
  fullDescription: string | null;
  dataType: string | null;
  inputType: string | null;
  isCurrency: boolean | null;
  showFirst: boolean | null;
  required: boolean | null;
  hasChild: boolean | null;
  childData: FormFieldModel[] | null;
  errorMsg: string | null;
  dataSource: string | null;
  dataUrl: string | null;
  dependsOn: any | null;
  min: number | null;
  max: number | null;
  minMaxConstraint: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  formFieldId: string | null;
  productId: string | null;
  // formField: FormFieldDetailsModel | null;

  constructor(data: any) {
    this.id = data.id || null;
    this.description = data.description || null;
    this.name = data.name || null;
    this.label = data.label || null;
    this.position = data.position || null;
    this.fullDescription = data.fullDescription || null;
    this.dataType = data.dataType || null;
    this.inputType = data.inputType || null;
    this.isCurrency = data.isCurrency || null;
    this.showFirst = data.showFirst || null;
    this.required = data.required || null;
    this.hasChild = data.hasChild || null;
    this.childData = data.childData
      ? data.childData.map((item: any) => new FormFieldModel(item))
      : null;
    this.errorMsg = data.errorMsg || null;
    this.dataSource = data.dataSource || null;
    this.dataUrl = data.dataUrl || null;
    this.dependsOn = data.dependsOn || null;
    this.min = data.min || null;
    this.max = data.max || null;
    this.minMaxConstraint = data.minMaxConstraint || null;
    this.createdAt = data.createdAt ? new Date(data.createdAt) : null;
    this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : null;
    this.deletedAt = data.deletedAt ? new Date(data.deletedAt) : null;
    this.formFieldId = data.formFieldId || null;
    this.productId = data.productId || null;
    // this.formField = data.formField
    //   ? FormFieldDetailsModel.fromJson(data.formField)
    //   : null;
  }

  static fromJson(json: any): FormFieldModel {
    //  log.info("JSON", json['show_first']);
    //  log.info(JSON.stringify(json, null, 2) );
    // log.info(JSON.stringify(json, null, 2) );
    return new FormFieldModel({
      id: json['id'],
      description: json['description'],
      name: json['name'],
      label: json['label'],
      position: json['position'],
      fullDescription: json['full_description'],
      dataType: json['data_type'],
      inputType: json['input_type'],
      isCurrency: json['is_currency'],
      showFirst: json['show_first'],
      required: json['required'],
      hasChild: json['has_child'],
      childData:
        json['child_data'] &&
        Array.isArray(json['child_data']) &&
        json['child_data'].length > 0
          ? json['child_data'].map((item: any) => FormFieldModel.fromJson(item))
          : null,
      errorMsg: json['error_msg'] ?? null,
      dataSource: json['data_source'] ?? null,
      dataUrl: json['data_url'] ?? null,
      dependsOn: json['depends_on'] ?? null,
      min: json['min'] ?? null,
      max: json['max'] ?? null,
      minMaxConstraint: json['min_max_constraint'] ?? null,
      createdAt: json['created_at'] ? new Date(json['created_at']) : null,
      updatedAt: json['updated_at'] ? new Date(json['updated_at']) : null,
      deletedAt: json['deleted_at'] ? new Date(json['deleted_at']) : null,
      formFieldId: json['form_field_id'] ?? null,
      productId: json['product_id'] ?? null,
      // formField: json['form_field'] ? FormFieldDetailsModel.fromJson(json['form_field']) : null
    });
  }

  toJson(): any {
    return {
      id: this.id,
      description: this.description,
      name: this.name,
      label: this.label,
      position: this.position,
      full_description: this.fullDescription,
      data_type: this.dataType,
      input_type: this.inputType,
      is_currency: this.isCurrency,
      show_first: this.showFirst,
      required: this.required,
      has_child: this.hasChild,
      child_data: this.childData?.map((item) => item.toJson()) || null,
      error_msg: this.errorMsg,
      data_source: this.dataSource,
      data_url: this.dataUrl,
      depends_on: this.dependsOn,
      min: this.min,
      max: this.max,
      min_max_constraint: this.minMaxConstraint,
      created_at: this.createdAt ? this.createdAt.toISOString() : null,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : null,
      deleted_at: this.deletedAt ? this.deletedAt.toISOString() : null,
      form_field_id: this.formFieldId,
      product_id: this.productId,
      // form_field: this.formField ? this.formField.toJson() : null,
    };
  }
}

// // Sample `beneficiaryFormField` instance
// const beneficiaryFormField = new FormFieldModel({
//   id: "75cefe9c-e1db-47d2-8974-76d0f775577c",
//   description: "Add details for those you want to add as beneficiaries",
//   name: "beneficiaries",
//   label: "Beneficiaries",
//   position: 11,
//   fullDescription: "Add details for those you want to add as beneficiaries",
//   dataType: "array",
//   inputType: "text",
//   isCurrency: false,
//   showFirst: false,
//   required: false,
//   hasChild: true,
//   childData: [
//     new FormFieldModel({
//       min: 3,
//       name: "first_name",
//       label: "First name",
//       position: 1,
//       required: true,
//       dataType: "string",
//       errorMsg: "Please provide first name",
//       inputType: "text",
//       productId: "fab6bda1-b870-4648-8704-11c1802a51d0",
//       showFirst: true,
//       dataSource: "user_defined",
//       description: "Beneficiary first name",
//       formFieldId: "1",
//       fullDescription: "Your first name",
//       minMaxConstraint: "day",
//       id: '',
//       isCurrency: null,
//       hasChild: null,
//       childData: null,
//       dataUrl: '',
//       dependsOn: null,
//       max: null,
//       createdAt: null,
//       updatedAt: null,
//       deletedAt: null,
//       formField: null,
//     }),
//     new FormFieldModel({
//       min: 3,
//       name: "last_name",
//       label: "Last name",
//       position: 2,
//       required: true,
//       dataType: "string",
//       errorMsg: "Please provide last name",
//       inputType: "text",
//       productId: "fab6bda1-b870-4648-8704-11c1802a51d0",
//       showFirst: true,
//       dataSource: "user_defined",
//       description: "Beneficiary last name",
//       formFieldId: "1",
//       fullDescription: "Beneficiary last name",
//       minMaxConstraint: "day",
//       id: '',
//       isCurrency: null,
//       hasChild: null,
//       childData: null,
//       dataUrl: '',
//       dependsOn: null,
//       max: null,
//       createdAt: null,
//       updatedAt: null,
//       deletedAt: null,
//       formField: null,
//     }),
//     new FormFieldModel({
//       name: "date_of_birth",
//       label: "Date of birth",
//       position: 3,
//       required: true,
//       dataType: "string",
//       errorMsg: "Please provide a valid date",
//       inputType: "date",
//       productId: "f8b5bca1-b870-4648-8704-11c1802a51d0",
//       showFirst: true,
//       dataSource: "user_defined",
//       description: "Date of birth",
//       formFieldId: "1",
//       fullDescription: "Date of birth",
//       id: '',
//       isCurrency: null,
//       hasChild: null,
//       childData: null,
//       dataUrl: '',
//       dependsOn: null,
//       max: null,
//       createdAt: null,
//       updatedAt: null,
//       deletedAt: null,
//       formField: null,
//       min: null,
//       minMaxConstraint: '',
//     }),
//     new FormFieldModel({
//       name: "gender",
//       label: "Gender",
//       dataUrl: "/sdk/get-tangerine-gender",
//       position: 4,
//       required: true,
//       dataType: "string",
//       errorMsg: "Please provide a valid gender",
//       inputType: "text",
//       productId: "fab6bda1-b870-4648-8704-11c1802a51d0",
//       showFirst: false,
//       dataSource: "api",
//       description: "Your gender",
//       formFieldId: "2",
//       fullDescription: "Your gender",
//       id: '',
//       isCurrency: null,
//       hasChild: null,
//       childData: null,
//       dependsOn: null,
//       max: null,
//       createdAt: null,
//       updatedAt: null,
//       deletedAt: null,
//       formField: null,
//       minMaxConstraint: '',
//       min: null,
//     }),
//   ],
//   errorMsg: "Please provide a value",
//   dataSource: "user_defined",
//   dataUrl: null,
//   dependsOn: "number_of_beneficiaries",
//   min: 2,
//   max: null,
//   minMaxConstraint: "length",
//   createdAt: new Date("2023-06-08T18:33:44.519Z"),
//   updatedAt: new Date("2023-06-08T18:33:44.519Z"),
//   deletedAt: null,
//   formFieldId: "1",
//   productId: "fab6bda1-b870-4648-8704-11c1802a51d0",
//   formField: null,
// });
