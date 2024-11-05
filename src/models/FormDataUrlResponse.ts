// interface FormDataUrlResponse {
//     name: string | null;
//     id: string | null;
//   }

//   // TypeScript equivalent of the constructor and fromJson method
//   class FormDataUrlResponse {
//     constructor(public name: string | null, public id: string | null) {}

//     // Factory method to create an instance from JSON
//     static fromJson(json: any): FormDataUrlResponse {
//       return new FormDataUrlResponse(json.name, json.id);
//     }

//     // Method to convert the instance to JSON
//     toJson(): { name: string | null; id: string | null } {
//       return {
//         name: this.name,
//         id: this.id,
//       };
//     }
//   }

export class FormDataUrlResponse {
  name: string;
  id: string | null;

  constructor(name: string, id: string | null) {
    this.name = name;
    this.id = id;
  }

  // toJson() {
  //   return {
  //     name: this.name,
  //     id: this.id,
  //   };
  // }
}

//   const jsonResponse = { name: 'John Doe', id: '123' };

// // Creating an instance from JSON
// const formDataUrlResponse = FormDataUrlResponse.fromJson(jsonResponse);
// console.log(formDataUrlResponse);

// // Converting the instance to JSON
// const json = formDataUrlResponse.toJson();
// console.log(json);
