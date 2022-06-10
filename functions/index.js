const { Passwords, Notes, CreditCards } = require("../database");
const prompt = require("prompt-sync")({ sigint: true })
const inquirer = require('inquirer');
const gradient = require('gradient-string');
const CFonts = require('cfonts');
const figlet = require('figlet');
const { createSpinner } = require('nanospinner');
const clipboardy = require('clipboardy');
const chalk = require('chalk');


function main(username) {
	/**
	 * @Function Password Generator
	 */
	function passGen() {
		let length;
		let uppercase;
		let lowercase;
		let numbers;
		let symbols;
		/**
		 * @Function Welcome
		 */
		async function welcome() {
			CFonts.say('Password Generator', {
				font: 'block',
				color: 'cyan',
				align: 'center',
				transitionGradient:['blue', 'cyan', 'mangenta' ],
				gradient: ['blue', 'cyan', 'magenta' ],
				lineHeight: 1  
			});
		}
		/**
		 * @Function Handle Answers
		 */
		async function handle(success, err) {
			const spinner = createSpinner('Generating password...').start();
			await timeout(2000);
	
			if (success) {
				spinner.success({ text: `Success! password has been generated and copied to clipboard.` });
				redirectToMenu();
			} else {
				if (err) {
					spinner.error({ text: `Error: ${err}` });
					redirectToMenu();
				} else {
					spinner.error({ text: `Uh Oh! an unexpected error has ocurred, please try again later.` });
					redirectToMenu();
				}
			}
		}
		/**
		 * @Function Ask Length
		 */
		async function askLength() {
			const answers = await inquirer.prompt({
				name: 'password_length',
				type: 'input',
				message: 'What is the length of your password?',
				default() {
					return '16';
				},
			});
	
			if (isNaN(answers.password_length)) {
				console.log(chalk.red('Please enter a number'));
				await askLength();
			}
	
			length = answers.password_length;
		}
		/**
		 * @Function Ask Upper Case
		 */
		async function askUppercase() {
			const answers = await inquirer.prompt({
				name: 'uppercase',
				type: 'input',
				message: 'Do you want uppercase in the password?',
				default() {
					return 'y/n';
				},
			});
			uppercase = answers.uppercase;
		}
		/**
		 * @Function Ask Lower Case
		 */
		async function askLowercase() {
			const answers = await inquirer.prompt({
				name: 'lowercase',
				type: 'input',
				message: 'Do you want lowercase in the password?',
				default() {
					return 'y/n';
				},
			});
			lowercase = answers.lowercase;
		}
		/**
		 * @Function Ask Numbers
		 */
		async function askNumbers() {
			const answers = await inquirer.prompt({
				name: 'numbers',
				type: 'input',
				message: 'Do you want numbers in the password?',
				default() {
					return 'y/n';
				},
			});
			numbers = answers.numbers;
		}
		/**
		 * @Function Ask Symbols
		 */
		async function askSymbols() {
			const answers = await inquirer.prompt({
				name: 'symbols',
				type: 'input',
				message: 'Do you want symbols in the password?',
				default() {
					return 'y/n';
				},
			});
			symbols = answers.symbols;
		}
		/**
		 * @Function Finalize
		 */
		function finish() {
			console.clear();
			
			try {
				figlet(`Password Generated`, (err, data) => {
					console.log(gradient.pastel.multiline(data) + '\n');
			
					let lowercase_pass = 'abcdefghijklmnopqrstuvwxyz';
					let uppercase_pass = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
					let numbers_pass = '0123456789';
					let symbols_pass = '!@#$%^&*()+_-=}{[]|:;"/?.><,`~';
			
					if(lowercase === "y/n" && uppercase === "y/n" && numbers === "y/n" && symbols === "y/n") return handle(false, "Please select at least one option.")
			
					let password = '';
					if(lowercase === "y" && uppercase === "n" && numbers === "n" && symbols === "n") {
						for(let i = 0; i < length; i++) {
							password += lowercase_pass.charAt(Math.floor(Math.random() * lowercase_pass.length));
						}
					} else if(lowercase === "n" && uppercase === "y" && numbers === "n" && symbols === "n") {
						for(let i = 0; i < length; i++) {
							password += uppercase_pass.charAt(Math.floor(Math.random() * uppercase_pass.length));
						}
					} else if(lowercase === "n" && uppercase === "n" && numbers === "y" && symbols === "n") {
						for(let i = 0; i < length; i++) {
							password += numbers_pass.charAt(Math.floor(Math.random() * numbers_pass.length));
						}
					} else if(lowercase === "n" && uppercase === "n" && numbers === "n" && symbols === "y") {
						for(let i = 0; i < length; i++) {
							password += symbols_pass.charAt(Math.floor(Math.random() * symbols_pass.length));
						}
					} else if(lowercase === "y" && uppercase === "y" && numbers === "n" && symbols === "n") {
						for(let i = 0; i < length; i++) {
							password += lowercase_pass.charAt(Math.floor(Math.random() * lowercase_pass.length));
							password += uppercase_pass.charAt(Math.floor(Math.random() * uppercase_pass.length));
						}
					} else if(lowercase === "y" && uppercase === "n" && numbers === "y" && symbols === "n") {
						for(let i = 0; i < length; i++) {
							password += lowercase_pass.charAt(Math.floor(Math.random() * lowercase_pass.length));
							password += numbers_pass.charAt(Math.floor(Math.random() * numbers_pass.length));
						}
					} else if(lowercase === "y" && uppercase === "n" && numbers === "n" && symbols === "y") {
						for(let i = 0; i < length; i++) {
							password += lowercase_pass.charAt(Math.floor(Math.random() * lowercase_pass.length));
							password += symbols_pass.charAt(Math.floor(Math.random() * symbols_pass.length));
						}
					} else if(lowercase === "n" && uppercase === "y" && numbers === "y" && symbols === "n") {
						for(let i = 0; i < length; i++) {
							password += uppercase_pass.charAt(Math.floor(Math.random() * uppercase_pass.length));
							password += numbers_pass.charAt(Math.floor(Math.random() * numbers_pass.length));
						}
					} else if(lowercase === "n" && uppercase === "y" && numbers === "n" && symbols === "y") {
						for(let i = 0; i < length; i++) {
							password += uppercase_pass.charAt(Math.floor(Math.random() * uppercase_pass.length));
							password += symbols_pass.charAt(Math.floor(Math.random() * symbols_pass.length));
						}
					} else if(lowercase === "n" && uppercase === "n" && numbers === "y" && symbols === "y") {
						for(let i = 0; i < length; i++) {
							password += numbers_pass.charAt(Math.floor(Math.random() * numbers_pass.length));
							password += symbols_pass.charAt(Math.floor(Math.random() * symbols_pass.length));
						}
					} else if(lowercase === "y" && uppercase === "y" && numbers === "y" && symbols === "n") {
						for(let i = 0; i < length; i++) {
							password += lowercase_pass.charAt(Math.floor(Math.random() * lowercase_pass.length));
							password += uppercase_pass.charAt(Math.floor(Math.random() * uppercase_pass.length));
							password += numbers_pass.charAt(Math.floor(Math.random() * numbers_pass.length));
						}
					} else if(lowercase === "y" && uppercase === "n" && numbers === "y" && symbols === "y") {
						for(let i = 0; i < length; i++) {
							password += lowercase_pass.charAt(Math.floor(Math.random() * lowercase_pass.length));
							password += numbers_pass.charAt(Math.floor(Math.random() * numbers_pass.length));
							password += symbols_pass.charAt(Math.floor(Math.random() * symbols_pass.length));
						}
					} else if(lowercase === "y" && uppercase === "y" && numbers === "n" && symbols === "y") {
						for(let i = 0; i < length; i++) {
							password += lowercase_pass.charAt(Math.floor(Math.random() * lowercase_pass.length));
							password += uppercase_pass.charAt(Math.floor(Math.random() * uppercase_pass.length));
							password += symbols_pass.charAt(Math.floor(Math.random() * symbols_pass.length));
						}
					} else if(lowercase === "n" && uppercase === "y" && numbers === "y" && symbols === "y") {
						for(let i = 0; i < length; i++) {
							password += uppercase_pass.charAt(Math.floor(Math.random() * uppercase_pass.length));
							password += numbers_pass.charAt(Math.floor(Math.random() * numbers_pass.length));
							password += symbols_pass.charAt(Math.floor(Math.random() * symbols_pass.length));
						}
					} else if(lowercase === "y" && uppercase === "y" && numbers === "y" && symbols === "y") {
						for(let i = 0; i < length; i++) {
							password += lowercase_pass.charAt(Math.floor(Math.random() * lowercase_pass.length));
							password += uppercase_pass.charAt(Math.floor(Math.random() * uppercase_pass.length));
							password += numbers_pass.charAt(Math.floor(Math.random() * numbers_pass.length));
							password += symbols_pass.charAt(Math.floor(Math.random() * symbols_pass.length));
						}
					} else {
						return handle(false, "An error ocurred while matching your request. Please try again later.");
					}
					clipboardy.writeSync(password);
					handle(true)
				});
			}
			catch(err) {
				handle(false)
			}
		}
	
		console.clear();
		async function password_gen() {
			await welcome();
			await askLength();
			await askUppercase();
			await askLowercase();
			await askNumbers();
			await askSymbols();
			finish();
		}
		password_gen();
	}
	/**
	 * @Function Redirects To Menu
	 */
	async function redirectToMenu() {
		console.log("\x1b[33mRedirecting to menu...\x1b[0m")
		await timeout(2000);
		console.clear();
		main(username)
	}

	console.clear();
	CFonts.say('Password Master', {
		font: 'block',
		color: 'cyan',
		align: 'center',
		transitionGradient:['blue', 'cyan', 'mangenta' ],
		gradient: ['blue', 'cyan', 'magenta' ],
		lineHeight: 1  
	});
	
	CFonts.say(`Logged as ${username}`, {
		font: 'console',
		align: 'center',
		colors: ['red'],
	});
	
	menu("Menu")
	
	console.log("\x1b[35m","《1》 Show information","\x1b[0m")
	console.log("\x1b[35m","《2》 Create information","\x1b[0m")
	console.log("\x1b[35m","《3》 Delete information","\x1b[0m")
	console.log("\x1b[35m","《4》 Password Generator","\x1b[0m")
	console.log("\x1b[35m","《5》 Exit\n","\x1b[0m")
	
	const setting = prompt("Select a option: ")
	
	switch (setting) {
		case "1":
			console.clear()
			menu("Show information")
			console.log("\x1b[35m","《1》 Passwords","\x1b[0m")
			console.log("\x1b[35m","《2》 Notes","\x1b[0m")
			console.log("\x1b[35m","《3》 Credit Cards","\x1b[0m")
			console.log("\x1b[35m","《4》 Back\n","\x1b[0m")
	
			var option = prompt("Select a option: ")

			switch (option) {
				case "1":
					console.clear()
					menu("Passwords")
					var title = prompt("Title of the password information you want to see: ")
					if(!title) {
						console.log("\x1b[31mInvalid parameters\x1b[0m")
						redirectToMenu()
					} else {
						Passwords.findOne({title: title}, async(err, data) => {
							if(err) throw err;
							if(!data) {
								console.log("\x1b[31mPassword not found\x1b[0m")
								redirectToMenu()
							} else {
								console.log(`Title: ${data.title}\nEmail: ${data.email}\nUsername: ${data.username}\nPassword: ${data.password}`)
								prompt("Press any key to continue...")
								redirectToMenu()
							}
						})
					}
					break;
				case "2":
					console.clear()
					menu("Notes")
					var title = prompt("Title of the note you want to see: ")
					if(!title) {
						console.log("\x1b[31mInvalid parameters\x1b[0m")
						redirectToMenu()
					} else {
						Notes.findOne({title: title}, async(err, data) => {
							if(err) throw err;
							if(!data) {
								console.log("\x1b[31mNote not found\x1b[0m")
								redirectToMenu()
							} else {
								console.log(`Title: ${data.title}\nNote: ${data.note}`)
								prompt("Press any key to continue...")
								redirectToMenu()
							}
						})
					}
					break;
				case "3":
					console.clear()
					menu("Credit Cards")
					var title = prompt("Title of the credit card information you want to see: ")
					if(!title) {
						console.log("\x1b[31mInvalid parameters\x1b[0m")
						redirectToMenu()
					} else {
						CreditCards.findOne({title: title}, async(err, data) => {
							if(err) throw err;
							if(!data) {
								console.log("\x1b[31mCredit card not found\x1b[0m")
								redirectToMenu()
							} else {
								console.log(`Title: ${data.title}\nCard Number: ${data.cardNumber}\nExpiration Date: ${data.expirationDate}\nCVV: ${data.cvv}`)
								prompt("Press any key to continue...")
								redirectToMenu()
							}
						})
					}
					break;
				case "4":
					redirectToMenu()
					break;
				default:
					console.log("\x1b[31mInvalid option\x1b[0m")
					redirectToMenu()
					break;
				}
			break;
		case "2":
			console.clear()
			menu("Create information")
			console.log("\x1b[35m","《1》 Passwords","\x1b[0m")
			console.log("\x1b[35m","《2》 Notes","\x1b[0m")
			console.log("\x1b[35m","《3》 Credit Cards","\x1b[0m")
			console.log("\x1b[35m","《4》 Exit\n","\x1b[0m")
	
			var option = prompt("Select a option: ")
	
			switch (option) {
				case "1":
					console.clear();
					menu("Password")
					var title = prompt("What will be your password title: ")
					var email = prompt("What is your email: ")
					var user = prompt("What is your username: ")
					var password = prompt("What is your password: ")
					if(!title || !email || !user || !password) {
						util("create", "password", false, "Invalid parameters")
					} else {
						Passwords.findOne({title: title }, async(err, data) => {
							if(err) throw err;
							if(data) {
								util("create", "password", false, "Password title already exist")
							} else {
                                new Passwords({
                                    user: username,
                                    title,
                                    email,
                                    username: user,
                                    password
                                }).save()
                                .then(() => {
									util("create", "password", true)
                                })
							}
						})
					}
					break;
				case "2":
					console.clear()
					menu("Note")
					var title = prompt("What will be your note title: ")
					var note = prompt("What is your note: ")
					if(!title || !note) {
						util("create", "note", false, "Invalid parameters")
					} else {
						Notes.findOne({title: title }, async(err, data) => {
							if(err) throw err;
							if(data) {
								util("create", "note", false, "Note title already exist")
							} else {
                                new Notes({
                                    title,
                                    note
                                }).save()
                                .then(() => {
                                    util("create", "note", true)
                                })
							}
						})
					}
					break;
				case "3":
					console.clear()
					menu("Credit Card")
					var title = prompt("What will be your credit card title: ")
					var number = prompt("What is your card number: ")
					var expire = prompt("What is your card expiration date: ")
					var cvv = prompt("What is your card cvv: ")
					if(!title || !number || !expire || !cvv) {
						util("create", "credit card", false, "Invalid parameters")
						redirectToMenu()
					} else {
						CreditCards.findOne({title: title }, async(err, data) => {
							if(err) throw err;
							if(data) {
								util("create", "credit card", false, "CreditCard title already exist")
							} else {
                                new CreditCards({
                                    title,
                                    number,
                                    expire,
                                    cvv
                                }).save()
                                .then(() => {
                                    util("create", "credit card", true)
                                })
							}
						})
					}
					break
				case "4":
					redirectToMenu()
					break;
				default:
					console.log("\x1b[31mInvalid option\x1b[0m")
					redirectToMenu()
					break;
				}
			break
		case "3":
			console.clear()
			menu("Delete information")
			console.log("\x1b[35m","《1》 Passwords","\x1b[0m")
			console.log("\x1b[35m","《2》 Notes","\x1b[0m")
			console.log("\x1b[35m","《3》 Credit Cards","\x1b[0m")
			console.log("\x1b[35m","《4》 Exit\n","\x1b[0m")
	
			var option = prompt("Select a option: ")

			switch(option) {
				case "1":
					console.clear()
					menu("Password")
					var title = prompt("Password title to delete: ")
					if(!title) {
						util("delete", "password", false, "Invalid parameters")
					} else {
						Passwords.findOne({ title: title }, async(err, data) => {
							if(err) throw err;
							if(!data) {
								util("delete", "password", false, "Password not found")
							} else {
								Passwords.deleteOne({ title: title })
								.then(() => {
									util("delete", "password", true)
								})
							}
						})
					}
					break;
				case "2":
					console.clear()
					menu("Note")
					var title = prompt("Note title to delete: ")
					if(!title) {
						util("delete", "note", true, "Invalid parameters")
					} else {
						Notes.findOne({ title: title }, async(err, data) => {
							if(err) throw err;
							if(!data) {
								util("delete", "password", false, "Note not found")
							} else {
                                Notes.deleteOne({ title: title })
                                .then(() => {
                                    util("delete", "note", true)
                                })
                            }
						})
					}
					break;
				case "3":
					console.clear()
					menu("Credit Card")
					var title = prompt("Password title to delete: ")
					if(!title) {
						util("delete", "credit card", false, "Invalid parameters")
					} else {
						CreditCards.findOne({ title: title }, async(err, data) => {
							if(err) throw err;
							if(!data) {
								util("delete", "credit card", false, "CreditCard not found")
							} else {
                                CreditCards.deleteOne({ title: title })
                                .then(() => {
                                    util("delete", "credit card", true)
                                })
                            }
						})
					}
					break;
				case "4":
					redirectToMenu()
					break;
				default:
					console.log("\x1b[31mInvalid option\x1b[0m")
					redirectToMenu()
					break;
			}
			break;
		case "4":
			passGen();
			break;
		case "5":
			console.log("\x1b[31mExiting...\x1b[0m")
			process.exit()
		default:
			console.log("\x1b[31mInvalid option\x1b[0m")
			redirectToMenu()
			break;
	}
	async function util(data, type, success, err) {
		if(data == "create") {
			const spinner = createSpinner('Saving information...').start();
			await timeout(2000);
	
			if (success) {
				spinner.success({ text: `Success! ${type} has been created.` });
				redirectToMenu();
			} else {
				if (err) {
					spinner.error({ text: `Error: ${err}` });
					redirectToMenu();
				} else {
					spinner.error({ text: `Uh Oh! an unexpected error has ocurred, please try again later.` });
					redirectToMenu();
				}
			}
		} else if(data == "delete") {
			const spinner = createSpinner('Deleting information...').start();
			await timeout(2000);
	
			if (success) {
				spinner.success({ text: `Success! ${type} has been deleted.` });
				redirectToMenu();
			} else {
				if (err) {
					spinner.error({ text: `Error: ${err}` });
					redirectToMenu();
				} else {
					spinner.error({ text: `Uh Oh! an unexpected error has ocurred, please try again later.` });
					redirectToMenu();
				}
			}
		}
	}
}

function timeout(ms) {
	if (ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
}

function menu(name) {
	CFonts.say(name, {
		font: 'chrome',
		colors: ['cyan', 'yellow', '#ffa500'],
		letterSpacing: 1,
		lineHeight: 1,
		space: true,
		maxLength: '0',
	});
}

module.exports = {
    main,
    menu,
	timeout
}
