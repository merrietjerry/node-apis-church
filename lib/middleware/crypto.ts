import * as bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

export function encrypt(input: any) {
  return bcrypt.hashSync(input, salt);
}

export function validate(input: any, dbInput: any) {
  return bcrypt.compareSync(input, dbInput);
}