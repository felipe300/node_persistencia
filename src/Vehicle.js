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

	findVehicles () {
		let JSONResponse = readFileSync(`${__dirname}/data/data.json`, 'utf-8')
		let response = JSON.parse(JSONResponse)
		return response
	}

	findAll () {
		return this.findVehicles()
	}

	findById (id) {
		return this.findAll().find(car => car.id === id)
	}

	findByBrand (carBrand) {
		return this.findAll()
			.filter(car => car.marca.toLowerCase() === carBrand.toLowerCase())
	}

	create () {
		let newCar = {
			id: uuid().slice(0, 8),
			marca: this.marca,
			modelo: this.modelo,
			asientos: this.asientos
		}

		let result = this.findVehicles()
		result.push(newCar)
		writeFileSync(
			`${__dirname}/data/data.json`,
			JSON.stringify(result, null, 4),
			'utf-8'
		)

		return result
	}

	update () {
		let result = this.findAll()
		let filtered = result.find(car => car.id === this.id)

		if (filtered) {
			filtered.marca = this.marca || filtered.marca
			filtered.modelo = this.modelo || filtered.modelo
			filtered.asientos = this.asientos || filtered.asientos
			writeFileSync(`${__dirname}/data/data.json`, JSON.stringify(result, null, 4), 'utf8')

			return filtered
		} else {
			return { message: `El vehiculo con el id: ${this.id} no fue necontrado` }
		}
	}

	delete (id) {
		let result = this.findAll()
		let found = this.findById(id)

		if (found) {
			result = result.filter(car => car.id !== id)
			writeFileSync(`${__dirname}/data/data.json`, JSON.stringify(result, null, 4), 'utf8')
			return result
		} else {
			return { message: `El vehiculo con el id: ${id} no fue necontrado` }
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