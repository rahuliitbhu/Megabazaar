'use strict';

/**
 *  order controller
 */
 const stripe = require('stripe')(process.env.SECRET_STRIPE);
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order',({ strapi })=>({
    async create(ctx){
        const {city,state,pin,ShippingAddress,amount,token,items}=ctx.request.body
        await stripe.paymentIntents.create({
            amount:amount * 100,
            currency:"inr",
            source:token,
            
            
            description:`Order by User ${ctx.state.user.email} `
         
               
        });
        const order = await strapi.db.query('api::order.order').create({
            data: {
                city,
                state,
                pin,
                ShippingAddress,
                items,
                amount,
                
                user:ctx.state.user.email,
               
            },
          });
          return order
    }
}));
