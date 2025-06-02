import { NextResponse } from 'next/server';

type User = {
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
};

export async function GET() {
  const res = await fetch('https://dummyjson.com/users');
  const data = await res.json();
  const users: User[] = data.users;

  const grouped: Record<string, {
    male: number;
    female: number;
    ageRange: string;
    hair: Record<string, number>;
    addressUser: Record<string, string>;
  }> = {};

  for (const user of users) {
    const dept = user.company.department;

    if (!grouped[dept]) {
      grouped[dept] = {
        male: 0,
        female: 0,
        ageRange: '',
        hair: {},
        addressUser: {},
      };
    }

    const group = grouped[dept];

    if (user.gender === 'male') {
      group.male++;
    } else if (user.gender === 'female') {
      group.female++;
    }

    const hairColor = user.hair.color;
    group.hair[hairColor] = (group.hair[hairColor] || 0) + 1;

    const fullName = `${user.firstName}${user.lastName}`;
    group.addressUser[fullName] = user.address.postalCode;
  }

  for (const dept in grouped) {
    const deptUsers = users.filter((u: User) => u.company.department === dept);
    const ages = deptUsers.map((u: User) => u.age);
    const min = Math.min(...ages);
    const max = Math.max(...ages);
    grouped[dept].ageRange = `${min}-${max}`;
  }

  return NextResponse.json(grouped);
}
