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

const createVehicle = (brand, model, sits) => {
	let car = new Vehicle(undefined, brand, model, sits)
	car.createVehicle()
	console.log(`Vehiculo ${brand}, creado!`)
}

const updateVehicle = (id, brand, model, sits) => {
	brand === 'undefined' ? brand = undefined : brand = brand
	model === 'undefined' ? model = undefined : model = model
	sits === 'undefined' ? sits = undefined : sits = sits

	let car = new Vehicle(id, brand, model, sits)
	let result = car.update()
	console.log(`Vehiculo ${result.id}, se ha actualizado!`)
}

const deleteVehicle = (id) => {
	let car = new Vehicle()
	car.delete(id)
	console.log(`Vehiculo ${id}, eliminado!`)
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
		case "crear":
			// in the terminal => node src/operations.js crear foo bar baz
			let value1 = args[1]
			let value2 = args[2]
			let value3 = args[3]

			create(value1, value2, value3)
			break
		case "actualizar":
			// in the terminal => node src/operations.js actualizar id Mazda nose 3 
			let updateId = args[1]
			let updateBrand = args[2]
			let updateModel = args[3]
			let updateSits = args[4]

			updateVehicle(updateId, updateBrand, updateModel, updateSits)
			break
		case "eliminar":
			// in the terminal => node src/operations.js actualizar id Mazda nose 3 
			let deleteId = args[1]
			deleteVehicle(deleteId)
			break
		default:
			console.log("comando no reconocido")
	}
}

main()
