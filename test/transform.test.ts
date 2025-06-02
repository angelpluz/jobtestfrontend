import { transform } from '../src/transform';
import { User } from '../src/types';

describe('transform', () => {
  const mockUsers: User[] = [
    {
      firstName: 'Alice',
      lastName: 'Smith',
      age: 30,
      gender: 'female',
      hair: { color: 'Blond' },
      address: { postalCode: '12345' },
      company: { department: 'Engineering' },
    },
    {
      firstName: 'Bob',
      lastName: 'Brown',
      age: 45,
      gender: 'male',
      hair: { color: 'Black' },
      address: { postalCode: '67890' },
      company: { department: 'Engineering' },
    },
    {
      firstName: 'Eve',
      lastName: 'White',
      age: 29,
      gender: 'female',
      hair: { color: 'Black' },
      address: { postalCode: '54321' },
      company: { department: 'Marketing' },
    },
  ];

  it('should correctly transform and group users by department', () => {
    const result = transform(mockUsers);

    expect(result['Engineering']).toBeDefined();
    expect(result['Engineering'].male).toBe(1);
    expect(result['Engineering'].female).toBe(1);
    expect(result['Engineering'].ageRange).toBe('30-45');
    expect(result['Engineering'].hair['Blond']).toBe(1);
    expect(result['Engineering'].hair['Black']).toBe(1);
    expect(result['Engineering'].addressUser['AliceSmith']).toBe('12345');

    expect(result['Marketing']).toBeDefined();
    expect(result['Marketing'].male).toBe(0);
    expect(result['Marketing'].female).toBe(1);
    expect(result['Marketing'].ageRange).toBe('29-29');
    expect(result['Marketing'].hair['Black']).toBe(1);
    expect(result['Marketing'].addressUser['EveWhite']).toBe('54321');
  });
});
