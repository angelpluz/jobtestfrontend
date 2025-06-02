export interface User {
    firstName: string;
    lastName: string;
    age: number;
    gender: 'male' | 'female';
    hair: {
      color: string;
    };
    address: {
      postalCode: string;
    };
    company: {
      department: string;
    };
  }
  