export type UserFilterStatus = 'active' | 'inactive' | 'all';

export type UserType = {
  id: number;
  username: string;
  status?: 'active' | 'inactive';
};
