console.clear();
const prompt = require("prompt-sync")({ sigint: true })
const { User } = require("./database");
const { main, menu, redirectToMenu } = require("./functions");

menu("Authenticate")
console.log("\x1b[35m","《1》 Login","\x1b[0m")
console.log("\x1b[35m","《2》 Register","\x1b[0m")
console.log("\x1b[35m","《3》 Exit\n","\x1b[0m")

const auth = prompt("Select a option: ")

switch (auth) {
	case "1":
		console.clear();
		menu("Login")
		var username = prompt("Username: ")
		var password = prompt("Password: ")	
		if(!username || !password) {
			console.log("\x1b[31m","Please fill out all the required files","\x1b[0m")
			process.exit();
		} else {
			User.findOne({username: username}, async(err, data) => {
				if(err) throw err;
				if(!data) {
					console.log("\x1b[31m","Username does not exist","\x1b[0m")
					process.exit();
				} else {
					if(password !== data.password) {
						console.log("\x1b[31m","Wrong password","\x1b[0m")
						process.exit();
					} else {
						console.log("Logged in")
						main(username)
					}
				}
			})
		}
		break;
	case "2":
		console.clear();
		menu("Register")
		var username = prompt("Username: ")
		var password = prompt("Password: ")
		if(!username || !password) {
			console.log("\x1b[31m","Please fill out all the required files","\x1b[0m")
			process.exit();
		} else {
			User.findOne({ username: username }, async(err, data) => {
				if(err) throw err;
				if(data) {
					console.log("\x1b[31m","Username already exist","\x1b[0m")
					process.exit();
				} else {
					new User({
						username,
						password
					})
					.save()
					.then(() => {
						console.log("Account registered")
						main(username)
					})
				}
			})
		}
		break;
	case "3":
		console.log("\x1b[31m","Exiting...","\x1b[0m")
		break;
	default:
		console.log("\x1b[31m","Invalid option","\x1b[0m")
		break;
}

/**
 * Password Master
 * @Author : aledlb8
 * @Version : 1.0.0
 */