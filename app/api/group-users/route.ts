import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch('https://dummyjson.com/users');
  const data = await res.json();
  const users = data.users;

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
    group[user.gender]++;
    group.hair[user.hair.color] = (group.hair[user.hair.color] || 0) + 1;
    group.addressUser[user.firstName + user.lastName] = user.address.postalCode;
  }

  for (const dept in grouped) {
    const deptUsers = users.filter(u => u.company.department === dept);
    const ages = deptUsers.map(u => u.age);
    const min = Math.min(...ages);
    const max = Math.max(...ages);
    grouped[dept].ageRange = `${min}-${max}`;
  }

  return NextResponse.json(grouped);
}
