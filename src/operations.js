import Vehicle from "./Vehicle.js"

let args = process.argv.slice(2)
let command = args[0]

const readCars = () => {
	let car = new Vehicle()
	console.log(car.findAll())
}

const searchById = (id) => {
	let car = new Vehicle()
	let result = car.findById(id)

	result
		? console.log(result)
		: console.log(`Auto con id: ${id}, no encontrado!`)
}

const searchByBrand = (brand) => {
	let car = new Vehicle()
	let result = car.findByBrand(brand)

	result.length > 0
		? console.log(result)
		: console.log(`Auto de la marca: ${brand}, no encontrado!`)
}

function main () {
	switch (command) {
		case "leer":
			// in the terminal => node src/operations.js leer
			readCars()
			break
		case "buscar":
			// in the terminal => node src/operations.js buscar 1
			let id = args[1]
			searchById(id)
			break
		case "marca":
			// in the terminal => node src/operations.js marca Ferrari
			let marca = args[1]
			searchByBrand(marca)
			break
		default:
			console.log("comando no reconocido")
	}
}

main()
