import * as bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

export default {
	make: (value: string) => {
		return bcrypt.hash(value, salt);
	},
	check: (value: string, hash: string) => {
		return bcrypt.compare(value, hash);
	},
	makeSync: (value: string) => {
		return bcrypt.hashSync(value, salt);
	},
	checkSync: (value: string, hash: string) => {
		return bcrypt.compareSync(value, hash);
	}
}