import Gun from 'gun';

const gun = Gun();

export const customers = gun.get('customers');
