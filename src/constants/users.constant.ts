// export enum USER_ROLE {
//   user = 'user',
//   admin = 'admin',
// }

// const myRole : USER_ROLE = 'admin';
// const myRole : USER_ROLE = USER_ROLE.admin;
// console.log(myRole);

export const USER_ROLE = {
  user: 'user',
  admin: 'admin',
} as const

export const ACCOUNT_STATUS = {
  active: 'active',
  inactive: 'inactive',
} as const

// const myRole : keyof typeof USER_ROLE = 'admin';
// console.log(myRole);
