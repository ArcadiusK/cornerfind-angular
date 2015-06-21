'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    stripe = require('stripe')('sk_test_kbZLZCeD7MoHX28rIB9Uoavi'),
    Q = require('q'),
    Product = require('../product/product.model');

var OrderSchema = new Schema({
  lineItems: [
    { productId: {type: Schema.Types.ObjectId, ref: 'Product'},
      name: {type: String},
      purchasePrice: {type: Number, required: true,min: 0},
      originalPrice: {type: Number, required: true,min: 0},
      qty: {type: Number, min: 1, default:1},
      shippingHandling: {type: Number, default:499}}
    ],
    
  sellerId: {type: Schema.Types.ObjectId, ref: 'User'},
  buyerId: {type: Schema.Types.ObjectId, ref: 'User'},
  orderShippingHandling: {type: Number},
  buyerAddress: Object,
  sellerAddress: Object,
  shippingLabelUrl: String,
  orderTotal: {type: Number, min: 0},
  timeStamp: Number,
  billing: {},
  reviewed: {type: Boolean, default: false},
  status: {type:String, enum: ['declined','expired','offer','accepted','shipped','received','issues']}

});



OrderSchema.pre('save',function(next){
  if(this.isNew){
    var total=0;
    var self = this;
    this.lineItems.forEach(function(item){  
      total+= item.purchasePrice*item.qty;
      console.log('ITEM',item)
      Product.findByIdAndUpdate(item.productId,
        {$addToSet: {offers: self._id}},function(){
          //Not sure why this isn't working without the empty callback?  
        })
    });
    this.orderTotal = total;
  }
  next();
});

OrderSchema.pre('save',function(next){
  if(this.isNew){
    this.timeStamp = Date.now();
  }
  next();
})


OrderSchema.statics = {
  getBuyersOffers: function(buyerId){
   
  return this.find(
      {$and:[{buyerId:buyerId},
            {
              status: {
                $in: ["offer","accepted","shipped"]
              }
          } 
      ]}
      ).populate('sellerId').populate('lineItems.productId').exec();
  },
  
  declineUnacceptedOrders: function(orderId){
    //Callback Magic
    var self = this;
    this.findById(orderId).select('lineItems').exec(function(err,order){ 
      //get all items in order
      order.lineItems.forEach(function(item){
        Product.findById(item.productId).select('offers').exec(function(err,orders){
          //get all offers with those items in them
          orders.offers.forEach(function(offerId){
            if(offerId.toString() !== orderId){
              //decline those offers since this product is bought
              self.findByIdAndUpdate(offerId,{$set:{status:'declined'}},function(){
              })
            }
          })
        })
        
      })
    })
  },

  checkAllTimeStamps: function(){
    var self = this;
    this.find({}).select('timeStamp').exec(function(err,result){
      var msPerDay = 86400000;
      result.forEach(function(order){
        if(Date.now() - order.timeStamp > msPerDay){
          self.findByIdAndUpdate(order._id,{$set: {status: 'expired'}},function(err,res){
            if(err){console.log('Error Updating Offer Status ',err)}
          })
        }
      })
    
    }) 
    console.log('Expired timeStamp Check Ran')
  }

};

OrderSchema.methods = {
  checkTimeStamp: function(orderObject){
    var msPerDay = 86400000;
    // var test = 10; //working
    if(Date.now() - this.timeStamp > msPerDay){
        this.status = 'expired';
        this.save(function(err,res){
            console.log('SAVE CALLBACK ',arguments)
        })
    }
    
  }
}

//Stripe stuff - please leave for reference
// OrderSchema.methods.createDate = function() {
//   this.date = new Date();
// }

// OrderSchema.methods.setChargeId = function(chargeId) {
//   this.billing.chargeId = chargeId;
//   this.markModified('billing');
// }

OrderSchema.statics.createStripeCharge = function(item, res) {
  // console.log('createStripeCharge method in model, item is -->..', item)
  var deferral = Q.defer();
  var charge = stripe.charges.create({
      amount: parseInt(item.orderTotal)*100,
      currency: 'usd',
      card: item.stripeToken,
      capture: true,
      description: 'Charge from Cornerfind.com!'
    }, function(err,charge) {
          if(err && err.type === 'StripeCardError') {
            return res.send(500, err)
          }

          // console.log('Stripe charged! ..', charge)
          // console.log('Stripe Err ',err)

          deferral.resolve(charge);
          
    });
    return deferral.promise;
};


module.exports = mongoose.model('Order', OrderSchema);







