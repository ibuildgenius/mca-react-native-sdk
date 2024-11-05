export class FormFieldDetailsModel {
  id: string | null;
  name: string | null;
  label: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;

  constructor(data: {
    id: string | null;
    name: string | null;
    label: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: Date | null;
  }) {
    this.id = data.id;
    this.name = data.name;
    this.label = data.label;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.deletedAt = data.deletedAt;
  }

  static fromJson(json: any): FormFieldDetailsModel {
    return new FormFieldDetailsModel({
      id: json['id'] || null,
      name: json['name'] || null,
      label: json['label'] || null,
      createdAt: json['created_at'] ? new Date(json['created_at']) : null,
      updatedAt: json['updated_at'] ? new Date(json['updated_at']) : null,
      deletedAt: json['deleted_at'] ? new Date(json['deleted_at']) : null,
    });
  }

  toJson(): any {
    return {
      id: this.id,
      name: this.name,
      label: this.label,
      created_at: this.createdAt ? this.createdAt.toISOString() : null,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : null,
      deleted_at: this.deletedAt ? this.deletedAt.toISOString() : null,
    };
  }
}

//   const jsonResponse = {
//     id: "1",
//     name: "field_name",
//     label: "Field Label",
//     created_at: "2023-09-05T10:00:00Z",
//     updated_at: "2023-09-06T10:00:00Z",
//     deleted_at: null,
//   };

//   // Creating an instance from JSON
//   const formFieldDetails = FormFieldDetailsModel.fromJson(jsonResponse);
//   console.log(formFieldDetails);

//   // Converting the instance back to JSON
//   const json = formFieldDetails.toJson();
//   console.log(json);
