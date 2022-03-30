const { Passwords, Notes, CreditCards } = require("../database");
const { say } = require('cfonts');
const prompt = require("prompt-sync")({ sigint: true })

function main(username) {
	console.clear();
	say('Password Master', {
		font: 'block',
		align: 'center',
		colors: ['blueBright'],
		background: 'transparent',
		letterSpacing: 1,
		lineHeight: 1,
		space: true,
		maxLength: '0',
		gradient: false,
		independentGradient: false,
		transitionGradient: false,
		env: 'node'
	});
	
	if(username) {
		say(`Logged as "${username}"`, {
			font: 'console',
			align: 'center',
			colors: ['red'],
		});
	}
	
	menu("Menu")
	
	console.log("\x1b[35m","《1》 Show information","\x1b[0m")
	console.log("\x1b[35m","《2》 Create information","\x1b[0m")
	console.log("\x1b[35m","《3》 Delete information","\x1b[0m")
	console.log("\x1b[35m","《4》 Exit\n","\x1b[0m")
	
	const setting = prompt("Select a option: ")
	
	switch (setting) {
		case "1":
			console.clear()
			menu("Show information")
			console.log("\x1b[35m","《1》 Passwords","\x1b[0m")
			console.log("\x1b[35m","《2》 Notes","\x1b[0m")
			console.log("\x1b[35m","《3》 Credit Cards","\x1b[0m")
			console.log("\x1b[35m","《4》 Exit\n","\x1b[0m")
	
			var option = prompt("Select a option: ")

			switch (option) {
				case "1":
					console.clear()
					menu("Passwords")
					var title = prompt("Title of the password information you want to see: ")
					if(!title) {
						console.log("\x1b[31m","Title is required","\x1b[0m")
						redirectToMenu()
					} else {
						Passwords.findOne({title: title}, async(err, data) => {
							if(err) throw err;
							if(!data) {
								console.log("\x1b[31m","Password not found","\x1b[0m")
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
						console.log("\x1b[31m","Title is required","\x1b[0m")
						redirectToMenu()
					} else {
						Notes.findOne({title: title}, async(err, data) => {
							if(err) throw err;
							if(!data) {
								console.log("\x1b[31m","Note not found","\x1b[0m")
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
						console.log("\x1b[31m","Title is required","\x1b[0m")
						redirectToMenu()
					} else {
						CreditCards.findOne({title: title}, async(err, data) => {
							if(err) throw err;
							if(!data) {
								console.log("\x1b[31m","Credit card not found","\x1b[0m")
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
					console.log("\x1b[31m","Exiting...","\x1b[0m")
					break;
				default:
					console.log("\x1b[31m","Invalid option","\x1b[0m")
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
						console.log("\x1b[31m","Please fill out all the required files","\x1b[0m")
						redirectToMenu()
					} else {
						Passwords.findOne({title: title }, async(err, data) => {
							if(err) throw err;
							if(data) {
								console.log("\x1b[31m","Title already exist","\x1b[0m")
								redirectToMenu()
							} else {
                                console.log("Saving information...")
                                new Passwords({
                                    user: username,
                                    title,
                                    email,
                                    username: user,
                                    password
                                }).save()
                                .then(() => {
                                    console.log("\x1b[32m","Password created","\x1b[0m")
                                    redirectToMenu()
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
						console.log("\x1b[31m","Please fill out all the required files","\x1b[0m")
						redirectToMenu()
					} else {
						Notes.findOne({title: title }, async(err, data) => {
							if(err) throw err;
							if(data) {
								console.log("\x1b[31m","Title already exist","\x1b[0m")
								redirectToMenu()
							} else {
                                console.log("Saving information...")
                                new Notes({
                                    title,
                                    note
                                }).save()
                                .then(() => {
                                    console.log("\x1b[32m","Note created","\x1b[0m")
                                    redirectToMenu()
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
						console.log("\x1b[31m","Please fill out all the required filess","\x1b[0m")
						redirectToMenu()
					} else {
						CreditCards.findOne({title: title }, async(err, data) => {
							if(err) throw err;
							if(data) {
								console.log("\x1b[31m","Title already exist","\x1b[0m")
								redirectToMenu()
							} else {
                                console.log("Saving information...")
                                new CreditCards({
                                    title,
                                    number,
                                    expire,
                                    cvv
                                }).save()
                                .then(() => {
                                    console.log("\x1b[32m","Credit Card created","\x1b[0m")
                                    redirectToMenu()
                                })
							}
						})
					}
					break
				case "4":
					console.log("\x1b[31m","Exiting...","\x1b[0m")
					break;
				default:
					console.log("\x1b[31m","Invalid option","\x1b[0m")
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
						console.log("\x1b[31m","Title is required","\x1b[0m")
						redirectToMenu()
					} else {
						Passwords.findOne({ title: title }, async(err, data) => {
							if(err) throw err;
							if(!data) {
								console.log("\x1b[31m","Title not found","\x1b[0m")
								redirectToMenu()
							} else {
                                console.log("Saving information...")
								Passwords.deleteOne({ title: title })
								.then(() => {
									console.log("\x1b[32m","Password deleted","\x1b[0m")
									redirectToMenu()
								})
							}
						})
					}
					break;
				case "2":
					console.clear()
					menu("Note")
					var title = prompt("Password title to delete: ")
					if(!title) {
						console.log("\x1b[31m","Title is required","\x1b[0m")
						redirectToMenu()
					} else {
						Notes.findOne({ title: title }, async(err, data) => {
							if(err) throw err;
							if(!data) {
								console.log("\x1b[31m","Title not found","\x1b[0m")
								redirectToMenu()
							} else {
                                console.log("Deleting information...")
                                Note.deleteOne({ title: title })
                                .then(() => {
                                    console.log("\x1b[32m","Note deleted","\x1b[0m")
                                    redirectToMenu()
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
						console.log("\x1b[31m","Title is required","\x1b[0m")
						redirectToMenu()
					} else {
						CreditCards.findOne({ title: title }, async(err, data) => {
							if(err) throw err;
							if(!data) {
								console.log("\x1b[31m","Title not found","\x1b[0m")
								redirectToMenu()
							} else {
                                console.log("Deleting information...")
                                CreditCards.deleteOne({ title: title })
                                .then(() => {
                                    console.log("\x1b[32m","Credit Card deleted","\x1b[0m")
                                    redirectToMenu()
                                })
                            }
						})
					}
					break;
				case "4":
					console.log("\x1b[31m","Exiting...","\x1b[0m")
					break;
				default:
					console.log("\x1b[31m","Invalid option","\x1b[0m")
					redirectToMenu()
					break;
			}
			break;
		case "4":
			console.log("\x1b[31m","Exiting...","\x1b[0m")
			break;
		default:
			console.log("\x1b[31m","Invalid option","\x1b[0m")
			redirectToMenu()
			break;
	}
}

function menu(name) {
	say(name, {
		font: 'chrome',
		colors: ['cyan', 'yellow', '#ffa500'],
		letterSpacing: 1,
		lineHeight: 1,
		space: true,
		maxLength: '0',
	});
}

function redirectToMenu() {
	console.log("Redirecting to menu...")
	setTimeout(() => {
		console.clear();
		main()
	}, 3000)
}

module.exports = {
    main,
    menu,
    redirectToMenu
}
