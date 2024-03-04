export default class Usermodel {
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }
  static addUser(name, email, password) {
    const newUser = new Usermodel(users.length + 1, name, email, password);
    users.push(newUser);
  }
  static verifyUser(email, password) {
    const result = users.find(
      (u) => u.email == email && u.password == password
    );
    // console.log(result);
    return result;
  }
}
var users = [];
