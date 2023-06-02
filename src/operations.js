import { readFileSync, writeFileSync } from "fs"
import { dirname } from "path"
import { fileURLToPath } from "url"

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
}

let car = new Vehicle()
console.log(car)