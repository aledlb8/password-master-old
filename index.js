console.clear();
const prompt = require("prompt-sync")({ sigint: true })
const { User } = require("./database");
const { main, menu, timeout } = require("./functions");
const { createSpinner } = require('nanospinner');

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
			system("login", false, "Invalid parameters")
		} else {
			User.findOne({ username: username }, async(err, data) => {
				if(err) throw err;
				if(!data) {
					system("login", false, "Username not found")
				} else {
					if(password !== data.password) {
						system("login", false, "Invalid password")
					} else {
						system("login", true)
						.then(async() => {
							await timeout(1000)
							main(username)
						})
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
			system("register", false, "Invalid parameters")
		} else {
			User.findOne({ username: username }, async(err, data) => {
				if(err) throw err;
				if(data) {
					system("register", false, "Username already exists")
				} else {
					new User({
						username,
						password
					})
					.save()
					.then(async() => {
						system("register", true)
						.then(async() => {
							await timeout(1000)
							main(username)
						})
					})
				}
			})
		}
		break;
	case "3":
		console.log("\x1b[31mExiting...\x1b[0m")
		process.exit()
	default:
		console.log("\x1b[31mInvalid option\x1b[0m")
		break;
}

async function system(type, success, err) {
	if(type == "login") {
		const spinner = createSpinner('Logging in...').start();
		await timeout(2000);

		if (success) {
			spinner.success({ text: `Success! you have logged in.` });
			await timeout(1000)
		} else {
			if (err) {
				spinner.error({ text: `Error: ${err}` });
				await timeout(3000)
				process.exit(1);
			} else {
				spinner.error({ text: `Uh Oh! an unexpected error has ocurred, please try again later.` });
				await timeout(3000)
				process.exit(1);
			}
		}
	} else if(type == "register") {
		const spinner = createSpinner('Registering...').start();
		await timeout(2000);

		if (success) {
			spinner.success({ text: `Success! account has been registered.` });
			await timeout(1000)
		} else {
			if (err) {
				spinner.error({ text: `Error: ${err}` });
				await timeout(3000)
				process.exit(1);
			} else {
				spinner.error({ text: `Uh Oh! an unexpected error has ocurred, please try again later.` });
				await timeout(3000)
				process.exit(1);
			}
		}
	}
}

/**
 * Password Master
 * @Author : aledlb8
 * @Version : 2.0.0
 */
