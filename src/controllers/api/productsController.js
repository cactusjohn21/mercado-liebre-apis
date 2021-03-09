const { validationResult } = require('express-validator');
const createError = require('http-errors');
const { Op } = require('sequelize')

// ******** Sequelize ***********

const { Product, Brand, Category } = require('../../database/models');
module.exports = {
    latest (req, res){

		Product.findAll({
			order: [
				['createdAt', 'DESC']
			],
			limit: 1
		})
		.then((resultado) => {
			for(let i = 0; i < resultado.length; i++) {
				resultado[i].setDataValue('endpoint', '/api/products/latest/' + resultado[i].id)
			}

			let respuesta = {
				meta: {
					status: 200,
					total: resultado.length,
					url: '/api/products/latest'

				},
				data: resultado
			}
			res.json(respuesta)
		})
    },
		
    offers (req, res){
        Product.findAll({
			where: {
				discount: 
                        {[Op.gt]: 0}
			},
			limit: 6
		})
		.then((resultado) => {
			for(let i = 0; i < resultado.length; i++) {
				resultado[i].setDataValue('endpoint', '/api/products/offers/' + resultado[i].id)
			}
			
			let respuesta = {
				meta: {
					status: 200,
					total: resultado.length,
					url: '/api/products/offers'

				},
				data: resultado
			}
			res.json(respuesta)
		})
	},

	category (req, res){
		Product.findAll({
			order: [
				['createdAt', 'DESC']
			]
			
		})
		.then((resultado) => {
			
			for(let i = 0; i < resultado.length; i++) {
				resultado[i].setDataValue('endpoint', '/api/products/categories/' + resultado[i].id)
			}

			let respuesta = {
				meta: {
					status: 200,
					total: resultado.length,
					url: '/api/products/categories/'

				},
				data: resultado
			}
			res.json(respuesta)
		})

	},
	
	categoryDetail (req, res){
		Product.findAll({
			include: [
				{association: 'category', 
					where:{
						name: req.params.category
					}				
				}
			]
		})
		.then((resultado) => {
			;
			for(let i = 0; i < resultado.length; i++) {
				resultado[i].setDataValue('endpoint', '/api/products/categories/' + resultado[i].categoryId)
			}

			let respuesta = {
				meta: {
					status: 200,
					total: resultado.length,
					url: '/api/products/categories/'

				},
				data: resultado
			}
			res.json(respuesta)
		})

	}

		
			// .then(([ultimos, inSale]) => res.render('index', { ultimos, inSale: inSale.sort(() => Math.random() - 0.5) }))
			// .catch(e => console.log(e));

}

