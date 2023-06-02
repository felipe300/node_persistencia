import { readFileSync, writeFileSync } from "fs"
import { dirname } from "path"
import { fileURLToPath } from "url"
import { v4 as uuid } from 'uuid'

const __dirname = dirname(fileURLToPath(import.meta.url))

class Vehicle {
	constructor (id, marca, modelo, asientos) {
		this.id = id
		this.marca = marca
		this.modelo = modelo
		this.asientos = asientos
	}

	findAll () {
		let JSONResponse = readFileSync(`${__dirname}/data/data.json`, 'utf-8')
		let response = JSON.parse(JSONResponse)
		return response.cars
	}

	findById (id) {
		return this.findAll().find(car => car.id === id)
	}

	findByBrand (carBrand) {
		return this.findAll()
			.filter(car => car.marca.toLowerCase() === carBrand.toLowerCase())
	}

	updateVehicle () {
		let JSONResponse = readFileSync(`${__dirname}/data/data.json`, 'utf-8')
		let response = JSON.parse(JSONResponse)
		let filtered = response.cars.find((car) => car.id === this.id)

		if (filtered) {
			filtered.marca = this.marca
			filtered.modelo = this.modelo
			filtered.asientos = this.asientos

			writeFileSync(
				`${__dirname}/data/data.json`,
				JSON.stringify(response, null, 4),
				'utf-8'
			)
			return filtered
		} else {
			return []
		}
	}
}

export default Vehicle

// let car = new Vehicle()
// let car2 = new Vehicle(1, "Ferrari", "F40", 300)
// let result = car2.updateVehicle()
// console.log(car.findById(1))
// console.log(result)
// console.log(car2.findAll())