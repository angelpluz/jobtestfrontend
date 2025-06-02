import { User } from './types';

type Transformed = Record<string, {
  male: number;
  female: number;
  ageRange: string;
  hair: Record<string, number>;
  addressUser: Record<string, string>;
}>;

export function transform(users: User[]): Transformed {
  const grouped: Transformed = {};

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
    grouped[dept].ageRange = `${Math.min(...ages)}-${Math.max(...ages)}`;
  }

  return grouped;
}
