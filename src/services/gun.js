import Gun from 'gun';

const gun = Gun('http://localhost:9990/gun');

export const isEmpty = (item) => {
    if (item) {
        const keys = Object.keys(item);
        return keys.length === 1 && keys.includes('id');
    }
    return true;
};

export const customers = gun.get('customers');
